using Microsoft.EntityFrameworkCore;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Vendas"));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/", () => "Hello World!");

app.MapPost("/vendas", async (Venda venda, AppDbContext db) => {
    db.Vendas.Add(venda);
    await db.SaveChangesAsync();
    return Results.Created($"/vendas/{venda.Id}", venda);
});


app.Run();
