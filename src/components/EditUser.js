import { useContext, useState } from "react";
import { TokenContext } from "./TokenContextProvider";

const EditUser = (props) => {
  const [token] = useContext(TokenContext);
  const [bio, setBio] = useState("");
  const { id } = props;
  const [nombre, setNombre] = useState("");

  const editUser = async (e) => {
    e.preventDefault();
    if (window.confirm("¿Está seguro de cambiar tu perfil?")) {
      const res = await fetch(`http://localhost:4000/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({
          nombre,
          bio,
        }),
      });
      const body = await res.json();
      console.log(body);

      window.location = `/user/${id}`;
    } else {
      window.location = "/";
    }
  };

  return (
    <div className="editUser">
      <h2>Edita tu perfil</h2>
      <form onSubmit={editUser}>
        <label htmlFor="nombre">Nombre</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        ></input>
        <label htmlFor="bio">Biografía: </label>
        <textarea
          type="textarea"
          id="bio"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <input type="submit" value="Editar" />
      </form>
    </div>
  );
};

export default EditUser;
