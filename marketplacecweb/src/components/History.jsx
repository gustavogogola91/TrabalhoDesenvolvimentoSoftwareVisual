import axios from "axios";
import { useEffect, useState } from "react";

const IDCLIENTE = 1;

// PROBLEMA EM RENDER

function ListarProdutos(ids) {
    const[produtos, setProdutos] = useState([])
    let string = ""

    function listarProdutos() {
        axios.get(`http://localhost:5262/vendas/cliente/${IDCLIENTE}`)
            .then(
                (resposta) => {
                    console.log(resposta.data)
                    setProdutos(resposta.data)
                }
            )
    }

    useEffect(listarProdutos, [])

    return string
}

function Linha(index, venda) {
    let produtos = venda.itens.map(item => item.id)

    return(
        <tr key={index}>
            <td>{venda.id}</td>
            <td>{ListarProdutos(produtos)}</td>
        </tr>
    )
}

function Linhas(vendas) {
    const linhas = []
    for (let i = 0; i < vendas.length; i++) {
        const venda = vendas[i];
        linhas[i] = Linha(i, venda)
    }

    return linhas
    
}

function Tabelacompras(vendas){

    return(
        <table>
            <thead>
                <tr>
                    <th>ID da Venda</th>
                    <th>Produtos</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                { Linhas(vendas) }
            </tbody>
        </table>
    )

}


function History(){

    const[vendas, setVendas] = useState([])

    function listarVendas() {
        axios.get(`http://localhost:5262/vendas/cliente/${IDCLIENTE}`)
            .then(
                (resposta) => {
                    console.log(resposta.data)
                    setVendas(resposta.data)
                }
            )
    }

    useEffect(listarVendas, [])

    return(
        <div>
            <h1>Histórico de compras</h1>
            { Tabelacompras(vendas) }
        </div>
    )
}

export default History;