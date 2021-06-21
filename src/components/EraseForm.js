import { useContext, useState } from "react";
import { TokenContext } from "./TokenContextProvider";

const EraseForm = (props) => {
  const [token] = useContext(TokenContext);
  const [description, setDescripcion] = useState("");
  const [place, setPlace] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const eraseExperience = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/experience/${id}`, {
      method: "DELETE",
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
    <form onSubmit={eraseExperience}>
      <label htmlFor="id">Introduce el ID de la actividad a eliminar</label>
      <input
        type="text"
        id="id"
        name="id"
        value={id}
        onChange={(e) => setId(e.target.value)}
      ></input>
      <input type="submit" value="Eliminar" />
    </form>
  );
};

export default EraseForm;
