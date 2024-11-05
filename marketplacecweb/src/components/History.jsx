import axios from "axios";
import { useEffect, useState } from "react";

const IDCLIENTE = 1;

// PROBLEMA EM RENDER

function ListarProdutos(ids) {
    
        let produtosDict = {}
        axios.get(`http://localhost:5262/vendas/cliente/${IDCLIENTE}`)
            .then(
                (resposta) => {
                    console.log(resposta.data)
                }
            )

    return {
        produtosString: "amognus",
        valor: "pao",
    }
}

function Linha(index, venda) {
    let produtosids = venda.itens.map(item => item.id)
    const produtos = ListarProdutos(produtosids)

    return(
        <tr key={index}>
            <td>{venda.id}</td>
            <td>{ produtos.produtosNome }</td>
            <td>{ produtos.valor }</td>
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