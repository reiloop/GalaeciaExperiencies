//import Imagenes from "./Imagenes.js";

const UserProfileBody = (props) => {
  const { userId, name, bio, email, rol } = props;

  return (
    <div className="userBody">
      <h2>Bienvenido, {name}</h2>
      <p>Biografía:{bio}</p>
      <p>Email: {email}</p>
      <p>Tu ID de usuario es {userId}</p>
      <p>Tu usuario es de tipo "{rol}"</p>
    </div>
  );
};

export default UserProfileBody;
