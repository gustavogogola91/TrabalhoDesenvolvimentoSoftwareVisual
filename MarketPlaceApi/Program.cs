using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Configuração Entity Framework
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Clientes"));
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Vendedores"));
builder.Services.AddDbContext<AppDbContext>(options => options.UseInMemoryDatabase("Administradores"));

builder.Services.AddDatabaseDeveloperPageExceptionFilter();
//----------------------------

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

app.Run();