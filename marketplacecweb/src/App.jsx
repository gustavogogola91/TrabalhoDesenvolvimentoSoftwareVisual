import { Routes, Route } from "react-router-dom";
import "./index.css";

import NavApp from "./components/Nav";
import Cupom from "./pages/Cupom"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavApp />} />
        <Route path="/produtos" element={<NavApp />} />
        <Route path="/usuario" element={<NavApp />} />
        <Route path="/cupom" element={<Cupom />} />
      </Routes>
    </>
  );
}

export default App;
