import LoginForm from "../components/LoginForm";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Redirect, Link } from "react-router-dom";

const LoginPage = (props) => {
  const [token] = useContext(TokenContext);
  console.log(token);
  return (
    <>
      {!token ? (
        <div>
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
      ) : (
        <Redirect to="/create" />
      )}
    </>
  );
};

export default LoginPage;
