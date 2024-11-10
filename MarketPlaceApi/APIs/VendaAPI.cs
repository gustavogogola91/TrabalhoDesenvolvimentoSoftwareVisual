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

            if (vendas == null || vendas.Count == 0)
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

            var cupom = await db.Cupons
                .Where(c => cupomId.Contains(c.Id))
                .SingleOrDefaultAsync();

            //tratar se nao tiver cupom a compra

            if (vendas == null || vendas.Count == 0)
            {
                return Results.NotFound();
            }

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
                Cupon = new
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

                })
            });

            return Results.Ok(resultado);
        });

        group.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            var venda = await db.Vendas
                .Include(v => v.Itens)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (venda == null)
            {
                return Results.NotFound();
            }

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
    }

}