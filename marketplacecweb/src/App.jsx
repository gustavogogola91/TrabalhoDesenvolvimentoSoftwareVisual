import { Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";

import Produtos from "./pages/Produto/Produtos";

import Carrinho from "./pages/Carrinho"
import CadastrarProduto from "./pages/Produto/CadastrarProduto";
import EditarProduto from "./pages/Produto/EditarProduto";
import ExcluirProduto from "./pages/Produto/ExcluirProduto";
import GerenciarProduto from "./pages/Produto/GerenciarProduto";
import Usuario from "./pages/Usuario-Dashboard/Usuario";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout></Layout>} />

        <Route path="/produtos" element={<Layout><Produtos /></Layout>}/>
        <Route path="/usuario" element={<Layout> <Usuario/> </Layout>} />
        <Route path="/carrinho" element={<Layout><Carrinho/></Layout>} />
      </Routes>
    </>
  );
}

export default App;
