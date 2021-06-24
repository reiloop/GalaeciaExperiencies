import Imagenes from "./Imagenes.js";

const UserProfileBody = (props) => {
  const { userId, name, bio, email, avatar } = props;

  return (
    <div>
      <h1>Bienvenido, {name}</h1>
      <p>
        Biografía:{bio}
        Email: {email}
        Tu ID de usuario es: {userId}
      </p>
      <Imagenes photo={avatar}></Imagenes>
    </div>
  );
};

export default UserProfileBody;
