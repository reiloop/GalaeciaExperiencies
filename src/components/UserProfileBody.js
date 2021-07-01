//import Imagenes from "./Imagenes.js";

const UserProfileBody = (props) => {
  const { userId, name, bio, email, rol } = props;

  return (
    <div className="userBody">
      <h2>Bienvenido, {name}</h2>
      <p>Biografía: {bio}</p>
      <p>Email: {email}</p>
      <p>ID de usuario : {userId}</p>
      <p>Tu usuario es "{rol}"</p>
    </div>
  );
};

export default UserProfileBody;
