import { Routes, Route } from "react-router-dom";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Nav />} />
        <Route path="/produtos" element={<Nav />} />
        <Route path="/usuario" element={<Nav />} />
      </Routes>
    </>
  );
}

export default App;
