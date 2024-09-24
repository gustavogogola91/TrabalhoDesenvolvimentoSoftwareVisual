public class Carrinho
{
    public int Id { get; set; }

    public int UsuarioId { get; set; }
    public Usuario Usuario { get; set; }

    // Lista de Produtos no carrinho
    public List<ItemCarrinho> Itens { get; set; } = new List<ItemCarrinho>();
}

public class ItemCarrinho
{
    public int Id { get; set; }
    
    
    public int ProdutoId { get; set; }

    public int CarrinhoId {get; set;}
    
    public Produto Produto { get; set; }

    public int Quantidade { get; set; }
}
