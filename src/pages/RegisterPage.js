import RegisterForm from "../components/RegisterForm";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Redirect, Link } from "react-router-dom";
import HeaderMenu from "../components/HeaderMenu";

const RegisterPage = (props) => {
  const [token] = useContext(TokenContext);

  return (
    <>
      {!token ? (
        <div>
          <HeaderMenu></HeaderMenu>
          <h2 style={{ fontWeight: "600" }}>Registro</h2>
          <RegisterForm />
          <p>
            ¿Ya tienes cuenta?
            <Link className="link" to="/login" style={{ fontWeight: "bold" }}>
              Haz login
            </Link>
          </p>
          <footer>
            <Link className="link" to="/" style={{ fontWeight: "300" }}>
              Volver a página de inicio
            </Link>
            <p>(C) ESTÉBAN ESTÉVEZ & JOSÉ M. REIMÓNDEZ (2021)</p>
          </footer>
        </div>
      ) : (
        <Redirect to="/" />
      )}
    </>
  );
};

export default RegisterPage;
