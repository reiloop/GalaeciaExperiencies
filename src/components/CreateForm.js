import { useContext, useState } from "react";
import { TokenContext } from "./TokenContextProvider";

const CreateForm = (props) => {
  const [token] = useContext(TokenContext);
  const [description, setDescripcion] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const createExperience = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/experience", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ name, description, place, price }),
    });

    const body = await res.json();
    console.log(body);
  };

  return (
    <form onSubmit={createExperience}>
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
      <input type="submit" value="Enviar" />
    </form>
  );
};

export default CreateForm;
