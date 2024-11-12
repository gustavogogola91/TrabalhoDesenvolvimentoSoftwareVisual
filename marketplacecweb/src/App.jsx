import { Routes, Route, useNavigate } from 'react-router-dom';
import "./index.css";
import { useEffect, useState} from "react";

import Layout from "./components/Layout";
import Usuario from "./pages/Usuario-Dashboard/Usuario";
import Produtos from "./pages/Produtos";
import Carrinho from "./pages/Carrinho"
import Login from "./pages/Login"
import LayoutLogin from "./components/LayoutLogin";

function App() {

  const navigate = useNavigate();

  const ProtectedRoute = ({ children }) => {
    const usuarioId = localStorage.getItem("usuarioId");

    useEffect(() => {
      if (usuarioId == null) {
        navigate("/login");
      }
    }, [usuarioId, navigate]);

    return usuarioId ? children : null;
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout></Layout>} />
        <Route path="/produtos" element={<Layout><Produtos /></Layout>}/>
        <Route
          path="/usuario"
          element={
            <ProtectedRoute>
              <Layout><Usuario /></Layout>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Layout> <Login/> </Layout>} />
        <Route path="/carrinho" element={<Layout><Carrinho /></Layout>}/>
      </Routes>
    </>
  );
}

export default App;