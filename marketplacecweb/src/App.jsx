import { Routes, Route } from "react-router-dom";
import "./index.css";
import Login from  "./pages/Login";




import NavApp from "./components/Nav";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<NavApp />} />
        <Route path="/produtos" element={<NavApp />} />
        <Route path="/usuario" element={<NavApp />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </>
  );
}

export default App;
