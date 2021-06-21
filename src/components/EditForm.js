import { useContext, useState } from "react";
import { TokenContext } from "./TokenContextProvider";

const EditForm = (props) => {
  const [token] = useContext(TokenContext);
  const [description, setDescripcion] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const editExperience = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/experience/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name, description, place, price }),
    });

    const body = await res.json();
    console.log(body);
  };

  return (
    <form onSubmit={editExperience}>
      <label htmlFor="id">Introduce el ID de la actividad a editar</label>
      <input
        type="text"
        id="id"
        name="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      ></input>
      <label htmlFor="nombre">Nombre</label>
      <input
        type="text"
        id="nombre"
        name="nombre"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <label htmlFor="email">Descripcion</label>
      <textarea
        type="text"
        id="descripcion"
        name="descripcion"
        value={description}
        onChange={(e) => setDescripcion(e.target.value)}
      ></textarea>
      <label htmlFor="password">Precio</label>
      <input
        type="text"
        id="price"
        name="precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      ></input>
      <label htmlFor="bio">Localidad</label>
      <input
        type="text"
        id="localidad"
        name="localidad"
        value={place}
        onChange={(e) => setPlace(e.target.value)}
      ></input>
      <input type="submit" value="Editar" />
    </form>
  );
};

export default EditForm;
