import React, { useState } from 'react';
import axios from 'axios';

var port = 5262; // Porta para comunicação da API

function CriarCupom() {
    const [formData, setFormData] = useState({
        cupomCodigo: '',
        discountType: '',
        discountValue: 0,
        dataAtivacao: '',
        dataExpiracao: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cupomData = {
            Codigo: formData.cupomCodigo,
            Desconto: formData.discountValue / 100,
            DataAtivacao: formData.dataAtivacao,
            DataExpiracao: formData.dataExpiracao,
        };

        try {
            // Envia o cupom para a API
            const response = await axios.post(`http://localhost:${port}/cupons`, cupomData);
            console.log('Cupom salvo no banco de dados:', response.data);

            alert('Cupom criado com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar o cupom:', error);
            alert('Erro ao criar o cupom');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray">
            <div className="bg-light-purple p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-white">Criar Cupom</h1>
                <form onSubmit={handleSubmit} className="flex flex-col mt-4">
                    <label htmlFor="couponName" className="font-semibold text-white mt-2">Código do Cupom:</label>
                    <input type="text" id="couponName" name="cupomCodigo" value={formData.cupomCodigo} onChange={handleChange} required className="p-2 border border-gray-300 rounded mt-1" />

                        <div id="percentageField" className="mt-2">
                            <label htmlFor="discountValue" className="font-semibold text-white">Valor do Desconto (%):</label>
                            <input type="number" id="discountValue" name="discountValue" min="0" max="100" value={formData.discountValue} onChange={handleChange} className="p-2 border border-gray-300 rounded mt-1" />
                        </div>



                    <label htmlFor="activationDate" className="font-semibold text-white mt-2">Data de Ativação:</label>
                    <input type="date" id="activationDate" name="dataAtivacao" value={formData.dataAtivacao} onChange={handleChange} required className="p-2 border border-gray-300 rounded mt-1" />

                    <label htmlFor="expiryDate" className="font-semibold text-white mt-2">Data de Expiração:</label>
                    <input type="date" id="expiryDate" name="dataExpiracao" value={formData.dataExpiracao} onChange={handleChange} required className="p-2 border border-gray-300 rounded mt-1" />

                    <input type="submit" value="Criar Cupom" className="mt-4 p-2 bg-purple text-white rounded cursor-pointer hover:bg-very-light-purple hover:text-black transition duration-300 ease-in-out" />
                </form>
            </div>
        </div>
    );
}

export default CriarCupom;
