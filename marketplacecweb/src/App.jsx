import { Routes, Route, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect } from "react";

import Layout from "./components/Layout";
import Usuario from "./pages/Usuario-Dashboard/Usuario";
import Produtos from "./pages/Produtos";
import Carrinho from "./pages/Carrinho";
import Login from "./pages/Login";

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
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Produtos />
            </ProtectedRoute>
          }
        />
        <Route
          path="/produtos"
          element={
            <ProtectedRoute>
              <Layout>
                <Produtos />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/usuario"
          element={
            <ProtectedRoute>
              <Layout>
                <Usuario />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <Layout>
              {" "}
              <Login />{" "}
            </Layout>
          }
        />
        <Route
          path="/carrinho"
          element={
            <ProtectedRoute>
              <Layout>
                <Carrinho />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
