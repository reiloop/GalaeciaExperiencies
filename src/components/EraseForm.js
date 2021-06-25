import { useContext, useState, useEffect } from "react";
import { TokenContext } from "./TokenContextProvider";

const EraseForm = (props) => {
  const [token] = useContext(TokenContext);
  const [description] = useState("");
  const [place] = useState("");
  const [price] = useState("");
  const [, setError] = useState(null);
  const [id, setId] = useState("");
  const [name] = useState("");
  const [experiencias, setExperiencias] = useState([]);
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
  useEffect(() => {
    fetch(`http://localhost:4000/experiences`)
      .then((res) => res.json())
      .then(
        (result) => {
          setExperiencias(result.data);
        },
        (error) => {
          setError(error);
        }
      );
  }, []);
  const data = experiencias;
  console.log(data);
  if (data === String) {
    return <p>{data}</p>;
  } else if (Array.isArray(data)) {
    const arrayExperiencias = data.map((item) => (
      <option value={item.id}>{item.nombre}</option>
    ));
    return (
      <form onSubmit={eraseExperience}>
        <label htmlFor="id">Introduce el ID de la actividad a eliminar</label>
        <select
          type="text"
          id="id"
          name="id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        >
          {arrayExperiencias}
        </select>
        <input type="submit" value="Eliminar" />
      </form>
    );
  } else {
    return <p>No hay actividades para eliminar</p>;
  }
};

export default EraseForm;
