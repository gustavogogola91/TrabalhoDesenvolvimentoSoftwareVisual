using Microsoft.EntityFrameworkCore;

public static class CarrinhoAPI
{
    public static void MapCarrinhosAPI(this WebApplication app)
    {

        var group = app.MapGroup("/produtos");

        group.MapGet("/carrinho", async (AppDbContext db) =>
        await db.Carrinhos
        .Include(c => c.Itens)     
        .ToListAsync());


        group.MapGet("/carrinho/{id}", async (int id, AppDbContext db) => 
        {
            return await db.Carrinhos
                        .Where(c => c.Id == id)
                        .Include(c => c.Itens)
                        .ToListAsync();
        });
            
        group.MapPost("/carrinho", async (Carrinho carrinho, AppDbContext db) => 
        {
            db.Carrinhos.Add(carrinho);
            await db.SaveChangesAsync();
            return Results.Created($"/carrinho/{carrinho.Id}", carrinho);
        });

        group.MapPut("/carrinho/{id}", async (int id, Carrinho carrinhoAlterado, AppDbContext db) =>
        {
            var carrinho = await db.Carrinhos
                .Include(c => c.Itens)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (carrinho is null) return Results.NotFound();
            // Limpar e adicionar itens
            carrinho.Itens.Clear();
            if (carrinhoAlterado.Itens != null)
            {
                carrinho.Itens.AddRange(carrinhoAlterado.Itens);
            }

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapDelete("carrinho/{id}", async (int id, AppDbContext db) =>
        {
            if(await db.Carrinhos.FindAsync(id) is Carrinho carrinho){

                db.Carrinhos.Remove(carrinho);
                

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();

        });

    }
}