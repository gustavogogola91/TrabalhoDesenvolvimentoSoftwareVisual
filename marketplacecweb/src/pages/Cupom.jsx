import React from 'react';

function CreateCoupon() {
    const toggleDiscountFields = () => {
        const discountType = document.getElementById("discountType").value;
        const percentageField = document.getElementById("percentageField");
        const fixedValueField = document.getElementById("fixedValueField");
        const freeShippingField = document.getElementById("freeShippingField");

        // Esconde todos os campos
        percentageField.classList.add("hidden");
        fixedValueField.classList.add("hidden");
        freeShippingField.classList.add("hidden");

        // Exibe o campo correspondente ao tipo selecionado
        if (discountType === "percentage") {
            percentageField.classList.remove("hidden");
        } else if (discountType === "fixed") {
            fixedValueField.classList.remove("hidden");
        } else if (discountType === "freeShipping") {
            freeShippingField.classList.remove("hidden");
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray">

            <div className="bg-light-purple p-6 rounded-lg shadow-lg w-full max-w-md">
                <h1 className="text-2xl font-bold text-center text-white">Criar Cupom</h1>
                <form action="/submit-coupon" method="post" className="flex flex-col mt-4">
                    <label htmlFor="couponName" className="font-semibold text-white mt-2">Código do Cupom:</label>
                    <input type="text" id="couponName" name="couponName" required className="p-2 border border-gray-300 rounded mt-1" />

                    <label htmlFor="discountType" className="font-semibold text-white mt-2">Tipo de Desconto:</label>
                    <select id="discountType" name="discountType" onChange={toggleDiscountFields} required className="p-2 border border-gray-300 rounded mt-1">
                        <option value="">Selecione o tipo</option>
                        <option value="percentage">Porcentagem</option>
                        <option value="fixed">Valor Fixo</option>
                        <option value="freeShipping">Frete Grátis</option>
                    </select>

                    {/* Desconto em Porcentagem */}
                    <div id="percentageField" className="hidden mt-2">
                        <label htmlFor="discountValue" className="font-semibold text-white">Valor do Desconto (%):</label>
                        <input type="number" id="discountValue" name="discountValue" min="0" max="100" className="p-2 border border-gray-300 rounded mt-1" />
                    </div>

                    {/* Valor Fixo */}
                    <div id="fixedValueField" className="hidden mt-2">
                        <label htmlFor="fixedValue" className="font-semibold text-white">Valor Fixo do Desconto (R$):</label>
                        <input type="number" id="fixedValue" name="fixedValue" min="0" className="p-2 border border-gray-300 rounded mt-1" />
                    </div>

                    {/* Frete Grátis */}
                    <div id="freeShippingField" className="hidden mt-2">
                        {/* Campo vazio para o tipo Frete Grátis */}
                    </div>

                    <label htmlFor="activationDate" className="font-semibold text-white mt-2">Data de Ativação:</label>
                    <input type="date" id="activationDate" name="activationDate" required className="p-2 border border-gray-300 rounded mt-1" />

                    <label htmlFor="expiryDate" className="font-semibold text-white mt-2">Data de Expiração:</label>
                    <input type="date" id="expiryDate" name="expiryDate" required className="p-2 border border-gray-300 rounded mt-1" />

                    <input type="submit" value="Criar Cupom" className="mt-4 p-2 bg-purple text-white rounded cursor-pointer hover:bg-very-light-purple hover:text-black transition duration-300 ease-in-out" />
                </form>
            </div>
        </div>
    );
}

export default CreateCoupon;
