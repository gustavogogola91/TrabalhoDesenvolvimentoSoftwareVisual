public abstract class Usuario {
    private int Id {get; set;};
    private string? Nome {get; set;};
    private string? Email {get; set;};
    private string? Senha {get; set;};
}
#endregion

#region Cliente
public class Cliente : Usuario {
    private int IdCarrinho {get; set;};
    private int IdComprasHist {get; set;};
}
#endregion

#region Vendedor
public class Vendedor : Usuario {
    private int IdVenda {get; set;};
    private int IdVendaHist {get; set;};
}
#endregion

#region Administrador
public class Administrador : Usuario {
    private int PinAcesso {get; set;};
}
#endregion