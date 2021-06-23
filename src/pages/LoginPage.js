import LoginForm from "../components/LoginForm";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Redirect, Link } from "react-router-dom";
import decodeTokenData from "../utils/decodedTokenData";
import HeaderMenu from "../components/HeaderMenu";

const LoginPage = (props) => {
  const [token] = useContext(TokenContext);
  console.log(token);

  if (token !== "") {
    const decodedToken = decodeTokenData(token);
    console.log(decodedToken.rol);
    if (decodedToken.rol !== "admin") {
      return <Redirect to={"/"} />;
    } else {
      return <Redirect to={"/create"} />;
    }
  }

  return (
    <>
      <div>
        <HeaderMenu></HeaderMenu>
        <h2 style={{ fontWeight: "600" }}>Login</h2>
        <LoginForm />
        <p>
          ¿No tienes cuenta?
          <Link to="/register" style={{ fontWeight: "bold" }}>
            Regístrate
          </Link>
        </p>
        <footer>
          <Link to="/" style={{ fontWeight: "300" }}>
            Volver a página de inicio
          </Link>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;
