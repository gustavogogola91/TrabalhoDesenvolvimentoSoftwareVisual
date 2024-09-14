using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Produtos"));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/produtos", async (AppDbContext db) => await db.Produtos.ToListAsync());

app.MapGet("/produtos/disponiveis", async (AppDbContext db) => await db.Produtos.Where(p => p.Quantidade >= 1).ToListAsync());

app.MapGet("/produtos/tag/{tag}", async (string tag, AppDbContext db) => await db.Produtos.Where(p => p.Tag == tag).ToListAsync());

app.MapGet("/produto/{id}", async (int id, AppDbContext db) => await db.Produtos.FindAsync(id) is Produto produto ? Results.Ok(produto) : Results.NotFound());

app.MapPost("/produto", async (Produto produto, AppDbContext db) =>
{
    db.Produtos.Add(produto);
    await db.SaveChangesAsync();

    return Results.Created($"/tarefas/{produto.Id}", produto);
});

app.Run();