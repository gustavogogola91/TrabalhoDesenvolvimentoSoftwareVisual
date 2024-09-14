using Microsoft.EntityFrameworkCore;
using MarketPlaceApi.Models;

namespace MarketPlaceApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Endereco> Enderecos => Set<Endereco>();
    }
}
