using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Configuração Entity Framework
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseInMemoryDatabase("Clientes")
);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
//----------------------------

var app = builder.Build();

app.MapGet("/", () => "X Marketplace!");

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
// #region Vendedor
// app.MapGet("/vendedores", async (AppDbContext db) =>
//     await db.Vendedores.ToListAsync());

// app.MapGet("/vendedores/{id}", async (int id, AppDbContext db) => 
//     await db.Vendedores.FindAsync(id)
//       is Vendedor vendedor
//         ? Results.Ok(vendedor)
//           : Results.NotFound());

// #endregion
// #region Administrador
// app.MapGet("/administradores", async (AppDbContext db) =>
//     await db.Administradores.ToListAsync());

// app.MapGet("/administradores/{id}", async (int id, AppDbContext db) => 
//     await db.Administradores.FindAsync(id)
//       is Administrador administrador
//         ? Results.Ok(administrador)
//           : Results.NotFound());

// #endregion

app.Run();