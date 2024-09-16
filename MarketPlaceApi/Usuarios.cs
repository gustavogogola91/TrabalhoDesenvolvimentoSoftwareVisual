#region Usuario
public abstract class Usuario {
    public int Id {get; set;}
    public string? Nome {get; set;}
    public string? Email {get; set;}
    public string? Senha {get; set;}
}
#endregion

#region Cliente
public class Cliente : Usuario {
    public int IdCarrinho {get; set;}
    public int IdComprasHist {get; set;}
}
#endregion

#region Vendedor
public class Vendedor : Usuario {
    public int IdVenda {get; set;}
    public int IdVendaHist {get; set;}
}
#endregion

#region Administrador
public class Administrador : Usuario {
    public int PinAcesso {get; set;}
}
#endregion