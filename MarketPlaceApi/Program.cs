using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>();
builder.Services.AddDatabaseDeveloperPageExceptionFilter();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors();

var app = builder.Build();
app.UseSwagger();
app.UseSwaggerUI();
app.UseCors(builder => builder
.AllowAnyOrigin()
.AllowAnyHeader()
.AllowAnyMethod()
);

app.MapGet("/", () => "Marketplace!");
app.MapProdutosAPI();
app.MapVendasAPI();
app.MapCarrinhosAPI();
app.MapEnderecosAPI();
app.MapCuponsAPI();
app.MapUsuariosAPI();
app.Run();