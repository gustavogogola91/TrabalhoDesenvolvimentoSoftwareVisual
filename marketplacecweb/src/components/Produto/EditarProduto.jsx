import { useState } from "react";
import axios from "axios";

function EditarProduto() {
  const [produto, setProduto] = useState({});

  function onChangeProduto(campo, valor) {
    setProduto((prevProduto) => ({
      ...prevProduto,
      [campo]: valor,
    }));
  }

  async function buscarProduto(id) {
    try {
        axios
      .get("http://localhost:5262/produtos/" + id)
      .then((resposta) => setProduto(resposta.data));
    } catch(error) {
        alert("Erro ao buscar o produto. Tente novamente.")
    }
  }

  async function salvarProduto() {
    try {
      await axios.put("http://localhost:5262/produtos/" + produto.id, produto);
      alert("Produto salvo com sucesso!");
      setProduto({})
    } catch (error) {
      alert("Erro ao salvar o produto. Tente novamente.");
      console.error(error);
    }
  }

  return (
    <form className="m-auto h-auto flex flex-col gap-4 w-96 bg-cream p-4 rounded-xl mb-24 text-center">
      <label htmlFor="id">Informe o ID</label>
      <input
        type="number"
        id="name"
        name="id"
        className="rounded-xl text-center no-spinner"
        onChange={(e) => buscarProduto(e.target.value)}></input>
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
          <button type="button" className="border border-black rounded-xl p-2">
            Cancelar
          </button>
      </div>
    </form>
  );
}
export default EditarProduto;
