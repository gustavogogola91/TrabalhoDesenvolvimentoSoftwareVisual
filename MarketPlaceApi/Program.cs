using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

//Configuração Entity Framework
builder.Services.AddDbContext<AppDbContext>(
    options => options.UseInMemoryDatabase("Cupom")
);
builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/", () => "Planner API");

app.MapGet("/Cupom", async (AppDbContext db) =>
    await db.Cupons.ToListAsync());

app.MapGet("/Cupom/{id}", async (int id, AppDbContext db) => 
    await db.Cupons.FindAsync(id)
      is Cupom cupom
        ? Results.Ok(cupom)
          : Results.NotFound());
    
app.MapPost("/Cupom", async (Cupom cupom, AppDbContext db) => {
    db.Cupons.Add(cupom);
    await db.SaveChangesAsync();
    return Results.Created($"/Cupom/{cupom.Id}", cupom);
});


app.MapPut("Cupom/{id}", async (int id, Cupom cupomAlterado, AppDbContext db) =>
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

app.MapDelete("Cupom/{id}", async (int id, AppDbContext db) =>
{
    if(await db.Cupons.FindAsync(id) is Cupom cupom){

        db.Cupons.Remove(cupom);
        await db.SaveChangesAsync();
        return Results.NoContent();
    }
    return Results.NotFound();
 
});





app.MapGet("/produtos", () => "Produtos");
app.MapGet("/pessoas", () => "Pessoas");
app.MapGet("/pessoas/{id}", () => "Pessoa 1");

app.MapPost("/pessoas", () => "POST pessoa");
app.MapPost("/produtos", () => "POST produto");

app.MapPut("/pessoas/{id}", () => "PUT pessoa");
app.MapPut("/produtos/{id}", () => "PUT produto");

app.MapDelete("/pessoas/{id}", () => "DELETE pessoa");
app.MapDelete("/produtos/{id}", () => "DELETE produto");

app.Run();
