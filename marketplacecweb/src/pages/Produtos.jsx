import axios from "axios";
import { useState, useEffect } from "react";

function Produto() {
  const [produto, setProduto] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState({});

  async function salvarProduto(produto) {
    try {
      if (produto.id != null) {
        await axios.put(
          "http://localhost:5262/produtos/" + produto.id,
          produto
        );
      } else {
        await axios.post("http://localhost:5262/produtos/", produto);
      }
      setProduto(null);
      alert("Produto salvo com sucesso!");
      listarProdutos();
    } catch (error) {
      alert("Erro ao salvar o produto. Tente novamente.");
      console.error(error);
    }
  }

  function cancelar() {
    setProduto(null);
  }

  function listarProdutos() {
    axios.get("http://localhost:5262/produtos").then((resposta) => {
      setProdutos(resposta.data);
    });
  }

  function excluirProduto(produto) {
    try {
      axios
        .delete("http://localhost:5262/produtos/" + produto.id)
        .then(() => listarProdutos());
      alert("Produto excluído com sucesso");
    } catch (error) {
      alert("Erro ao deletar, tente novamente");
    }
  }

  function editarProduto(produto) {
    setProduto({
      id: produto.id,
      nome: produto.nome,
      descricao: produto.descricao,
      quantidade: produto.quantidade,
      valor: produto.valor,
      tag: produto.tag,
    });
  }

  function adicionarProduto() {
    setProduto({
      nome: "",
      descricao: "",
      quantidade: null,
      valor: null,
      tag: "",
    });
  }

  function onChangeProduto(campo, valor) {
    setProduto((produto) => ({
      ...produto,
      [campo]: valor,
    }));
  }

  function buscarCarrinho(userId) {
    axios
      .get("http://localhost:5262/carrinho/user/" + userId)
      .then((resposta) => {
        if (resposta.data != null) {
          setCarrinho(resposta.data);
        } else {
          const novoCarrinho = {
            usuarioId: userId,
            itens: [],
          };

          setCarrinho(novoCarrinho);

          axios.post("http://localhost:5262/carrinho/", novoCarrinho);
        }
      });
  }

  useEffect(() => {
    listarProdutos();
    buscarCarrinho(2);
  }, []);

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
              <th className="w-48 text-center">Ações</th>
              <th className="w-48 text-center">
                <button
                  className="border border-black rounded-xl p-2 "
                  onClick={adicionarProduto}>
                  Adicionar
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{Linhas(produtos)}</tbody>
        </table>
      </>
    );
  }

  const conteudoPrincipal = () => {
    if (produto == null) {
      return <div>{Lista(produtos)}</div>;
    } else {
      return Formulario();
    }
  };

  function Formulario() {
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
          onChange={(e) =>
            onChangeProduto(e.target.name, Number(e.target.value))
          }
        />
        <label htmlFor="valor">Valor</label>
        <input
          type="number"
          id="valor"
          name="valor"
          className="rounded-xl text-center no-spinner"
          value={produto.valor}
          onChange={(e) =>
            onChangeProduto(e.target.name, Number(e.target.value))
          }
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
            onClick={() => {
              salvarProduto(produto);
            }}
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

  function Linhas(produtos) {
    let linhas = [];
    for (let i = 0; i < produtos.length; i++) {
      const produto = produtos[i];
      linhas[i] = Linha(produto);
    }

    return linhas;
  }

  function Linha(produto) {
    return (
      <tr key={produto.id}>
        <td className="h-16 text-center">{produto.id}</td>
        <td className="h-16 text-center">{produto.nome}</td>
        <td className="h-16 text-center">{produto.descricao}</td>
        <td className="h-16 text-center">{produto.quantidade}</td>
        <td className="h-16 text-center">
          R${" "}
          {(Math.round(produto.valor * 100) / 100).toFixed(2).replace(".", ",")}
        </td>
        <td className="h-16 text-center">{produto.tag}</td>
        <td className="flex justify-around">
          <button
            className="border border-black rounded-xl p-2 "
            id={produto.id}
            onClick={() => {
              editarProduto(produto);
            }}>
            Editar
          </button>

          <button
            className="border border-black rounded-xl p-2 "
            id={produto.id}
            onClick={() => {
              excluirProduto(produto);
            }}>
            Excluir
          </button>
        </td>
        <td>
          <button
            className="border border-black rounded-xl p-2 m-auto mb-10"
            id={produto.id}
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
    const item = {
      produtoId: data.target.id,
      carrinhoid: carrinho.id,
      quantidade: 1,
    };

    axios.post("http://localhost:5262/carrinho/adicionarItem/", item);
  }

  return (
    <>
      <h1 className="text-center w-full bg-purple">Cadastro de produtos</h1>
      {conteudoPrincipal()}
    </>
  );
}
export default Produto;
