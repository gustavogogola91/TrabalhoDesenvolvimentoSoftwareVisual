import { NavLink } from "react-router-dom";
import userImg from "../imgs/icon-user.png"
import carrinhoImg from "../imgs/icon-carrinho.png";

function Nav() {
  return (
    <nav>
      <ul className="flex flex-row gap-5">
        <li className="flex flex-row items-center bg-purple px-3 shadow-md py-2 hover:cursor-pointer rounded-[6px] hover:bg-very-light-purple hover:text-purple transition duration-300 ease-in-out">
          <NavLink to="/produtos">Produtos</NavLink>
        </li>

        <li className="flex flex-row items-center bg-purple px-3 py-2 rounded-3xl hover:bg-very-light-purple hover:text-purple transition duration-300 ease-in-out">
          <NavLink to="/usuario"><img src={ userImg } alt="" className="w-[35px]"/></NavLink>
        </li>

        <li className="flex flex-row items-center bg-purple px-3 py-2 rounded-3xl hover:bg-very-light-purple hover:text-purple transition duration-300 ease-in-out">
          <NavLink to="/carrinho"><img src={ carrinhoImg } alt="" className="w-[35px]"/></NavLink>
        </li>
        <li className="flex flex-row items-center bg-purple px-3 shadow-md py-2 hover:cursor-pointer rounded-[6px] hover:bg-very-light-purple hover:text-purple transition duration-300 ease-in-out">
          <NavLink to="/cupom">Cupom</NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
