import { Link } from "react-router-dom";
import Activation from "../components/Activation";
import HeaderMenu from "../components/HeaderMenu";

const ActivationPage = () => {
  return (
    <div className="activation">
      <HeaderMenu></HeaderMenu>
      <Activation></Activation>
      <Link className="link" to="/Login" style={{ fontWeight: "bold" }}>
        Inicia Sesion Aquí
      </Link>
      <footer>
        <Link className="link" to="/" style={{ fontWeight: "300" }}>
          Volver a página de inicio
        </Link>
        <p>(C) ESTÉBAN ESTÉVEZ & JOSÉ M. REIMÓNDEZ (2021)</p>
      </footer>
    </div>
  );
};

export default ActivationPage;
