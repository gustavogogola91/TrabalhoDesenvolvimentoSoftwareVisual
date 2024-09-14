using Microsoft.EntityFrameworkCore;
using MarketPlaceApi.Data;
using MarketPlaceApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Configura o banco de dados em memória
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Enderecos"));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
 
var app = builder.Build();

// Endpoint para listar todos os endereços
app.MapGet("/enderecos", async (AppDbContext db) => await db.Enderecos.ToListAsync());

// Endpoint para obter um endereço específico por ID
app.MapGet("/enderecos/{id}", async (int id, AppDbContext db) =>
    await db.Enderecos.FindAsync(id) is Endereco endereco ? Results.Ok(endereco) : Results.NotFound());

// Endpoint para adicionar um novo endereço
app.MapPost("/enderecos", async (Endereco endereco, AppDbContext db) =>
{
    db.Enderecos.Add(endereco);
    await db.SaveChangesAsync();

    return Results.Created($"/enderecos/{endereco.Id}", endereco);
});

// Endpoint para atualizar um endereço existente
app.MapPut("/enderecos/{id}", async (int id, Endereco enderecoAlterado, AppDbContext db) =>
{
    var endereco = await db.Enderecos.FindAsync(id);
    if (endereco is null) return Results.NotFound();

    endereco.Rua = enderecoAlterado.Rua;
    endereco.Numero = enderecoAlterado.Numero;
    endereco.Bairro = enderecoAlterado.Bairro;
    endereco.Cidade = enderecoAlterado.Cidade;
    endereco.Estado = enderecoAlterado.Estado;
    endereco.CEP = enderecoAlterado.CEP;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

// Endpoint para deletar um endereço
app.MapDelete("/enderecos/{id}", async (int id, AppDbContext db) =>
{
    if (await db.Enderecos.FindAsync(id) is Endereco endereco)
    {
        db.Enderecos.Remove(endereco);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
});

app.Run();
