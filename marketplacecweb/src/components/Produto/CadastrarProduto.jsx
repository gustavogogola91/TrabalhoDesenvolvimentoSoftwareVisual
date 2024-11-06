import { useState } from "react";
import axios from "axios";

function CadastrarProduto() {
  const [produto, setProduto] = useState({
    nome: "",
    descricao: "",
    quantidade: 0,
    valor: 0,
    idVendedor: 0,
    tag: "",
  });

  function onChangeProduto(campo, valor) {
    setProduto((prevProduto) => ({
      ...prevProduto,
      [campo]: valor,
    }));
  }

  async function salvarProduto() {
    try {
      await axios.post("http://localhost:5262/produtos", produto);
      alert("Produto salvo com sucesso!");
    } catch (error) {
      alert("Erro ao salvar o produto. Tente novamente.");
      console.error(error);
    }
  }

  function cancelar() {
    setProduto({
      nome: "",
      descricao: "",
      quantidade: 0,
      valor: 0,
      idVendedor: 0,
      tag: "",
    });
  }

  return (
    <form className="m-auto h-auto flex flex-col gap-4 w-96 bg-cream p-4 rounded-xl mb-24 text-center">
      <label htmlFor="nome">Nome</label>
      <input
        type="text"
        id="nome"
        name="nome"
        className="rounded-xl text-center"
        value={produto.nome}
        onChange={(e) => onChangeProduto(e.target.name, e.target.value)}
      />
      <label htmlFor="descricao">Descrição</label>
      <input
        type="text"
        id="descricao"
        name="descricao"
        className="rounded-xl text-center"
        value={produto.descricao}
        onChange={(e) => onChangeProduto(e.target.name, e.target.value)}
      />
      <label htmlFor="quantidade">Quantidade</label>
      <input
        type="number"
        id="quantidade"
        name="quantidade"
        className="rounded-xl text-center no-spinner"
        value={produto.quantidade}
        onChange={(e) => onChangeProduto(e.target.name, Number(e.target.value))}
      />
      <label htmlFor="valor">Valor</label>
      <input
        type="number"
        id="valor"
        name="valor"
        className="rounded-xl text-center no-spinner"
        value={produto.valor}
        onChange={(e) => onChangeProduto(e.target.name, Number(e.target.value))}
      />
      <label htmlFor="tag">Tag</label>
      <input
        type="text"
        id="tag"
        name="tag"
        className="rounded-xl text-center"
        value={produto.tag}
        onChange={(e) => onChangeProduto(e.target.name, e.target.value)}
      />

      <div className="flex flex-row gap-32 justify-center mt-10">
        <button
          type="button"
          onClick={salvarProduto}
          className="border border-black rounded-xl p-2">
          Salvar
        </button>
          <button
            type="button"
            onClick={cancelar}
            className="border border-black rounded-xl p-2">
            Cancelar
          </button>
      </div>
    </form>
  );
}

export default CadastrarProduto;
