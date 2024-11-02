import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav className="w-full bg-purple text-cream">
      <ul className="w-full flex flex-row gap-4 h-20 justify-center pt-8 ">
        <li className="text-base">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="text-base">
          <NavLink to="/produtos">Produtos</NavLink>
        </li>
        <li className="text-base">
          <NavLink to="/usuario">Usuario</NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default Nav;
