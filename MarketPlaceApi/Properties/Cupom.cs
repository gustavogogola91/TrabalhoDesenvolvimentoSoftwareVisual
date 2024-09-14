#region Cupom
public abstract class Cupom {
    private int Id { get; set; }
    private string? Codigo { get; set; }
    public double Desconto { get; set; }
    private bool Usado { get; set; }
    private double ValorMin { get; set; }
    private string? Status { get; set; }
}
#endregion
