using Microsoft.EntityFrameworkCore;

public static class CupomAPI
{
    public static void MapCuponsAPI(this WebApplication app)
    {

        var group = app.MapGroup("/cupons");

        group.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Cupons.ToListAsync();
        });

        group.MapGet("/{id}", async (int id, AppDbContext db) => 
        {
            return await db.Cupons.FindAsync(id) is Cupom cupom ? Results.Ok(cupom) : Results.NotFound();
        });
    
        group.MapPost("/", async (Cupom cupom, AppDbContext db) => 
        {
            db.Cupons.Add(cupom);
            await db.SaveChangesAsync();

            return Results.Created($"/cupom/{cupom.Id}", cupom);
        });

        group.MapPut("/{id}", async (int id, Cupom cupomAlterado, AppDbContext db) =>
        {
            var cupom = await db.Cupons.FindAsync(id);
            if (cupom is null) return Results.NotFound();
        
            cupom.Codigo = cupomAlterado.Codigo;
            cupom.Desconto = cupomAlterado.Desconto;
            cupom.ValorMin = cupomAlterado.ValorMin;
        
            await db.SaveChangesAsync();
        
            return Results.NoContent();
        });

        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Cupons.FindAsync(id) is Cupom cupom)
            {
            
                db.Cupons.Remove(cupom);

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
}