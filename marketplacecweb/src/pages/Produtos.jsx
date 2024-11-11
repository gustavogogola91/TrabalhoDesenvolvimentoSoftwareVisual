import axios from "axios";
import { useState, useEffect } from "react";

function Produto() {
  const [produto, setProduto] = useState(null);
  const [produtos, setProdutos] = useState([]);
  const [carrinho, setCarrinho] = useState({});
  const userId = localStorage.getItem("usuarioId");

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
    buscarCarrinho(userId);
  }, []);

  function Lista(produtos) {
    return (
      <div className="mx-32 overflow-x-auto flex flex-row justify-center relative shadow-md rounded-md">
        <table className="table-auto w-full bg-white">
          <thead className="text-white bg-purple">
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
                  className="rounded-[3px] p-3 bg-light-purple text-white font-bold shadow-md hover:bg-very-light-purple hover:text-purple transition duration-300 ease-in-out"
                  onClick={adicionarProduto}>
                  Adicionar
                </button>
              </th>
            </tr>
          </thead>
          <tbody>{Linhas(produtos)}</tbody>
        </table>
      </div>
    );
  }

  const conteudoPrincipal = () => {
    if (produto == null) {
      return <div className="bg-very-light-cream min-h-screen pt-[30px]">{Lista(produtos)}</div>;
    } else {
      return Formulario();
    }
  };

  function Formulario() {
    return (
      <form className="m-auto mt-10 h-auto flex flex-col gap-1 w-96 bg-light-purple py-6 px-10 rounded-[3px] mb-24 text-center">
        <label htmlFor="nome" className="text-[20px] font-bold text-very-light-cream">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          className="rounded-[3px] text-center mb-6 p-1"
          value={produto.nome}
          onChange={(e) => onChangeProduto(e.target.name, e.target.value)}
        />
        <label htmlFor="descricao" className="text-[20px] font-bold text-very-light-cream">Descrição</label>
        <input
          type="text"
          id="descricao"
          name="descricao"
          className="rounded-[3px] text-center mb-6 p-1"
          value={produto.descricao}
          onChange={(e) => onChangeProduto(e.target.name, e.target.value)}
        />
        <label htmlFor="quantidade" className="text-[20px] font-bold text-very-light-cream">Quantidade</label>
        <input
          type="number"
          id="quantidade"
          name="quantidade"
          className="rounded-[3px] text-center no-spinner mb-6 p-1"
          value={produto.quantidade}
          onChange={(e) =>
            onChangeProduto(e.target.name, Number(e.target.value))
          }
        />
        <label htmlFor="valor" className="text-[20px] font-bold text-very-light-cream">Valor</label>
        <input
          type="number"
          id="valor"
          name="valor"
          className="rounded-[3px] text-center no-spinner mb-6 p-1"
          value={produto.valor}
          onChange={(e) =>
            onChangeProduto(e.target.name, Number(e.target.value))
          }
        />
        <label htmlFor="tag" className="text-[20px] font-bold text-very-light-cream">Tag</label>
        <input
          type="text"
          id="tag"
          name="tag"
          className="rounded-[3px] text-center p-1"
          value={produto.tag}
          onChange={(e) => onChangeProduto(e.target.name, e.target.value)}
        />

        <div className="flex flex-row gap-32 justify-center mt-10">
          <button
            type="button"
            onClick={() => {
              salvarProduto(produto);
            }}
            className="rounded-[3px] py-2 px-5 bg-purple text-white font-bold shadow-md hover:bg-very-light-purple hover:text-purple transition duration-300 ease-in-out">
            Salvar
          </button>
          <button
            type="button"
            onClick={cancelar}
            className="rounded-[3px] py-2 px-5 bg-purple text-white font-bold shadow-md hover:bg-very-light-purple hover:text-purple transition duration-300 ease-in-out">
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
      <tr key={produto.id} className="border-b">
        <td className="h-16 text-purple px-3 py-6 text-center text-[20px] font-bold">{produto.id}</td>
        <td className="h-16 px-3 py-6 text-center">{produto.nome}</td>
        <td className="h-16 px-3 py-6 text-center">{produto.descricao}</td>
        <td className="h-16 px-3 py-6 text-center text-[20px] font-bold">{produto.quantidade}</td>
        <td className="h-16 px-3 py-6 text-center">
          R${" "}
          {(Math.round(produto.valor * 100) / 100).toFixed(2).replace(".", ",")}
        </td>
        <td className="h-16 text-center">{produto.tag}</td>
        <td className="flex flex-row justify-center gap-7">
          <button
            className="rounded-[3px] mt-5 p-2 bg-light-purple text-white font-bold shadow-md hover:bg-very-light-purple hover:text-purple transition duration-300 ease-in-out"
            id={produto.id}
            onClick={() => {
              editarProduto(produto);
            }}>
            Editar
          </button>

          <button
            className="rounded-[3px] mt-5 p-2 bg-light-purple text-white font-bold shadow-md hover:bg-very-light-purple hover:text-purple transition duration-300 ease-in-out"
            id={produto.id}
            onClick={() => {
              excluirProduto(produto);
            }}>
            Excluir
          </button>
        </td>
        <td>
          <button
            className="rounded-[3px] p-2 bg-light-purple text-white font-bold shadow-md hover:bg-very-light-purple hover:text-purple transition duration-300 ease-in-out"
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
      carrinhoid: carrinho[0].id,
      quantidade: 1,
    };

    try {
      axios.post("http://localhost:5262/carrinho/adicionarItem/", item);
      alert("Produto adicionado ao carrinho");
    } catch (error) {
      alert("Produto adicionado ao carrinho");
      console.error(error);
    }
  }

  return (
    <>
      <h1 className="text-center w-full text-[25px] font-bold text-white py-2 bg-purple">Cadastro de produtos</h1>
      {conteudoPrincipal()}
    </>
  );
}
export default Produto;
