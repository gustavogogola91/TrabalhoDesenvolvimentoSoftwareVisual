using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Vendas"));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/vendas", async (AppDbContext db) =>
{
    var vendas = await db.Vendas
        .Include(v => v.ProdutosVendidos)
        .ToListAsync();

    return Results.Ok(vendas);
});

app.MapGet("/vendas/{id}", async (int id, AppDbContext db) =>
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

app.MapPost("/vendas", async (Venda venda, AppDbContext db) => {
    db.Vendas.Add(venda);
    await db.SaveChangesAsync();
    return Results.Created($"/vendas/{venda.Id}", venda);
});


app.Run();
