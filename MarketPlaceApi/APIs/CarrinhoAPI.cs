using Microsoft.EntityFrameworkCore;

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
            
        group.MapPost("/", async (Carrinho carrinho, AppDbContext db) => 
        {
            db.Carrinhos.Add(carrinho);
            await db.SaveChangesAsync();
            return Results.Created($"/carrinho/{carrinho.Id}", carrinho);
        });

        group.MapPut("/{id}", async (int id, Carrinho carrinhoAlterado, AppDbContext db) =>
        {
            var carrinho = await db.Carrinhos
                .Include(c => c.Itens)
                .FirstOrDefaultAsync(c => c.Id == id);

            if (carrinho is null) return Results.NotFound();
            
            carrinho.Itens = carrinhoAlterado.Itens;
            carrinho.UsuarioId = carrinhoAlterado.UsuarioId;

            await db.SaveChangesAsync();

            return Results.NoContent();
        });

        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
           var ItensCarrinho = await db.ItemCarrinho.Where(Ic => Ic.CarrinhoId == id).ToListAsync();
            db.ItemCarrinho.RemoveRange(ItensCarrinho);

            await db.SaveChangesAsync();


            if(await db.Carrinhos.FindAsync(id) is Carrinho carrinho){

                db.Carrinhos.Remove(carrinho);
                

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();

        });

    }
}