import { Routes, Route } from "react-router-dom";
import "./index.css";

import NavApp from "./components/Nav";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavApp />} />
        <Route path="/produtos" element={<NavApp />} />
        <Route path="/usuario" element={<NavApp />} />
      </Routes>
    </>
  );
}

export default App;
