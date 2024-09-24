using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();

app.MapGet("/", () => "Marketplace!");
app.MapProdutosAPI();
app.MapCarrinhosAPI();
app.MapEnderecosAPI();
app.MapCuponsAPI();
app.MapAdministradoresAPI();
app.MapVendedoresAPI();
app.MapClientesAPI();

app.Run();