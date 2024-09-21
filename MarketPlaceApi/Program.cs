using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/", () => "Marketplace!");
app.MapProdutosAPI();
app.MapCuponsAPI();
app.MapAdministradoresAPI();
app.MapVendedoresAPI();
app.MapClientesAPI();


app.MapGet("/enderecos", async (AppDbContext db) => await db.Enderecos.ToListAsync());

app.MapGet("/enderecos/{id}", async (int id, AppDbContext db) =>
    await db.Enderecos.FindAsync(id) is Endereco endereco ? Results.Ok(endereco) : Results.NotFound());

app.MapPost("/enderecos", async (Endereco endereco, AppDbContext db) =>
{
    db.Enderecos.Add(endereco);
    await db.SaveChangesAsync();

    return Results.Created($"/enderecos/{endereco.Id}", endereco);
});

app.MapPut("/enderecos/{id}", async (int id, Endereco enderecoAlterado, AppDbContext db) =>
{
    var endereco = await db.Enderecos.FindAsync(id);
    if (endereco is null) return Results.NotFound();

    endereco.IdCliente = enderecoAlterado.IdCliente;
    endereco.Rua = enderecoAlterado.Rua;
    endereco.Numero = enderecoAlterado.Numero;
    endereco.Bairro = enderecoAlterado.Bairro;
    endereco.Cidade = enderecoAlterado.Cidade;
    endereco.Estado = enderecoAlterado.Estado;
    endereco.CEP = enderecoAlterado.CEP;
    endereco.Complemento = enderecoAlterado.Complemento;
  
    await db.SaveChangesAsync();
    return Results.NoContent();
});

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

app.MapGet("/carrinho", async (AppDbContext db) =>
    await db.Carrinhos
    .Include(c => c.Itens)     
    .ToListAsync());


app.MapGet("/carrinho/{id}", async (int id, AppDbContext db) => 
    await db.Carrinhos.FindAsync(id)
      is Carrinho carrinho
        ? Results.Ok(carrinho)
          : Results.NotFound());
    
app.MapPost("/carrinho", async (Carrinho carrinho, AppDbContext db) => {
    db.Carrinhos.Add(carrinho);
    await db.SaveChangesAsync();
    return Results.Created($"/carrinho/{carrinho.Id}", carrinho);
});

app.MapPut("/carrinho/{id}", async (int id, Carrinho carrinhoAlterado, AppDbContext db) =>
{
    var carrinho = await db.Carrinhos
        .Include(c => c.Itens)
        .FirstOrDefaultAsync(c => c.Id == id);

    if (carrinho is null) return Results.NotFound();
    // Limpar e adicionar itens
    carrinho.Itens.Clear();
    if (carrinhoAlterado.Itens != null)
    {
        carrinho.Itens.AddRange(carrinhoAlterado.Itens);
    }

    await db.SaveChangesAsync();

    return Results.NoContent();
});

app.MapDelete("carrinho/{id}", async (int id, AppDbContext db) =>
{
    if(await db.Carrinhos.FindAsync(id) is Carrinho carrinho){

        db.Carrinhos.Remove(carrinho);
        

        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();

});

app.Run();