import UserProfileBody from "../components/CreateForm";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { TokenContext } from "../components/TokenContextProvider";
import decodeTokenData from "../utils/decodedTokenData";
import HeaderMenu from "../components/HeaderMenu";

const UserProfilePage = (props) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState([]); // ==> [state, setState]
  let { userId } = useParams();
  const [url] = useState(`http://localhost:4000/user/${userId}`);
  const [token] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);

  console.log(userId);
  if (!userId) {
    userId = decodedToken.id;
  }
  useEffect(() => {
    fetch(url, {
      "Content-Type": "application/json",
      Authorization: `${token}`,
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
  }, [url, token]);
  if (token !== "") {
    console.log(token);
    console.log(user);
    const [rol, id, nombre, email, biografia] = user;

    return (
      <div>
        <HeaderMenu></HeaderMenu>
        <UserProfileBody
          userId={id}
          name={nombre}
          email={email}
          bio={biografia}
          rol={rol}
        ></UserProfileBody>
      </div>
    );
  }
};

export default UserProfilePage;
