import React from 'react';

const Cart = () => {
  // Exemplo de itens no carrinho
  const cartItems = [
    { title: 'Produto 1', quantity: 2, price: 29.99 },
    { title: 'Produto 2', quantity: 1, price: 49.99 },
    { title: 'Produto 3', quantity: 3, price: 19.99 },
  ];

  // Calcula o preço total
  const totalPrice = cartItems.reduce((total, item) => total + item.quantity * item.price, 0);

  return (
    <div className="bg-purple-700 text-white rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Carrinho de Compras</h2>
      
      <div>
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="bg-purple-600 rounded-lg p-4 mb-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="text-sm font-medium">{item.title}</h3>
              <p className="text-xs">Quantidade: {item.quantity}</p>
            </div>
            <span className="font-semibold">${(item.quantity * item.price).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-purple-500">
        <span className="text-lg font-semibold">Total:</span>
        <span className="text-lg font-semibold">${totalPrice.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default Cart;
