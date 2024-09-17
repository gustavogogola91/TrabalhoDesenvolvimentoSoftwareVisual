using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Enderecos"));
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Clientes"));
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Vendedores"));
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Administradores"));
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Vendas"));
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Cupons"));
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Produtos"));
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Carrinhos"));


builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/", () => "Marketplace!");

#region Cliente
#region GetCliente

app.MapGet("/clientes", async (AppDbContext db) =>
    await db.Clientes.ToListAsync());

app.MapGet("/clientes/{id}", async (int id, AppDbContext db) => 
    await db.Clientes.FindAsync(id)
      is Cliente cliente
        ? Results.Ok(cliente)
          : Results.NotFound());

#endregion

#region PostCliente

app.MapPost("/clientes", async (Cliente cliente, AppDbContext db) => {
    db.Clientes.Add(cliente);
    await db.SaveChangesAsync();
    return Results.Created($"/clientes/{cliente.Id}", cliente);
});

#endregion

#region PutCliente

app.MapPut("clientes/{id}", async (int id, Cliente clienteAlterado, AppDbContext db) =>
{
    var cliente = await db.Clientes.FindAsync(id);
    if (cliente is null) return Results.NotFound();

    cliente.Nome = clienteAlterado.Nome;
    cliente.Email = clienteAlterado.Email;
    cliente.Senha = clienteAlterado.Senha;
    cliente.IdCarrinho = clienteAlterado.IdCarrinho;
    cliente.IdComprasHist = clienteAlterado.IdComprasHist;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

#endregion

#region DeleteCliente

app.MapDelete("clientes/{id}", async (int id, AppDbContext db) =>
{
    if(await db.Clientes.FindAsync(id) is Cliente cliente){
        db.Clientes.Remove(cliente);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
 
});
#endregion
#endregion

#region Vendedor
#region GetVendedor

app.MapGet("/vendedores", async (AppDbContext db) =>
    await db.Vendedores.ToListAsync());

app.MapGet("/vendedores/{id}", async (int id, AppDbContext db) => 
    await db.Vendedores.FindAsync(id)
      is Vendedor vendedor
        ? Results.Ok(vendedor)
          : Results.NotFound());

#endregion

#region PostVendedor

app.MapPost("/vendedores", async (Vendedor vendedor, AppDbContext db) => {
    db.Vendedores.Add(vendedor);
    await db.SaveChangesAsync();
    return Results.Created($"/vendedores/{vendedor.Id}", vendedor);
});

#endregion

#region PutVendedores

app.MapPut("vendedores/{id}", async (int id, Vendedor vendedorAlterado, AppDbContext db) =>
{
    var vendedor = await db.Vendedores.FindAsync(id);
    if (vendedor is null) return Results.NotFound();

    vendedor.Nome = vendedorAlterado.Nome;
    vendedor.Email = vendedorAlterado.Email;
    vendedor.Senha = vendedorAlterado.Senha;
    vendedor.IdVenda = vendedorAlterado.IdVenda;
    vendedor.IdVendaHist = vendedorAlterado.IdVendaHist;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

#endregion

#region DeleteVendedores

app.MapDelete("vendedores/{id}", async (int id, AppDbContext db) =>
{
    if(await db.Vendedores.FindAsync(id) is Vendedor vendedor){
        db.Vendedores.Remove(vendedor);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound(); 
});
#endregion
#endregion

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

#region Administrador
#region GetAdministrador

app.MapGet("/administradores", async (AppDbContext db) =>
    await db.Administradores.ToListAsync());

app.MapGet("/administradores/{id}", async (int id, AppDbContext db) => 
    await db.Administradores.FindAsync(id)
      is Administrador administrador
        ? Results.Ok(administrador)
          : Results.NotFound());

#endregion

#region PostAdministrador

app.MapPost("/administradores", async (Administrador administrador, AppDbContext db) => {
    db.Administradores.Add(administrador);
    await db.SaveChangesAsync();
    return Results.Created($"/administradores/{administrador.Id}", administrador);
});

#endregion

#region PutAdministrador

app.MapPut("administradores/{id}", async (int id, Administrador administradorAlterado, AppDbContext db) =>
{
    var administrador = await db.Administradores.FindAsync(id);
    if (administrador is null) return Results.NotFound();

    administrador.Nome = administradorAlterado.Nome;
    administrador.Email = administradorAlterado.Email;
    administrador.Senha = administradorAlterado.Senha;
    administrador.PinAcesso = administradorAlterado.PinAcesso;

    await db.SaveChangesAsync();
    return Results.NoContent();
});

#endregion

#region DeleteAdministrador

app.MapDelete("administradores/{id}", async (int id, AppDbContext db) =>
{
    if(await db.Administradores.FindAsync(id) is Administrador administrador){
        db.Administradores.Remove(administrador);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
});

#endregion
#endregion




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
});

app.Run();