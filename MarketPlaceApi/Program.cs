using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/", () => "Marketplace!");
app.MapProdutosAPI();
app.MapCarrinhosAPI();
app.MapEnderecosAPI();
app.MapCuponsAPI();
app.MapAdministradoresAPI();
app.MapVendedoresAPI();
app.MapClientesAPI();

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

app.MapPut("vendas/{id}", async (int id, Venda vendaAlterada, AppDbContext db) =>
{
    var venda = await db.Vendas.FindAsync(id);
    if (venda is null) return Results.NotFound();

    venda.IdCliente = vendaAlterada.IdCliente;
    venda.IdVendedor = vendaAlterada.IdVendedor;

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("vendas/{id}", async (int id, AppDbContext db) =>
{
    if(await db.Vendas.FindAsync(id) is Venda venda){

        db.Vendas.Remove(venda);

        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
 
});

app.Run();