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
        <tr key={index} className="text-[20px] text-center  border-4 border-light-purple ">
            <td className=" rounded-[3px] bg-white text-light-purple font-bold">{venda.id}</td>
            <td className=" bg-white flex flex-row text-center justify-center gap-[10px] h-[100px] overflow-x-auto w-[900px] px-[5px] items-center">
                {venda.itens.map((item, itemIndex) =>
                    item.produto
                        .map((produto, produtoIndex) => (
                            <span className="">
                            <span key={`${itemIndex}-${produtoIndex}`} className="">
                                {produto.nome} <strong className=" text-center text-light-purple text-[25px]">x{item.quantidade}</strong>
                            </span>
                            </span>
                        ))
                )}
            </td>
            <td className=" rounded-r-[3px] bg-white">R${ venda.precoTotal }</td>
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
        <table className="min-w-full bg-gray">
            <thead className="text-light-purple text-[20px] ">
                <tr>
                    <th className="px-5 py-3">ID da Venda</th>
                    <th className="px-5 py-3">Produtos</th>
                    <th className="px-5 py-3">Total</th>
                </tr>
            </thead>
            <tbody className="space-y-32">
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
                    console.log(resposta.data);
                    
                    setVendas(resposta.data)
                }
            )
    }

    useEffect(listarVendas, [])

    return(
        <div className="">
            <h1>Histórico de compras</h1>
            { Tabelacompras(vendas) }
        </div>
    )
}

export default History;