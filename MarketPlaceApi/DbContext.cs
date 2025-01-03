using Microsoft.EntityFrameworkCore;

class AppDbContext : DbContext {
    public AppDbContext (DbContextOptions<AppDbContext> options) : base(options) {}

    protected override void OnConfiguring(DbContextOptionsBuilder builder)
    {
        var com = "server=localhost;port=3306;database=marketplace;user=root;password=root";

        builder.UseMySQL(com).EnableSensitiveDataLogging();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Venda>()
            .HasMany(v => v.Itens)
            .WithOne()
            .OnDelete(DeleteBehavior.Cascade); // Configura exclusão em cascata
    }   

    public DbSet<Usuario> Usuarios => Set<Usuario>();
    
    public DbSet<Venda> Vendas => Set<Venda>();

    public DbSet<Cupom> Cupons => Set<Cupom>();
  
    public DbSet<Produto> Produtos => Set<Produto>();
  
    public DbSet<Endereco> Enderecos => Set<Endereco>();
    
    public DbSet<Carrinho> Carrinhos => Set<Carrinho>();

    public DbSet<ItemCarrinho> ItemCarrinho => Set<ItemCarrinho>();



}

