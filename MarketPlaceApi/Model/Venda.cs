
public class Venda{
    public int Id {get; set;}
    public int IdCliente {get; set;}

    public int IdEndereco {get; set;}

    public int IdCupom { get; set; }

    public double precoTotal {get; set;}
    
    public List<ItemVenda> Itens { get; set; } = new List<ItemVenda>();
}


public class ItemVenda
{
    public int Id { get; set; }
    public int ProdutoId { get; set; }
    public int Quantidade { get; set; }
}