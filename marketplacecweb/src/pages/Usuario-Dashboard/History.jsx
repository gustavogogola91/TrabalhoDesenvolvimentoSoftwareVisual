import axios from "axios";
import { useEffect, useState } from "react";

const IDCLIENTE = 1;

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

    let string = ""

    venda.itens.forEach(item => {
        item.produtos.forEach(produto => {
            string += produto.nome + ", "
        })
    })

    return(
        <tr key={index}>
            <td>{venda.id}</td>
            <td>{
            string
            }</td>
            <td>{ venda.idCliente }</td>
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
                    //ACESSAR NOMES
                    // resposta.data.forEach(venda => {
                    //     venda.itens.forEach(item => {
                    //         item.produtos.forEach(produto => {
                    //             console.log(produto.nome);
                    //             ;
                    //         });
                    //     });
                    // });
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