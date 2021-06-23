import { Link } from "react-router-dom";
import Activation from "../components/Activation";
import HeaderMenu from "../components/HeaderMenu";

const ActivationPage = () => {
  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <Activation></Activation>
      <Link to="/Login" style={{ fontWeight: "bold" }}>
        Inicia Sesion Aquí
      </Link>
    </div>
  );
};

export default ActivationPage;
