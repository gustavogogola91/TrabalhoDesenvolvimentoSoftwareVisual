import { NavLink } from "react-router-dom";

function NavApp() {
  return (
    <nav className="">
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/produtos">Produtos</NavLink>
        </li>
        <li>
          <NavLink to="/usuario">Usuario</NavLink>
        </li>
        <li>
          <NavLink to="/cupom">Cupom</NavLink>
        </li>
      </ul>
    </nav>
  );
}
export default NavApp;
