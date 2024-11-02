import { Routes, Route } from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={ <Layout>  </Layout> } />
        <Route path="/produtos" element={<Layout>  </Layout>} />
        <Route path="/usuario" element={<Layout>  </Layout>} />
      </Routes>
    </>
  );
}

export default App;
