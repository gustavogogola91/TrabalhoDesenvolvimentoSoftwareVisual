using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;


public static class CarrinhoAPI
{
    public static void MapCarrinhosAPI(this WebApplication app)
    {

        var group = app.MapGroup("/carrinho");

        group.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Carrinhos
                .Include(c => c.Itens)
                .ThenInclude(i => i.Produto)
                .ToListAsync();
        });

        group.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Carrinhos
                        .Where(c => c.Id == id)
                        .Include(c => c.Itens)
                        .ToListAsync();
        });

        group.MapGet("/user/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Carrinhos
                        .Where(c => c.UsuarioId == id)
                        .Include(c => c.Itens)
                        .ThenInclude(i => i.Produto)
                        .ToListAsync();
        });

        group.MapPost("/", async (Carrinho carrinho, AppDbContext db) =>
        {
            db.Carrinhos.Add(carrinho);
            await db.SaveChangesAsync();
            return Results.Created($"/carrinho/{carrinho.Id}", carrinho);
        });

        group.MapPost("/adicionarItem/", async (ItemCarrinho itemCarrinho, AppDbContext db) =>
        {
            db.ItemCarrinho.Add(itemCarrinho);
            await db.SaveChangesAsync();
            return Results.Created();
        });

        group.MapPut("/{idCarrinho}/{idProduto}", async (int idCarrinho, [FromBody] int novaQuantidade, AppDbContext db, int idProduto) =>
        {
            var ItemCarrinho = await db.ItemCarrinho
                                    .Where(Ic => Ic.CarrinhoId == idCarrinho && Ic.ProdutoId == idProduto)
                                    .SingleOrDefaultAsync();

            if (ItemCarrinho is null) return Results.NotFound();

            ItemCarrinho.Quantidade = novaQuantidade;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapPut("/{idCarrinho}", async (int idCarrinho, Carrinho carrinhoAlterado, AppDbContext db) =>
        {
            var carrinho = await db.Carrinhos
                .Include(c => c.Itens)
                .FirstOrDefaultAsync(c => c.Id == idCarrinho);

            if (carrinho is null) return Results.NotFound();

            carrinho.Itens = carrinhoAlterado.Itens;
            await db.SaveChangesAsync();

            return Results.Ok(carrinho);
        });


        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            var ItensCarrinho = await db.ItemCarrinho.Where(Ic => Ic.CarrinhoId == id).ToListAsync();
            db.ItemCarrinho.RemoveRange(ItensCarrinho);

            await db.SaveChangesAsync();

            if (await db.Carrinhos.FindAsync(id) is Carrinho carrinho)
            {
                return Results.NoContent();
            }
            return Results.NotFound();
        });

        group.MapDelete("/produto/{idCarrinho}/{idProduto}", async (int idCarrinho, int idProduto, AppDbContext db) =>
       {
           var ItensCarrinho = await db.ItemCarrinho
                                       .Where(Ic => Ic.CarrinhoId == idCarrinho && Ic.ProdutoId == idProduto)
                                       .SingleOrDefaultAsync();

           if (ItensCarrinho != null)
           {
               Console.WriteLine("itens do carrinho: " + ItensCarrinho);
               db.ItemCarrinho.Remove(ItensCarrinho);
               await db.SaveChangesAsync();
               return Results.NoContent();
           }

           return Results.NotFound(new
           {
               mensagem = "Item não encontrado.",
               erroCode = 404
           });
       });


    }
}