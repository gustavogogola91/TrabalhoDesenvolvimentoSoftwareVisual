import { Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import Login from "./pages/Login"
import LayoutLogin from "./components/LayoutLogin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Layout>  </Layout> } />
        <Route path="/produtos" element={<Layout>  </Layout>} />
        <Route path="/usuario" element={<Layout>  </Layout>} />
        <Route path="/login" element={<LayoutLogin> <Login/> </LayoutLogin>} />
      </Routes>
    </>
  );
}

export default App;