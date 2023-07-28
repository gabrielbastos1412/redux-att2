import { useDispatch, useSelector } from "react-redux";
import { Navbar, NavbarBrand } from "reactstrap";
import { RootState } from "../redux/store";
import { useNavigate } from "react-router-dom";
import { logout } from "../redux/slices/api.slice.login";
import { NavItem, NavLink } from "react-bootstrap";

export default function NavBarCustom() {
  const navigate = useNavigate();
  const produto = useSelector((state: RootState) => state.carrinho);

  const { isAdmin } = useSelector((state: RootState) => state.apiLogin);
  const dispatch = useDispatch();

  function Logout() {
    dispatch(logout());
    navigate("/");
  }

  // Novo codigo!!!
  return (
    <div>
      <Navbar className="navbar navbar-expand-lg bg-body-tertiary">

        <a className="navbar-brand">Loja Online</a>

        <NavItem className="nav-item" onClick={() => navigate("/home")}>
          <NavLink>Produtos</NavLink>
        </NavItem>

        {/* SE USUARIO ISADMIN MOSTRA OPÇÃO DO CARRINHO */}
        {!isAdmin ? (
          <NavItem className="nav-item" onClick={() => navigate("/cart")}>
            <NavLink>Carrinho {produto.total}</NavLink>
          </NavItem>
        ) : null}

        <NavItem className="nav-item" onClick={() => Logout()}>
          <NavLink>Logout</NavLink>
        </NavItem>
      </Navbar>
    </div>
  );
}
