import { useState, useEffect } from 'react';
import History from "./History.jsx"
import userLogo from "../../imgs/icon-user.png"
import Dashboard from './Dashboard.jsx';



function Usuario() {
    // Componente do SidePanel
    function SidePanel({ setCurrentComponent }) {
        const [selectedButton, setSelectedButton] = useState(localStorage.getItem("page") || 'dashboard');
    
        const handleButtonClick = (buttonId) => {
            localStorage.setItem("page", buttonId);
            setSelectedButton(buttonId);
            setCurrentComponent(buttonId);
        };
    
        return (
            <div className="bg-purple h-[400px] w-1/8 flex flex-col items-center gap-2 text-center p-5 m-5 rounded-[3px]">
                <h1 className="text-white p-2 font-bold text-[20px]">Marketplace</h1>
                <img src={userLogo} alt="Foto usuario" className='w-[100px] bg-light-purple rounded-full p-2'/>
                <button className={`text-left font-bold p-5 m-5 rounded-[3px] transition duration-300 ease-in ${selectedButton === 'dashboard' ? 'bg-very-light-purple text-light-purple' : 'bg-purple text-white'}`} 
                    onClick={() => handleButtonClick('dashboard')}>
                    Dashboard
                </button>
                <button className={`text-left font-bold p-5 m-5 rounded-[3px] transition duration-300 ease-in ${selectedButton === 'history' ? 'bg-very-light-purple text-light-purple' : 'bg-purple text-white'}`} 
                    onClick={() => handleButtonClick('history')}>
                    Histórico de compras
                </button>
            </div>
        );
    }

    // Estado para controlar o componente atual
    const [currentComponent, setCurrentComponent] = useState(localStorage.getItem("page") || 'dashboard');

    // Função para renderizar o componente correto
    function getCurrentComponent() {
        if (currentComponent === 'history') {
            return <History />;
        } else if (currentComponent === 'dashboard') {
            return <Dashboard />;
        } else {
            return <h1>ERRO</h1>;
        }
    }

    return (
        <div className="flex flex-row justify-around">
            <SidePanel setCurrentComponent={setCurrentComponent} />
            <div className="w-3/4 pl-6 pr-10 py-5">
                <h2 className="text-purple text-[30px] font-bold pb-10">Olá, Usuário</h2>
                { getCurrentComponent() }
            </div>
        </div>
    );
}



export default Usuario;