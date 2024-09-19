
public class Venda{
    public int Id {get; set;}
    public int IdCliente {get; set;}
    public int IdVendedor {get; set;}

    public List<Produto> ProdutosVendidos { get; set; } = new List<Produto>(); 


}