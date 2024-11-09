import { useState, useEffect } from 'react';
import History from "./History.jsx"
import userLogo from "../../imgs/icon-user.png"
import Dashboard from './Dashboard.jsx';

function SidePanel() {
    const [selectedButton, setSelectedButton] = useState(localStorage.getItem("page") || 'dashboard')

    const handleButtonClick = (buttonId) => {
        localStorage.setItem("page", buttonId)
        setSelectedButton(buttonId)
    }


    return (
        <div className="bg-purple h-[400px] w-1/8 flex flex-col items-center gap-2 text-center p-5 m-5 rounded-[3px]">
            <h1 className="text-white p-2 font-bold text-[20px]">Marketplace</h1>
            <img src={ userLogo } alt="Foto usuario" className='w-[100px] bg-light-purple rounded-full p-2'/>
            <button className={`text-left font-bold p-5 m-5 rounded-[3px] transition duration-300 ease-in ${selectedButton === 'dashboard' ? 'bg-very-light-purple text-light-purple' : 'bg-purple text-white'}`} 
                onClick={() => handleButtonClick('dashboard')}>
                Dashboard
            </button>
            <button className={`text-left font-bold p-5 m-5 rounded-[3px] transition duration-300 ease-in ${selectedButton === 'history' ? 'bg-very-light-purple text-light-purple' : 'bg-purple text-white'}`} 
                onClick={() => handleButtonClick('history')}>
                Histórico de compras
            </button>
        </div>
    )
}

function Usuario() {

    function getCurrentComponent(){
        let valor = localStorage.getItem("page")
        console.log(valor);
        
        if (valor === 'history'){
            return <History/>
        }else if(valor === 'dashboard'){
            return <Dashboard/>
        }else{
            return <h1>ERRO</h1>
        }
    }

    
    return (
        <div className="flex flex-row">
            <SidePanel />
            <div className="w-3/4 pl-6 pr-10 py-10">
                <h2>Olá, Usuário</h2>
                { getCurrentComponent() }
            </div>
        </div>
    )
}

export default Usuario;