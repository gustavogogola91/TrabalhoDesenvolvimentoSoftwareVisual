import { Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";

import Produtos from "./pages/Produto/Produtos";
import CadastrarProduto from "./pages/Produto/CadastrarProduto";
import EditarProduto from "./pages/Produto/EditarProduto";
import ExcluirProduto from "./pages/Produto/ExcluirProduto";
import GerenciarProduto from "./pages/Produto/GerenciarProduto";
import Usuario from "./pages/Usuario";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout></Layout>} />
        <Route
          path="/produtos"
          element={
            <Layout>
              <Produtos />
            </Layout>
          }
        />
        <Route path="/usuario" element={<Layout></Layout>} />
        <Route path="/gerenciarProduto" element={<Layout><GerenciarProduto/></Layout>}/>      
        <Route path="/cadastrarProduto" element={<Layout><CadastrarProduto/></Layout>}/>      
        <Route path="/editarProduto" element={<Layout><EditarProduto/></Layout>}/>      
        <Route path="/excluirProduto" element={<Layout><ExcluirProduto/></Layout>}/>      
        </Routes>
    </>
  );
}

export default App;
