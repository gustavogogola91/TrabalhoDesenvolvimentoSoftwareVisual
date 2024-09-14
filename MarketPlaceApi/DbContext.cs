using Microsoft.EntityFrameworkCore;

class AppDbContext : DbContext {
    public AppDbContext (DbContextOptions<AppDbContext> options) : base(options) {}
  
    public DbSet<Cliente> Clientes => Set<Cliente>();

    public DbSet<Vendedor> Vendedores => Set<Vendedor>();

    public DbSet<Administrador> Administradores => Set<Administrador>();

    public DbSet<Venda> Vendas => Set<Venda>();

    public DbSet<Cupom> Cupons => Set<Cupom>();
    public DbSet<Produto> Produtos => Set<Produto>();

}