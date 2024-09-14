using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Cupons"));

builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Produtos"));
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();


app.MapGet("/", () => "MarketPlace");

app.MapGet("/cupom", async (AppDbContext db) =>
    await db.Cupons.ToListAsync());

app.MapGet("/cupom/{id}", async (int id, AppDbContext db) => 
    await db.Cupons.FindAsync(id)
      is Cupom cupom
        ? Results.Ok(cupom)
          : Results.NotFound());
    
app.MapPost("/cupom", async (Cupom cupom, AppDbContext db) => {
    db.Cupons.Add(cupom);
    await db.SaveChangesAsync();
    return Results.Created($"/cupom/{cupom.Id}", cupom);
});

app.MapPut("cupom/{id}", async (int id, Cupom cupomAlterado, AppDbContext db) =>
{
    var cupom = await db.Cupons.FindAsync(id);
    if (cupom is null) return Results.NotFound();

    cupom.Codigo = cupomAlterado.Codigo;
    cupom.Desconto = cupomAlterado.Desconto;
    cupom.Usado = cupomAlterado.Usado;
    cupom.ValorMin = cupomAlterado.ValorMin;
  
    await db.SaveChangesAsync();

    return Results.NoContent();

});

app.MapDelete("cupom/{id}", async (int id, AppDbContext db) =>
{
    if(await db.Cupons.FindAsync(id) is Cupom cupom){

        db.Cupons.Remove(cupom);
        
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();

});

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

app.MapPut("/produto/{id}", async (int id, Produto produtoAlterado, AppDbContext db) =>
{

    var produto = await db.Produtos.FindAsync(id);
    if (produto is null) return Results.NotFound();

    produto.Nome = produtoAlterado.Nome;
    produto.Descricao = produtoAlterado.Descricao;
    produto.Quantidade = produtoAlterado.Quantidade;
    produto.Valor = produtoAlterado.Valor;
    produto.IdVendedor = produtoAlterado.IdVendedor;
    produto.Tag = produtoAlterado.Tag;

    await db.SaveChangesAsync();

    return Results.NoContent();

});

app.MapDelete("/produto/{id}", async (int id, AppDbContext db) =>
{

    if (await db.Produtos.FindAsync(id) is Produto produto)
    {

        db.Produtos.Remove(produto);

        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
}

app.Run();