import CreateForm from "../components/CreateForm";

import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Link, Redirect } from "react-router-dom";
import decodeTokenData from "../utils/decodedTokenData";
import HeaderMenu from "../components/HeaderMenu";

const AdminPage = (props) => {
  const [token] = useContext(TokenContext);
  if (token !== "") {
    const decodedToken = decodeTokenData(token);
    if (decodedToken.rol === "admin") {
      return (
        <div>
          <HeaderMenu></HeaderMenu>
          <h2 className="cssAdminPage" style={{ fontWeight: "600" }}>
            Crear una experiencia
          </h2>
          <CreateForm></CreateForm>
          <footer>
            <Link className="link" to="/" style={{ fontWeight: "300" }}>
              Volver a página de inicio
            </Link>
            <p>(C) ESTÉBAN ESTÉVEZ & JOSÉ M. REIMÓNDEZ (2021)</p>
          </footer>
        </div>
      );
    }
  } else {
    return <Redirect to={"/"} />;
  }
};

export default AdminPage;
