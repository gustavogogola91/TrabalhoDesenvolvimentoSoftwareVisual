import { useState } from 'react';
import History from "./History.jsx"
import userLogo from "../../imgs/icon-user.png"
import Dashboard from './Dashboard.jsx';
import UserOptions from "./UserOptions.jsx";

const username = localStorage.getItem("usuarioNome");

function Usuario() {

    //função para sair
    function SairConta() {
        localStorage.removeItem("usuarioId");
        localStorage.removeItem("usuarioNome");
        localStorage.removeItem("flagCupom");
        window.location.href = '/login'
    }

    // Componente do SidePanel
    function SidePanel({ setCurrentComponent }) {
        const [selectedButton, setSelectedButton] = useState(localStorage.getItem("page") || 'dashboard');
    
        const handleButtonClick = (buttonId) => {
            localStorage.setItem("page", buttonId);
            setSelectedButton(buttonId);
            setCurrentComponent(buttonId);
        };
        return (
            <div className="shadow-md bg-purple h-full w-1/8 flex flex-col items-center gap-2 text-center p-5 m-5 rounded-[3px]">
                <h1 className="text-white p-2 font-bold text-[20px]">Marketplace</h1>
                <img src={userLogo} alt="Foto usuario" className='shadow-md w-[100px] bg-light-purple rounded-full p-2'/>
                <button className={`shadow-md text-left font-bold p-5 m-5 rounded-[3px] transition duration-300 ease-in ${selectedButton === 'dashboard' ? 'bg-very-light-purple text-light-purple' : 'bg-purple text-white'}`} 
                    onClick={() => handleButtonClick('dashboard')}>
                    Dashboard
                </button>
                <button className={`shadow-md text-left font-bold p-5 m-5 rounded-[3px] transition duration-300 ease-in ${selectedButton === 'history' ? 'bg-very-light-purple text-light-purple' : 'bg-purple text-white'}`} 
                    onClick={() => handleButtonClick('history')}>
                    Histórico de compras
                </button>
                <button className={`shadow-md text-left font-bold p-5 m-5 rounded-[3px] transition duration-300 ease-in ${selectedButton === 'userOptions' ? 'bg-very-light-purple text-light-purple' : 'bg-purple text-white'}`} 
                    onClick={() => handleButtonClick('userOptions')}>
                    Opções de Conta
                </button>

                <button className={`shadow-md text-left font-bold px-8 py-3 m-5 rounded-[3px] transition duration-300 ease-in bg-red-700 text-white`} 
                    onClick={() => SairConta()}>
                    SAIR
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
        } else if (currentComponent === 'userOptions') {
            return <UserOptions />;
        } else {
            return <h1>ERRO</h1>;
        }
    }

    return (
        <div className="bg-very-light-cream min-h-screen flex flex-row justify-around">
            <SidePanel setCurrentComponent={setCurrentComponent} />
            <div className="w-3/4 pl-6 pr-10 py-5">
                <h2 className="text-purple text-[30px] font-bold pb-10">Olá, {username}!</h2>
                { getCurrentComponent() }
            </div>
        </div>
    );
}



export default Usuario;