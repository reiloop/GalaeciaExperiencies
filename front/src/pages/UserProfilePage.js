import UserProfileBody from "../components/UserProfileBody";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { TokenContext } from "../components/TokenContextProvider";
import decodeTokenData from "../utils/decodedTokenData";
import HeaderMenu from "../components/HeaderMenu";
import UploadUserPhoto from "../components/UploadUserPhoto";
import UserAvatar from "../components/UserAvatar";
import EditUser from "../components/EditUser";

const UserProfilePage = (props) => {
  const [, setError] = useState(null);
  const [user, setUser] = useState([]); // ==> [state, setState]
  let { userId } = useParams();
  const [token] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);

  console.log(userId);

  if (!userId) {
    userId = decodedToken.id;
  }
  useEffect(() => {
    fetch(`http://localhost:4000/user/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setUser(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, [userId, token]);
  if (token !== "") {
    console.log(token);
    console.log(decodedToken);

    const data = user[0];
    console.log(data);
    if (data) {
      return (
        <div>
          <HeaderMenu></HeaderMenu>
          <UserAvatar photo={data.foto}></UserAvatar>
          <UserProfileBody
            key={decodedToken.id}
            userId={decodedToken.id}
            name={data.nombre}
            email={data.email}
            bio={data.biografia}
            rol={decodedToken.rol}
          ></UserProfileBody>
          <EditUser id={userId}></EditUser>
          <UploadUserPhoto id={userId}></UploadUserPhoto>
          <footer>
            <Link className="link" to="/" style={{ fontWeight: "300" }}>
              Volver a página de inicio
            </Link>
            <p>(C) ESTÉBAN ESTÉVEZ & JOSÉ M. REIMÓNDEZ (2021)</p>
          </footer>
        </div>
      );
    } else {
      return (
        <div>
          <HeaderMenu></HeaderMenu>
          <p>ERROR: No se ha podido obtener info de usuario</p>
        </div>
      );
    }
  } else {
    return (
      <div>
        <HeaderMenu></HeaderMenu>
        <p>
          No estás logeado, <a href="/login">inicia sesión</a> o{" "}
          <a href="/register">regístrate</a>
        </p>
      </div>
    );
  }
};

export default UserProfilePage;
