import React, { useState } from 'react';
import History from "./History.jsx"

function SidePanel() {
    let valor = localStorage.getItem("page")

    const [selectedButton, setSelectedButton] = useState(valor)

    const handleButtonClick = (buttonId) => {
        if (valor == null) {
            setSelectedButton('dashboard')
        } else {
            setSelectedButton(buttonId)
        }
    }

    return (
        <div className="bg-purple w-1/4 flex flex-col text-center p-5 m-5 rounded-3xl">
            <h1 className="text-white font-bold text-[20px]">Marketplace</h1>
            <button className={`text-left  font-bold p-5 m-5 rounded-3xl transition duration-300 ease-in ${selectedButton === 'dashboard' ? 'bg-very-light-purple text-light-purple' : 'bg-purple text-white'}`} onClick={() => {
                localStorage.setItem("page", 'dashboard')
                valor = localStorage.getItem("page")
                handleButtonClick(valor)
            }
            }>Dashboard</button>
            <button className={`text-left  font-bold p-5 m-5 rounded-3xl transition duration-300 ease-in ${selectedButton === 'history' ? 'bg-very-light-purple text-light-purple' : 'bg-purple text-white'}`} onClick={() => {
                localStorage.setItem("page", 'history')
                valor = localStorage.getItem("page")
                handleButtonClick(valor)
            }}>Histórico de compras</button>
        </div>
    )
}

function Usuario() {
    return (
        <div className="flex flex-row">
            <SidePanel />
            <div className="w-3/4">
                <h2>Olá, Usuário</h2>
                <History />
            </div>
        </div>
    )
}

export default Usuario;