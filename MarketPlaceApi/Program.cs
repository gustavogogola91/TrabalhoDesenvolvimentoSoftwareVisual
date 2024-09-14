using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Vendas"));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/vendas", async (AppDbContext db) =>
    await db.Vendas.ToListAsync());

app.MapGet("/vendas/{id}", async (int id, AppDbContext db) => 
    await db.Vendas.FindAsync(id)
      is Venda venda
        ? Results.Ok(venda)
          : Results.NotFound());

app.MapPost("/vendas", async (Venda venda, AppDbContext db) => {
    db.Vendas.Add(venda);
    await db.SaveChangesAsync();
    return Results.Created($"/vendas/{venda.Id}", venda);
});


app.Run();
