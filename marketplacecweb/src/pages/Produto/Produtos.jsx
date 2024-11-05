import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const listProdutos = [];

function Produtos() {
  const [produtos, setProdutos] = useState([]);

  function listarProdutos() {
    axios.get("http://localhost:5262/produtos").then((resposta) => {
      console.log(resposta.data);
      setProdutos(resposta.data);
    });
  }

  useEffect(listarProdutos, []);

  function Lista(produtos) {
    return (
      <>
        <table className="m-auto table-auto bg-cream rounded-xl">
          <thead>
            <tr>
              <th className="w-16  h-16 p-2 text-center">ID</th>
              <th className="w-48 text-center">Nome</th>
              <th className="w-48 text-center">Descrição</th>
              <th className="w-48 text-center">Quantidade disponível</th>
              <th className="w-48 text-center">Preço</th>
              <th className="w-48 text-center">Tag</th>
            </tr>
          </thead>
          <tbody>{Linhas(produtos)}</tbody>
        </table>
      </>
    );
  }

  return <div>{Lista(produtos)}</div>;
}
export default Produtos;

function Linhas(produtos) {
  let linhas = [];
  for (let i = 0; i < produtos.length; i++) {
    const produto = produtos[i];
    linhas[i] = Linha(i, produto);
    listProdutos[i] = produtos[i];
  }

  return linhas;
}

function Linha(index, produto) {
  return (
    <tr key={index}>
      <td className="h-16 text-center">{produto.id}</td>
      <td className="h-16 text-center">{produto.nome}</td>
      <td className="h-16 text-center">{produto.descricao}</td>
      <td className="h-16 text-center">{produto.quantidade}</td>
      <td className="h-16 text-center">
        R${" "}
        {(Math.round(produto.valor * 100) / 100).toFixed(2).replace(".", ",")}
      </td>
      <td className="h-16 text-center">{produto.tag}</td>
      <td className="text-center">
        <button
          className="border border-black rounded-xl p-2 "
          id={index}
          onClick={adicionarCarrinho}
          disabled={!possuiDisponibilidade(produto)}>
          {possuiDisponibilidade(produto)
            ? "Adicionar ao carrinho"
            : "Indisponível"}
        </button>
      </td>
    </tr>
  );
}

function possuiDisponibilidade(produto) {
  if (produto.quantidade === 0) {
    return false;
  } else {
    return true;
  }
}

function adicionarCarrinho(data) {
  console.log(data.target.id);
  const i = data.target.id;
  console.log(listProdutos[i]);
}
