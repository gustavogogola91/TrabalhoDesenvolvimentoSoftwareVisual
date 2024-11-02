import { Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Usuario from "./pages/Usuario";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Layout>  </Layout> } />
        <Route path="/produtos" element={<Layout>  </Layout>} />
        <Route path="/usuario" element={<Layout> <Usuario/> </Layout>} />
      </Routes>
    </>
  );
}

export default App;
