import { Routes, Route } from "react-router-dom";
import "./index.css";

import Layout from "./components/Layout";
import Produtos from "./pages/Produtos";

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
        <Route
          path="/carrinho"
          element={
            <Layout>
              <Carrinho />
            </Layout>
          }
        />
      </Routes>
    </>
  );
}

export default App;
