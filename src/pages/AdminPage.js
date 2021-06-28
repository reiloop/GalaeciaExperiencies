import CreateForm from "../components/CreateForm";

import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Redirect } from "react-router-dom";
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
          <h2 style={{ fontWeight: "600" }}>Crear una experiencia</h2>
          <CreateForm></CreateForm>
        </div>
      );
    }
  } else {
    return <Redirect to={"/"} />;
  }
};

export default AdminPage;
