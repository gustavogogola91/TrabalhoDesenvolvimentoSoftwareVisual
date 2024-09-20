using Microsoft.EntityFrameworkCore;

public static class EnderecoAPI
{
    public static void MapEnderecosAPI(this WebApplication app)
    {

        var group = app.MapGroup("/enderecos");

        group.MapGet("/", async (AppDbContext db) =>
        {
            return await db.Enderecos.ToListAsync();
        });

        group.MapGet("/{id}", async (int id, AppDbContext db) =>
        {
            return await db.Enderecos.FindAsync(id) is Endereco endereco ? Results.Ok(endereco) : Results.NotFound();
        });

        group.MapPost("/", async (Endereco endereco, AppDbContext db) =>
        {
            db.Enderecos.Add(endereco);
            await db.SaveChangesAsync();

            return Results.Created($"/enderecos/{endereco.Id}", endereco);
        });

        group.MapPut("/{id}", async (int id, Endereco enderecoAlterado, AppDbContext db) =>
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

        group.MapDelete("/{id}", async (int id, AppDbContext db) =>
        {
            if (await db.Enderecos.FindAsync(id) is Endereco endereco)
            {
                db.Enderecos.Remove(endereco);
                await db.SaveChangesAsync();
                return Results.NoContent();
            }
            return Results.NotFound();
        });
    }
}
