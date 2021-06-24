//import Imagenes from "./Imagenes.js";

const UserProfileBody = (props) => {
  const { userId, name, bio, email, rol } = props;

  return (
    <div>
      <h2>Bienvenido, {name}</h2>
      <p>Biografía:{bio}</p>
      <p>Email: {email}</p>
      <p>Tu ID de usuario es {userId}</p>
      <p>Tu usuario es de tipo "{rol}"</p>
      {/* <Imagenes photo={avatar}></Imagenes> */}
    </div>
  );
};

export default UserProfileBody;
