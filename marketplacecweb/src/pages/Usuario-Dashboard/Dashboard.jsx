import axios from "axios";
import { useEffect, useState } from "react";

const IDCLIENTE = localStorage.getItem("usuarioId");

function TotalSpendComponent(vendas) {

    const TotalPreco = () => {
        
        let precoTotal = 0
        
        vendas.forEach(venda => {
            precoTotal += venda.precoTotal
        });

        const formatoMoeda = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(precoTotal);

        return formatoMoeda

    }

    return(
        <div>
            <p className="text-[100px] font-bold text-purple text-center">{TotalPreco()}</p>
        </div>
    )
}

function TotalBuysComponent(vendas) {
    
    

    return(
        <div>
            <p className="text-[100px] font-bold text-purple text-center">{vendas.length}</p>
        </div>
    )
}


function Dashboard() {
    
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
        <div className="flex flex-row gap-3 justify-around items-center">
            <div className="w-[350px] h-[250px] bg-gray p-4 rounded-[3px]">
                <p className="text-light-purple font-bold text-[20px] ">Total de compras feitas:</p>
                <div> {TotalBuysComponent(vendas)} </div>
            </div>
            <div className=" h-[250px] bg-gray p-4 rounded-[3px]">
                <p className="text-light-purple font-bold text-[20px] ">Total Gasto na loja: </p>
                <div> {TotalSpendComponent(vendas)} </div>
            </div>
        </div>
    )
}



export default Dashboard;