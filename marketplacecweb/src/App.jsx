import { Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Usuario from "./pages/Usuario-Dashboard/Usuario";
import Produtos from "./pages/Produtos";
import Carrinho from "./pages/Carrinho"
import Login from "./pages/Login"
import LayoutLogin from "./components/LayoutLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout></Layout>} />
        <Route path="/produtos" element={<Layout><Produtos /></Layout>}/>
        <Route path="/usuario" element={<Layout> <Usuario/> </Layout>} />
        <Route path="/login" element={<LayoutLogin> <Login/> </LayoutLogin>} />
        <Route path="/carrinho" element={<Layout><Carrinho /></Layout>}/>
      </Routes>
    </>
  );
}

export default App;