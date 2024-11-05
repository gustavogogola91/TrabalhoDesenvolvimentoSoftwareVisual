import { NavLink } from "react-router-dom";

function GerenciarProduto() {
  return (
    <div className="bg-cream flex flex-col items-center justify-center gap-12 h-full w-full p-36">
      <NavLink to="/cadastrarProduto">
        <button className="border border-black rounded-xl p-2 w-40 ">
          Adicionar produtos
        </button>
      </NavLink>

      <NavLink to="/editarProduto">
        <button className="border border-black rounded-xl p-2 w-40">
          Editar produtos
        </button>
      </NavLink>

      <NavLink to="/excluirProduto">
        <button className="border border-black rounded-xl p-2 w-40">
          Excluir produtos
        </button>
      </NavLink>

      <NavLink to="/produtos">
        <button className="border border-black rounded-xl p-2 w-40">
          Voltar
        </button>
      </NavLink>
    </div>
  );
}
export default GerenciarProduto;
