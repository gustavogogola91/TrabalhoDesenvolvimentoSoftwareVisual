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
                {Tabela(produtos)}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-purple-500">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-semibold">${calcularTotal(produtos)}</span>
                </div>
            </div>
        </div>
    );
}

function Tabela(produtos) {
    return (
        <div>
            {Linhas(produtos)}
        </div>
    );
}

function Linha(index, produto) {
    return (
        <div key={index} className="bg-purple-600 rounded-lg p-4 mb-4 shadow-custom-light flex justify-between items-center">
            <div>
                <h3 className="text-sm font-medium">{produto.produto.nome}</h3>
                <p className="text-xs">Quantidade: {produto.quantidade}</p>
            </div>
            <span className="font-semibold">${(produto.quantidade * produto.produto.valor).toFixed(2)}</span>
        </div>
    );
}

function Linhas(produtos) {
    const linhas = [];
    for (let i = 0; i < produtos.length; i++) {
        const produto = produtos[i];
        linhas[i] = Linha(i, produto);
    }
    return linhas;
}


export default Carrinho;
