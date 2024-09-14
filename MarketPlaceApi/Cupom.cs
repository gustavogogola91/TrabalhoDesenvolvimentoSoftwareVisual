#region Cupom
public abstract class Cupom {
    public int Id { get; set; }
    public string? Codigo { get; set; }
    public double Desconto { get; set; }
    public bool Usado { get; set; }
    public double ValorMin { get; set; }
}
#endregion
