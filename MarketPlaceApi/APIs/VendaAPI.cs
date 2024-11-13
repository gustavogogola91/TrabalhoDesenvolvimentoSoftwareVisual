using System.Net.NetworkInformation;
using Microsoft.EntityFrameworkCore;

public static class VendaAPI
{
    public static void MapVendasAPI(this WebApplication app)
    {
        var group = app.MapGroup("/vendas");

        group.MapGet("/", async (AppDbContext db) =>
        {
            var vendas = await db.Vendas 
            .Include(v => v.Itens)
            .ToListAsync();

            var produtoIds = vendas.SelectMany(v => v.Itens).Select(i => i.ProdutoId).Distinct().ToList();
            var enderecosIds = vendas.Select(v => v.IdEndereco);
            var cupomId = vendas.Select(v => v.IdCupom);

            double precoTotal = 0;

            // Busca os produtos com base nos IDs obtidos
            var produtos = await db.Produtos
                .Where(p => produtoIds.Contains(p.Id))
                .ToListAsync();


            var endereco = await db.Enderecos
                .Where(e => enderecosIds.Contains(e.Id))
                .SingleOrDefaultAsync();

            var cupom = await db.Cupons
                .Where(c => cupomId.Contains(c.Id))
                .SingleOrDefaultAsync();

            //tratar se nao tiver cupom a compra

            if (vendas == null)
            {
                return Results.NotFound();
            }

            foreach (var item in produtos)
            {
                precoTotal += item.Valor * item.Quantidade;
            }

            if (cupom != null)
            {
                var numeroDesconto = cupom.Desconto * 10;
                precoTotal = precoTotal - (precoTotal * numeroDesconto);
            }



            // Estrutura a resposta incluindo as vendas e produtos
            var resultado = vendas.Select(venda => new
            {
                venda.Id,
                venda.IdCliente,
                Endereco = new
                {
                    endereco?.Rua,
                    endereco?.Numero,
                    endereco?.Cidade,
                },
                Cupom = new
                {
                    cupom?.Id,
                    cupom?.Codigo,
                    cupom?.Desconto,
                },
                Itens = venda.Itens.Select(item => new
                {
                    item.Id,
                    item.Quantidade,
                    item.ProdutoId,
                    Produto =
                    produtos.Where(produto => produto.Id == item.ProdutoId)
                    .Select(produto => new
                    {
                        produto.Nome,
                        produto.Descricao,
                        produto.Valor,
                    })

                }),
                precoTotal
            });


            return Results.Ok(resultado);
        });

        group.MapGet("/cliente/{id}", async (int id, AppDbContext db) =>
        {
            var vendas = await db.Vendas
            .Where(v => v.IdCliente == id) // Filtra as vendas pelo id do cliente
            .Include(v => v.Itens) // Inclui os itens da venda
            .ToListAsync();

            var produtoIds = vendas.SelectMany(v => v.Itens).Select(i => i.ProdutoId).Distinct().ToList();
            var enderecosIds = vendas.Select(v => v.IdEndereco);
            var cupomId = vendas.Select(v => v.IdCupom);

            // Busca os produtos com base nos IDs obtidos
            var produtos = await db.Produtos
                .Where(p => produtoIds.Contains(p.Id))
                .ToListAsync();

            var endereco = await db.Enderecos
                .Where(e => enderecosIds.Contains(e.Id))
                .SingleOrDefaultAsync();



            //tratar se nao tiver cupom a compra


            // Estrutura a resposta incluindo as vendas e produtos
            var resultado = vendas.Select(venda => new
            {
                venda.Id,
                venda.IdCliente,
                venda.precoTotal,
                Endereco = new
                {
                    endereco?.Rua,
                    endereco?.Numero,
                    endereco?.Cidade,
                },
                Itens = venda.Itens.Select(item => new
                {
                    item.Id,
                    item.Quantidade,
                    item.ProdutoId,
                    Produto =
                    produtos.Where(produto => produto.Id == item.ProdutoId)
                    .Select(produto => new
                    {
                        produto.Nome,
                        produto.Descricao,
                        produto.Valor,
                    })

                })
            });

            return Results.Ok(resultado);
        });

        group.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            var venda = await db.Vendas
                .Include(v => v.Itens)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (venda is null) return Results.NotFound();

            return Results.Ok(venda);
        });

        group.MapPost("/", async (Venda venda, AppDbContext db) =>
        {
            db.Vendas.Add(venda);
            await db.SaveChangesAsync();

            return Results.Created($"/vendas/{venda.Id}", venda);
        });

        group.MapPut("/{id}", async (int id, Venda vendaAlterada, AppDbContext db) =>
        {
            var venda = await db.Vendas.FindAsync(id);
            if (venda is null) return Results.NotFound();

            venda.IdCliente = vendaAlterada.IdCliente;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });


        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Vendas.FindAsync(id) is Venda venda)
            {
                db.Vendas.Remove(venda);

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();

        });

        // Define o endpoint para converter o Carrinho em Venda
        group.MapPost("/{id}/{idUsuario}/finalizar-venda/{precoTotal}/{idCupom}", async (int id, int idUsuario,double precoTotal, int idCupom, AppDbContext db) =>
        {
            // Busca o carrinho pelo ID
            var carrinho = await db.Carrinhos
                        .Where(c => c.Id == id)
                        .Include(c => c.Itens)
                        .ThenInclude(i => i.Produto)
                        .FirstOrDefaultAsync();

            

            // Verifica se o carrinho foi encontrado
            // if (carrinho == null)
            // {
            //     return Results.NotFound("Carrinho não encontrado.");
            // }

            var endereco = await db.Enderecos
            .Where(e => e.IdCliente == idUsuario) // Comparação direta com o Id
            .SingleOrDefaultAsync();

            // if (endereco == null)
            // {
            //     return Results.NotFound("Endereco não encontrado.");
            // }

            // Cria a Venda a partir do Carrinho
            Venda venda = new Venda
            {
                IdCliente = carrinho.UsuarioId,    // Define o cliente a partir do UsuarioId do Carrinho
                IdEndereco = endereco.Id,
                IdCupom = idCupom,
                precoTotal = precoTotal, // Calcula o preço total
                Itens = carrinho.Itens.Select(item => new ItemVenda
                {
                    ProdutoId = item.ProdutoId,
                    Quantidade = item.Quantidade
                }).ToList()
            };

            // Adiciona a venda no banco de dados
            db.Vendas.Add(venda);

            // Salva a venda e os itens no banco
            await db.SaveChangesAsync();

            return Results.Created($"/venda/{venda.Id}", venda);
        });

    }

}