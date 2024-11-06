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
    return (
        <tr key={index} className="text-[20px] text-center">
            <td className="rounded-l-3xl bg-white">{venda.id}</td>
            <td className=" bg-white flex flex-row gap-6 justify-center items-center max-w-[900px] overflow-x-auto h-[100px]">
                {venda.itens.map((item, itemIndex) =>
                    item.produto
                        .map((produto, produtoIndex) => (
                            <span key={`${itemIndex}-${produtoIndex}`}>
                                {produto.nome} <strong className="text-light-purple text-[25px]">x{item.quantidade}</strong>
                            </span>
                        ))
                )}
            </td>
            <td className=" rounded-r-3xl bg-white">{venda.idCliente}</td>
        </tr>
    );
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
        <div className="rounded-3xl  bg-gray p-[10px]">
        <table className="min-w-full ">
            <thead className="text-light-purple text-[20px]">
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
        </div>
    )

}


function History(){

    const[vendas, setVendas] = useState([])

    function listarVendas() {
        axios.get(`http://localhost:5262/vendas/cliente/${IDCLIENTE}`)
            .then(
                (resposta) => {
                    console.log(resposta.data);
                    
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