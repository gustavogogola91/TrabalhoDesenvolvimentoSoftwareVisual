
public class Venda{
    public int Id {get; set;}
    public int IdCliente {get; set;}
    public List<int> ProdutoIds { get; set; } = new List<int>(); 
    public List<Produto> ProdutosVendidos { get; set; } = new List<Produto>(); 
    public List<ItemVenda> Itens { get; set; } = new List<ItemVenda>();
}


public class ItemVenda
{
    public int Id { get; set; }
    public int ProdutoId { get; set; }
    public int Quantidade { get; set; }
}