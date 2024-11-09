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
    const formatoMoeda = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(venda.precoTotal);

    return (
        <tr key={index} className="bg-white border-b text-[20px] text-center ">
            <td className="py-4 px-6 text-light-purple font-bold">{venda.id}</td>
            <td className="py-4 px-6 flex flex-row text-center justify-center gap-[10px] w-[900px] overflow-x-auto items-center">
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
            <td className="py-4 px-6 rounded-r-[3px] bg-white">{ formatoMoeda }</td>
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
        <div className="overflow-x-auto relative shadow-md rounded-lg">
            <table className="w-full text-left">
                <thead className="text-white uppercase text-center bg-light-purple text-[20px] ">
                    <tr>
                        <th className="px-3 py-6">ID da Venda</th>
                        <th className="px-3 py-6">Produtos</th>
                        <th className="px-3 py-6">Total</th>
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
        <div className="">
            <h1 className="text-purple text-[23px] text-center pb-3">Histórico de compras</h1>
            { Tabelacompras(vendas) }
        </div>
    )
}

export default History;