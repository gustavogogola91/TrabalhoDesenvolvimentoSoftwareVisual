import Carrinho from './pages/Carrinho';
import { Routes, Route } from 'react-router-dom'
import './index.css';

function App() {
  return (
  <>
    <Routes>
       <Route path="/carrinho" element={<Carrinho></Carrinho>} />
    </Routes>
  </>
  );
}
export default App;
