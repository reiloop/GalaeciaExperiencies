import image from "../../src/images/montana.png";
import icon from "../../src/images/icon-1.png";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Link } from "react-router-dom";
import decodeTokenData from "../utils/decodedTokenData";

const HeaderMenu = (props) => {
  const [token, setToken] = useContext(TokenContext);

  if (token !== "") {
    const decodedToken = decodeTokenData(token);
    if (decodedToken.rol === "admin") {
      return (
        <div className="HeaderMenu">
          <img className="header-image" alt="icon" src={image}></img>
          <ul className="header-ul">
            <li>
              <Link to="/experiences" style={{ fontWeight: "bold" }}>
                Experiencias
              </Link>
            </li>
            <li>
              <Link to="/create" style={{ fontWeight: "bold" }}>
                Panel de administrador
              </Link>
            </li>
            <li>
              <a href="./booking/:id">Mis reservas</a>
            </li>
            <li>
              <a href="./user/:id">Mi perfil</a>
            </li>
          </ul>
          <button onClick={() => setToken("")}>Sign out</button>
        </div>
      );
    } else if (decodedToken.rol === "user") {
      return (
        <div className="HeaderMenu">
          <img className="header-image" alt="icon" src={image}></img>
          <ul className="header-ul">
            <li>
              <Link to="/experiences" style={{ fontWeight: "bold" }}>
                Experiencias
              </Link>
            </li>
            <li>
              <a href="./booking/:id">Mis reservas</a>
            </li>
            <li>
              <a href="./user/:id">Mi perfil</a>
            </li>
          </ul>
          <button onClick={() => setToken("")}>Sign out</button>
        </div>
      );
    }
  } else {
    return (
      <div className="HeaderMenu">
        <img className="header-image" alt={icon} src={image}></img>
        <ul className="header-ul">
          <li>
            <Link to="/experiences" style={{ fontWeight: "bold" }}>
              Experiencias
            </Link>
          </li>
          <li>
            <Link to="/login" style={{ fontWeight: "bold" }}>
              Login
            </Link>
          </li>
          <li>
            <Link to="/register" style={{ fontWeight: "bold" }}>
              Registro
            </Link>
          </li>
        </ul>
      </div>
    );
  }
};

export default HeaderMenu;
