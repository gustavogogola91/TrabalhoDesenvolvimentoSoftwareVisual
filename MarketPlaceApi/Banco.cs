using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext {

    public AppDbContext(
        DbContextOptions<AppDbContext> options)
         : base(options)
    {
    }

    //Definição Cliente
    public DbSet<Cliente> Clientes => Set<Cliente>();
    //Definição Vendedor
    public DbSet<Vendedor> Vendedores => Set<Vendedor>();
    //Definição Administrador
    public DbSet<Administrador> Administradores => Set<Administrador>();

}