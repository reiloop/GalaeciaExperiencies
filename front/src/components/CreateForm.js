import { useContext, useState } from "react";
import { TokenContext } from "./TokenContextProvider";

const CreateForm = (props) => {
  const [token] = useContext(TokenContext);
  const [description, setDescripcion] = useState("");
  const [place, setPlace] = useState("A Coruña");
  const [price, setPrice] = useState("100");
  const [name, setName] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [categoria, setCategoria] = useState("Aventuras");
  const [plazasLibres, setPlazasLibres] = useState("10");
  const [plazasTotales, setPlazasTotales] = useState("10");
  const [mensaje, setMensaje] = useState("");
  const [id, setId] = useState("");

  const createExperience = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/experience`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        name,
        description,
        place,
        price,
        categoria,
        availableDate,
        plazasLibres,
        plazasTotales,
      }),
    });

    const body = await res.json();
    console.log(body);
    setMensaje(body.message);
    setId(body.id);
  };

  return (
    <div className="createForm">
      <form className="formularioCreate" onSubmit={createExperience}>
        <label htmlFor="nombre">Nombre </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
        <label htmlFor="email">Descripcion </label>
        <textarea
          type="text"
          id="descripcion"
          name="descripcion"
          value={description}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        ></textarea>
        <label htmlFor="price">Precio </label>
        <input
          type="number"
          id="price"
          min="0"
          max="999"
          step="0.5"
          name="precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        ></input>
        <label htmlFor="plazasLibres">Plazas libres </label>
        <input
          required
          type="number"
          id="plazasLibres"
          min="0"
          max="10"
          step="1"
          name="plazasLibres"
          value={plazasLibres}
          onChange={(e) => setPlazasLibres(e.target.value)}
        ></input>
        <label htmlFor="plazasTotales">Plazas totales </label>
        <input
          required
          type="number"
          id="plazasTotales"
          min="0"
          max="10"
          step="1"
          name="plazasTotales"
          value={plazasTotales}
          onChange={(e) => setPlazasTotales(e.target.value)}
        ></input>
        <label htmlFor="localidad">Localidad </label>{" "}
        <label htmlFor="localidad">Selecciona una ciudad </label>
        <select
          id="localidad"
          name="ciudad"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        >
          <option value="A Coruña">A Coruña</option>
          <option value="Lugo">Lugo</option>
          <option value="Ourense">Ourense</option>
          <option value="Pontevedra">Pontevedra</option>
        </select>
        <label htmlFor="categoria">Categoría:</label>
        <select
          id="categoria"
          name="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="Aventuras">Aventuras</option>
          <option value="Naturaleza">Naturaleza</option>
          <option value="Deportes">Deportes</option>
          <option value="Al aire libre">Al aire libre</option>
        </select>
        <label htmlFor="fecha">Fecha de la actividad:</label>
        <input
          id="fecha"
          className="date-input"
          type="date"
          value={availableDate}
          onChange={(e) => setAvailableDate(e.target.value)}
          required
        />
        <input type="submit" value="Enviar" />
      </form>
      {mensaje && (
        <p style={{ color: "red" }}>
          {mensaje} con el id: {id}
        </p>
      )}
    </div>
  );
};

export default CreateForm;
