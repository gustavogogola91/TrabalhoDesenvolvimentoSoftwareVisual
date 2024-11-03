import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"

function ExcluirProduto() {

    const [produto, setProduto] = useState({});

    async function buscarProduto(id) {
        try {
            axios
          .get("http://localhost:5262/produtos/" + id)
          .then((resposta) => setProduto(resposta.data));
        } catch(error) {
            alert("Erro ao buscar o produto. Tente novamente.")
        }
      }

    function excluirProduto(id) {
        try {
            axios.delete("http://localhost:5262/produtos/"+ id)
            alert("Produto excluído com sucesso")
            window.location.href = "//localhost:3000/produtos"
        } catch(error) {
            alert("Erro ao deletar, tente novamente")
        }
    }

    return (
        <form className="m-auto h-auto flex flex-col gap-4 w-96 bg-cream p-4 rounded-xl mb-24 text-center">
          <label htmlFor="id">Informe o ID</label>
          <input
            type="number"
            id="id"
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
            disabled
          />
          <label htmlFor="descricao">Descrição</label>
          <input
            type="text"
            id="descricao"
            name="descricao"
            className="rounded-xl text-center"
            value={produto.descricao}
            disabled
          />
          <label htmlFor="quantidade">Quantidade</label>
          <input
            type="number"
            id="quantidade"
            name="quantidade"
            className="rounded-xl text-center no-spinner"
            value={produto.quantidade}
            disabled
          />
          <label htmlFor="valor">Valor</label>
          <input
            type="number"
            id="valor"
            name="valor"
            className="rounded-xl text-center no-spinner"
            value={produto.valor}
            disabled
          />
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            id="tag"
            name="tag"
            className="rounded-xl text-center"
            value={produto.tag}
            disabled
          />
    
          <div className="flex flex-row gap-32 justify-center mt-10">
            <button
              type="button"
              onClick={() => excluirProduto(document.getElementById("id").value)}
              className="border border-black rounded-xl p-2">
              Excluir
            </button>
            <NavLink to="/gerenciarProdutos">
              <button type="button" className="border border-black rounded-xl p-2">
                Cancelar
              </button>
            </NavLink>
          </div>
        </form>
      );
}
export default ExcluirProduto