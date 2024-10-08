using Microsoft.EntityFrameworkCore;

public static class UsuariosAPI
{
    #region Cliente
    public static void MapClientesAPI(this WebApplication app)
    {

        var group = app.MapGroup("/clientes");

        group.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Clientes.ToListAsync();
        });

        group.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Clientes.FindAsync(id) is Cliente cliente ? Results.Ok(cliente) : Results.NotFound();
        });

        group.MapPost("/", async (Cliente cliente, AppDbContext db) =>
        {
            db.Clientes.Add(cliente);
            await db.SaveChangesAsync();

            return Results.Created($"/clientes/{cliente.Id}", cliente);
        });

        group.MapPut("/{id}", async (int id, Cliente clienteAlterado, AppDbContext db) =>
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

        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Clientes.FindAsync(id) is Cliente cliente)
            {

                db.Clientes.Remove(cliente);

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
    #endregion

    #region Vendedor
    public static void MapVendedoresAPI(this WebApplication app)
    {

        var group = app.MapGroup("/vendedores");

        group.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Vendedores.ToListAsync();
        });

        group.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Vendedores.FindAsync(id) is Vendedor vendedor ? Results.Ok(vendedor) : Results.NotFound();
        });

        group.MapPost("/", async (Vendedor vendedor, AppDbContext db) =>
        {
            db.Vendedores.Add(vendedor);
            await db.SaveChangesAsync();

            return Results.Created($"/vendedores/{vendedor.Id}", vendedor);
        });

        group.MapPut("/{id}", async (int id, Vendedor vendedorAlterado, AppDbContext db) =>
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

        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Vendedores.FindAsync(id) is Vendedor vendedor)
            {

                db.Vendedores.Remove(vendedor);

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
    #endregion

    #region Administrador
    public static void MapAdministradoresAPI(this WebApplication app)
    {

        var group = app.MapGroup("/administradores");

        group.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Administradores.ToListAsync();
        });

        group.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Administradores.FindAsync(id) is Administrador administrador ? Results.Ok(administrador) : Results.NotFound();
        });

        group.MapPost("/", async (Administrador administrador, AppDbContext db) =>
        {
            db.Administradores.Add(administrador);
            await db.SaveChangesAsync();

            return Results.Created($"/administradores/{administrador.Id}", administrador);
        });

        group.MapPut("/{id}", async (int id, Administrador administradorAlterado, AppDbContext db) =>
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

        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Administradores.FindAsync(id) is Administrador administrador)
            {

                db.Administradores.Remove(administrador);

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }

    #endregion
}