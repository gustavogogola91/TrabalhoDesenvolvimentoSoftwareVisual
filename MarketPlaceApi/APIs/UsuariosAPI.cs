using Microsoft.EntityFrameworkCore;

public static class UsuariosAPI
{

    #region Usuario
    public static void MapUsuariosAPI(this WebApplication app)
    {

        var group = app.MapGroup("/usuarios");

        group.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Usuarios.ToListAsync();
        });

        group.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Usuarios.FindAsync(id) is Usuario usuario ? Results.Ok(usuario) : Results.NotFound();
        });

        group.MapPost("/", async (Usuario usuario, AppDbContext db) =>
        {
            db.Usuarios.Add(usuario);
            await db.SaveChangesAsync();

            return Results.Created($"/usuarios/{usuario.Id}", usuario);
        });

        group.MapPut("/{id}", async (int id, Usuario usuarioAlterado, AppDbContext db) =>
        {
            var usuario = await db.Usuarios.FindAsync(id);
            if (usuario is null) return Results.NotFound();

            usuario.Nome = usuarioAlterado.Nome;
            usuario.Email = usuarioAlterado.Email;
            usuario.Senha = usuarioAlterado.Senha;
            usuario.IdCarrinho = usuarioAlterado.IdCarrinho;

            await db.SaveChangesAsync();

            return Results.Ok( new {message = "Dados alterados com sucesso"});
        });

        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Usuarios.FindAsync(id) is Usuario usuario)
            {

                db.Usuarios.Remove(usuario);

                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });

        group.MapPost("/login", async (Dictionary<string, string> loginData, AppDbContext db) =>
        {
            string email = loginData["emailL"];
            string senha = loginData["password"];

            var emailCadastrado = await db.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
            
            if (emailCadastrado is null) {
                return Results.Ok(new { message = "Email não cadastrado", email});
            }

            // Procura um usuário com o email e senha fornecidos
            var usuario = await db.Usuarios
                .Where(u => u.Email == email && u.Senha == senha)
                .FirstOrDefaultAsync();

            if (usuario is not null) {
                return Results.Ok(new { message = "Login bem-sucedido", usuario});
            }
            else {
                return Results.Ok(new { message = "Senha incorreta", usuario});
            }
        });

        group.MapPost("/register", async (Dictionary<string, string> registerData, AppDbContext db) =>
        {
            string username = registerData["nome"];
            string email = registerData["email"];
            string senha1 = registerData["senha"];
            string senha2 = registerData["confirmPassword"];

            var emailCadastrado = await db.Usuarios.FirstOrDefaultAsync(u => u.Email == email);
            
            if (emailCadastrado is not null) {
                return Results.Ok(new { message = "Email já utilizado, caso tenha esquecido a senha: " + emailCadastrado.Senha, email});
            }

            return Results.Ok( new {message = "Ok"});
        });
    }
} 
    #endregion

    // #region Cliente
    // public static void MapClientesAPI(this WebApplication app)
    // {

    //     var group = app.MapGroup("/clientes");

    //     group.MapGet("/", async (AppDbContext db) =>
    //     {
    //         return await db.Clientes.ToListAsync();
    //     });

    //     group.MapGet("/{id}", async (int id, AppDbContext db) =>
    //     {
    //         return await db.Clientes.FindAsync(id) is Cliente cliente ? Results.Ok(cliente) : Results.NotFound();
    //     });

    //     group.MapPost("/", async (Cliente cliente, AppDbContext db) =>
    //     {
    //         db.Clientes.Add(cliente);
    //         await db.SaveChangesAsync();

    //         return Results.Created($"/clientes/{cliente.Id}", cliente);
    //     });

    //     group.MapPut("/{id}", async (int id, Cliente clienteAlterado, AppDbContext db) =>
    //     {
    //         var cliente = await db.Clientes.FindAsync(id);
    //         if (cliente is null) return Results.NotFound();

    //         cliente.Nome = clienteAlterado.Nome;
    //         cliente.Email = clienteAlterado.Email;
    //         cliente.Senha = clienteAlterado.Senha;
    //         cliente.IdCarrinho = clienteAlterado.IdCarrinho;
    //         cliente.IdComprasHist = clienteAlterado.IdComprasHist;

    //         await db.SaveChangesAsync();

    //         return Results.NoContent();
    //     });

    //     group.MapDelete("/{id}", async (int id, AppDbContext db) =>
    //     {
    //         if (await db.Clientes.FindAsync(id) is Cliente cliente)
    //         {

    //             db.Clientes.Remove(cliente);

    //             await db.SaveChangesAsync();
    //             return Results.NoContent();
    //         }
    //         return Results.NotFound();
    //     });
    // }
    // #endregion

    // #region Vendedor
    // public static void MapVendedoresAPI(this WebApplication app)
    // {

    //     var group = app.MapGroup("/vendedores");

    //     group.MapGet("/", async (AppDbContext db) =>
    //     {
    //         return await db.Vendedores.ToListAsync();
    //     });

    //     group.MapGet("/{id}", async (int id, AppDbContext db) =>
    //     {
    //         return await db.Vendedores.FindAsync(id) is Vendedor vendedor ? Results.Ok(vendedor) : Results.NotFound();
    //     });

    //     group.MapPost("/", async (Vendedor vendedor, AppDbContext db) =>
    //     {
    //         db.Vendedores.Add(vendedor);
    //         await db.SaveChangesAsync();

    //         return Results.Created($"/vendedores/{vendedor.Id}", vendedor);
    //     });

    //     group.MapPut("/{id}", async (int id, Vendedor vendedorAlterado, AppDbContext db) =>
    //     {
    //         var vendedor = await db.Vendedores.FindAsync(id);
    //         if (vendedor is null) return Results.NotFound();

    //         vendedor.Nome = vendedorAlterado.Nome;
    //         vendedor.Email = vendedorAlterado.Email;
    //         vendedor.Senha = vendedorAlterado.Senha;
    //         vendedor.IdVenda = vendedorAlterado.IdVenda;
    //         vendedor.IdVendaHist = vendedorAlterado.IdVendaHist;

    //         await db.SaveChangesAsync();

    //         return Results.NoContent();
    //     });

    //     group.MapDelete("/{id}", async (int id, AppDbContext db) =>
    //     {
    //         if (await db.Vendedores.FindAsync(id) is Vendedor vendedor)
    //         {

    //             db.Vendedores.Remove(vendedor);

    //             await db.SaveChangesAsync();
    //             return Results.NoContent();
    //         }
    //         return Results.NotFound();
    //     });
    // }
    // #endregion

    // #region Administrador
    // public static void MapAdministradoresAPI(this WebApplication app)
    // {

    //     var group = app.MapGroup("/administradores");

    //     group.MapGet("/", async (AppDbContext db) =>
    //     {
    //         return await db.Administradores.ToListAsync();
    //     });

    //     group.MapGet("/{id}", async (int id, AppDbContext db) =>
    //     {
    //         return await db.Administradores.FindAsync(id) is Administrador administrador ? Results.Ok(administrador) : Results.NotFound();
    //     });

    //     group.MapPost("/", async (Administrador administrador, AppDbContext db) =>
    //     {
    //         db.Administradores.Add(administrador);
    //         await db.SaveChangesAsync();

    //         return Results.Created($"/administradores/{administrador.Id}", administrador);
    //     });

    //     group.MapPut("/{id}", async (int id, Administrador administradorAlterado, AppDbContext db) =>
    //     {
    //         var administrador = await db.Administradores.FindAsync(id);
    //         if (administrador is null) return Results.NotFound();

    //         administrador.Nome = administradorAlterado.Nome;
    //         administrador.Email = administradorAlterado.Email;
    //         administrador.Senha = administradorAlterado.Senha;
    //         administrador.PinAcesso = administradorAlterado.PinAcesso;

    //         await db.SaveChangesAsync();

    //         return Results.NoContent();
    //     });

    //     group.MapDelete("/{id}", async (int id, AppDbContext db) =>
    //     {
    //         if (await db.Administradores.FindAsync(id) is Administrador administrador)
    //         {

    //             db.Administradores.Remove(administrador);

    //             await db.SaveChangesAsync();
    //             return Results.NoContent();
    //         }
    //         return Results.NotFound();
    //     });
    // }

    // #endregion
