import axios from "axios";
import { useState, useEffect } from "react";

function Produto() {

    const [produto, setProduto] = useState(null);
    const [produtos, setProdutos] = useState([]);

    async function salvarProduto(produto) {
        try {
            if (produto.id != null) {
                await axios.put("http://localhost:5262/produtos/" + produto.id, produto);
            } else {
                await axios.post("http://localhost:5262/produtos", produto);
            }
            setProduto(null);
            alert("Produto salvo com sucesso!");
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

    function excluirProduto(id) {
        try {
            axios.delete("http://localhost:5262/produtos/" + id).then(() => listarProdutos(setProdutos));
            alert("Produto excluído com sucesso");

        } catch (error) {
            alert("Erro ao deletar, tente novamente");
        }
    }

    function onChangeProduto(campo, valor) {
        setProduto((prevProduto) => ({
            ...prevProduto,
            [campo]: valor,
        }));
    }

    useEffect(() => {
        listarProdutos(setProdutos);
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
                            <th className="w-48 text-center"></th>
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
          return (
            <Formulario
              produto={produto}>
              </Formulario>
          );
        }
      };

      function Formulario({produto}) {
        setProduto({});
    
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
        linhas[i] = Linha(i, produto);
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
          <td className="flex justify-around">
            <button className="border border-black rounded-xl p-2 " id={index}>
              Editar
            </button>
    
            <button
              className="border border-black rounded-xl p-2 "
              id={index}
              onClick={() => {
                excluirProduto(index);
              }}>
              Excluir
            </button>
          </td>
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

      return (
        <>
          <h1 className="text-center w-full bg-purple">Cadastro de produtos</h1>
          {conteudoPrincipal()}
        </>
      );
}
export default Produto