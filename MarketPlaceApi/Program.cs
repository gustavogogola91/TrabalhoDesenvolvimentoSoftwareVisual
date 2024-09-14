using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>();

builder.Services.AddDatabaseDeveloperPageExceptionFilter();

var app = builder.Build();
