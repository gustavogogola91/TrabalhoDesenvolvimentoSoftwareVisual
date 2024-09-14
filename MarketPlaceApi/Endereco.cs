using System;

namespace EcommerceApp
{
    public class Endereco
    {
        public string Rua { get; set; }
        public string Numero { get; set; }
        public string Bairro { get; set; }
        public string Cidade { get; set; }
        public string Estado { get; set; }
        public string CEP { get; set; }
        
        public Endereco(string rua, string numero, string bairro, string cidade, string estado, string cep)
        {
            Rua = rua;
            Numero = numero;
            Bairro = bairro;
            Cidade = cidade;
            Estado = estado;
            CEP = cep;
        }

        public void ExibirEndereco()
        {
            Console.WriteLine($"Endereço: {Rua}, {Numero}, {Bairro}, {Cidade} - {Estado}, CEP: {CEP}");
        }
    }

    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Digite seu endereço de entrega:");

            Console.Write("Rua: ");
            string rua = Console.ReadLine();

            Console.Write("Número: ");
            string numero = Console.ReadLine();

            Console.Write("Bairro: ");
            string bairro = Console.ReadLine();

            Console.Write("Cidade: ");
            string cidade = Console.ReadLine();

            Console.Write("Estado: ");
            string estado = Console.ReadLine();

            Console.Write("CEP: ");
            string cep = Console.ReadLine();

            // Cria o objeto Endereco com os dados fornecidos
            Endereco endereco = new Endereco(rua, numero, bairro, cidade, estado, cep);

            // Exibe o endereço configurado
            Console.WriteLine("\nEndereço configurado com sucesso:");
            endereco.ExibirEndereco();
        }
    }
}
