using Microsoft.EntityFrameworkCore;

public static class ProdutoAPI
{
    public static void MapProdutosAPI(this WebApplication app)
    {

        var group = app.MapGroup("/produtos");

        group.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Produtos.ToListAsync();
        });

        group.MapGet("/disponiveis", async (AppDbContext db) =>
        {
            return await db.Produtos.Where(p => p.Quantidade >= 1).ToListAsync();
        });

        group.MapGet("/tag/{tag}", async (string tag, AppDbContext db) =>
        {
            return await db.Produtos.Where(p => p.Tag == tag).ToListAsync();
        });

        group.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Produtos.FindAsync(id) is Produto produto ? Results.Ok(produto) : Results.NotFound();
        });

        group.MapPost("/", async (Produto produto, AppDbContext db) =>
        {
            db.Produtos.Add(produto);
            await db.SaveChangesAsync();

            return Results.Created($"/tarefas/{produto.Id}", produto);
        });

        group.MapPut("/{id}", async (int id, Produto produtoAlterado, AppDbContext db) =>
        {
            var produto = await db.Produtos.FindAsync(id);
            if (produto is null) return Results.NotFound();

            produto.Nome = produtoAlterado.Nome;
            produto.Descricao = produtoAlterado.Descricao;
            produto.Quantidade = produtoAlterado.Quantidade;
            produto.Valor = produtoAlterado.Valor;
            produto.IdVendedor = produtoAlterado.IdVendedor;
            produto.Tag = produtoAlterado.Tag;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Produtos.FindAsync(id) is Produto produto)
            {

                db.Produtos.Remove(produto);

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
}