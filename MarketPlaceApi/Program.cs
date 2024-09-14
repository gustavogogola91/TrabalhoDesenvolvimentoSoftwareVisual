using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Configuração Entity Framework
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseInMemoryDatabase("Cupons")
);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/", () => "Planner API");

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






app.Run();
