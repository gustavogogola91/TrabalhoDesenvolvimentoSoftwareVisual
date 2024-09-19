using Microsoft.EntityFrameworkCore;

public static class VendaAPI
{
    public static void MapVendasAPI(this WebApplication app)
    {
        var group = app.MapGroup("/vendas");

        group.MapGet("/", async (AppDbContext db) =>
        {
            var vendas = await db.Vendas
                .Include(v => v.ProdutosVendidos)
                .ToListAsync();

            return Results.Ok(vendas);
        });

        group.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            var venda = await db.Vendas
                .Include(v => v.ProdutosVendidos)
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
            venda.IdVendedor = vendaAlterada.IdVendedor;

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