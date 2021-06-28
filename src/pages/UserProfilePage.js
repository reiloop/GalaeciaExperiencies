import UserProfileBody from "../components/UserProfileBody";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TokenContext } from "../components/TokenContextProvider";
import decodeTokenData from "../utils/decodedTokenData";
import HeaderMenu from "../components/HeaderMenu";
import UploadUserPhoto from "../components/UploadUserPhoto";
import UserAvatar from "../components/UserAvatar";

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
          <UserProfileBody
            key={decodedToken.id}
            userId={decodedToken.id}
            name={data.nombre}
            email={data.email}
            bio={data.biografia}
            rol={decodedToken.rol}
          ></UserProfileBody>
          <UploadUserPhoto id={userId}></UploadUserPhoto>
          <UserAvatar photo={data.foto}></UserAvatar>
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
  }
};

export default UserProfilePage;
