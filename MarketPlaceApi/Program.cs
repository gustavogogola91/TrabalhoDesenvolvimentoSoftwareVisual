using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();

app.MapGet("/", () => "Marketplace!");
app.MapProdutosAPI();
app.MapVendasAPI();
app.MapCarrinhosAPI();
app.MapEnderecosAPI();
app.MapCuponsAPI();
app.MapAdministradoresAPI();
app.MapVendedoresAPI();
app.MapClientesAPI();

app.Run();