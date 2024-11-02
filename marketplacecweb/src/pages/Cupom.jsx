function Cupom() {
    return(
        <>
        <div className="coupon-form-container">
            {/* Botão de voltar */}
            <a href="#" className="back-button">Voltar</a> {/* Substitua "#" pelo caminho desejado */}

            <div className="container">
                <h1>Criar Cupom</h1>
                <form action="/submit-coupon" method="post">
                    <label htmlFor="couponName">Código do Cupom:</label>
                    <input type="text" id="couponName" name="couponName" required />

                    <label htmlFor="discountType">Tipo de Desconto:</label>
                    <select id="discountType" name="discountType" onChange={handleDiscountTypeChange} required>
                        <option value="">Selecione o tipo</option>
                        <option value="percentage">Porcentagem</option>
                        <option value="fixed">Valor Fixo</option>
                        <option value="freeShipping">Frete Grátis</option>
                    </select>

                    {/* Campo para Desconto em Porcentagem */}
                    {discountType === 'percentage' && (
                        <div id="percentageField">
                            <label htmlFor="discountValue">Valor do Desconto (%):</label>
                            <input type="number" id="discountValue" name="discountValue" min="0" max="100" />
                        </div>
                    )}

                    {/* Campo para Valor Fixo */}
                    {discountType === 'fixed' && (
                        <div id="fixedValueField">
                            <label htmlFor="fixedValue">Valor Fixo do Desconto (R$):</label>
                            <input type="number" id="fixedValue" name="fixedValue" min="0" />
                        </div>
                    )}

                    {/* Campo para Frete Grátis */}
                    {discountType === 'freeShipping' && (
                        <div id="freeShippingField">
                            <p>Opção de Frete Grátis selecionada. Nenhum valor adicional é necessário.</p>
                        </div>
                    )}

                    <label htmlFor="activationDate">Data de Ativação:</label>
                    <input type="date" id="activationDate" name="activationDate" required />

                    <label htmlFor="expiryDate">Data de Expiração:</label>
                    <input type="date" id="expiryDate" name="expiryDate" required />

                    <input type="submit" value="Criar Cupom" />
                </form>
            </div>
        </div>
        </>
    )
}

export default Cupom