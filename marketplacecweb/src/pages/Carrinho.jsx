import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Carrinho() {

    const [itens, setItens] = useState([]);

    function listarItens() {
        axios.get("http://localhost:5262/carrinho/")
            .then((resposta) => {
                console.log(resposta.data);
                setItens(resposta.data);
            });
    }

    useEffect(listarItens, []);

    const produtos = itens.length > 0 ? itens[0].itens : []; 
    const idCarrinho = itens.length > 0 ? itens[0].id : null;

    function calcularTotal(produtos) 
    {
        let total = 0;
        for (let i = 0; i < produtos.length; i++)
            {
                const produto = produtos[i];
                total = total + (produto.produto.valor * produto.quantidade);

                console.log(produto.quantidade)
                console.log(total);
            }

            console.log(total);
        return total;
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="bg-light-purple text-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Carrinho de Compras</h2>
                {Tabela(produtos, idCarrinho)}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-purple-500">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-semibold">${calcularTotal(produtos)}</span>
                </div>
            </div>
        </div>
    );
}

function removerProduto(produto, idCarrinho) {
    const idProduto = produto.produto.id;

    console.log("Id Produto: " + idProduto);
    console.log("Id Carrinho: " + idCarrinho);

    axios.delete(`http://localhost:5262/carrinho/produto/${idCarrinho}/${idProduto}`)
    .then((response) => {

        console.log("Produto removido:", response.data);
        window.location.reload();
    })
    .catch((error) => {
        if (error.response) {
            
            console.error("Erro ao remover o produto:", error.response.data);

        } else if (error.request) {

            console.error("Erro na requisição:", error.request);

        } else {

            console.error("Erro:", error.message);

        }
    });
}

function aumentarQuantidade(produto, idCarrinho)
{
    const idProduto = produto.produto.id;
    let novaQuantidade = produto.quantidade;

    if(novaQuantidade > 0)
        {
            novaQuantidade = produto.quantidade + 1;

            axios.put(`http://localhost:5262/carrinho/${idCarrinho}/${idProduto}`, novaQuantidade , {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(() => {
                console.log("Quantidade atualizada");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Erro ao atualizar a quantidade:", error);
            });
        }
}

function diminuirQuantidade(produto, idCarrinho)
{
    const idProduto = produto.produto.id;
    let novaQuantidade = produto.quantidade;

    if(novaQuantidade > 0)
        {
            novaQuantidade = produto.quantidade - 1;

            axios.put(`http://localhost:5262/carrinho/${idCarrinho}/${idProduto}`, novaQuantidade , {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log("Quantidade atualizada");
                window.location.reload();
            })
            .catch((error) => {
                console.error("Erro ao atualizar a quantidade:", error);
            });
        }
}

function Tabela(produtos, idCarrinho) {
    return (
        <div>
            {Linhas(produtos, idCarrinho)}
        </div>
    );
}

function Linha(index, produto, idCarrinho) {
    return (
        <div key={index} className="bg-purple-600 rounded-lg p-4 mb-4 shadow-custom-light flex justify-between items-center">
            <div>
                <h3 className="text-sm font-medium">{produto.produto.nome}</h3>
                <p className="text-xs">Quantidade: {produto.quantidade}</p>
                <button 
                    className="ml-4 px-2 py-1 bg-very-light-purple text-white rounded hover:bg-white hover:text-black"
                    onClick={() => aumentarQuantidade(produto, idCarrinho)}
                >
                    +
                </button>
                <button 
                    className="ml-2 px-2 py-1 bg-very-light-purple text-white rounded hover:bg-white hover:text-black"
                    onClick={() => diminuirQuantidade(produto, idCarrinho)}
                >
                    -
                </button>
            </div>
            <span className="font-semibold">${(produto.quantidade * produto.produto.valor).toFixed(2)}</span>
            <button 
                className="ml-4 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={() => removerProduto(produto, idCarrinho)}
            >
                Remover
            </button>
        </div>
    );
}

function Linhas(produtos, idCarrinho) {
    const linhas = [];
    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        linhas[i] = Linha(i, produto, idCarrinho);
    }
    return linhas;
}


export default Carrinho;
