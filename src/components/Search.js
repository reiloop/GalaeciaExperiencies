import { useState } from "react";
import Experience from "./Experience";

const Search = (props) => {
  const [searched, setSearched] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [city, setCity] = useState("A Coruña");
  const [result, setResult] = useState([]);

  const results = async (e) => {
    e.preventDefault();
    const results = await fetch(
      `http://localhost:4000/experiences/?search=${searched}&precio=${price}&fecha=${date}&ciudad=${city}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const body = await results.json();
    const data = body.data;
    console.log(data);
    if (typeof data === "string") {
      setResult("No hay resultados que coincidan con la búsqueda");
    } else {
      const arrayExperiencias = data.map((item) => (
        <>
          <Experience
            key={item.id}
            id={item.id}
            nombre={item.nombre}
            descripcion={item.descripcion}
            localidad={item.localidad}
            categoria={item.categoria}
            precio={item.precio}
            fecha={item.fecha_disponible}
          />
        </>
      ));
      setResult(arrayExperiencias);
    }
  };
  return (
    <div>
      <form onSubmit={results}>
        <label htmlFor="busca">¿Que buscas?</label>
        <input
          id="busca"
          className="text-input"
          type="text"
          placeholder="Escribe una actividad"
          value={searched}
          onChange={(e) => setSearched(e.target.value)}
        />
        <label htmlFor="fecha">Selecciona una fecha:</label>
        <input
          id="fecha"
          className="date-input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <label htmlFor="precio">Selecciona el precio:</label>
        <input
          id="precio"
          className="preciosForm"
          type="number"
          step="0.5"
          max="999"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <label htmlFor="ciudad">Selecciona una ciudad:</label>
        <select
          id="ciudad"
          name="ciudad"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        >
          <option value="A Coruña">A Coruña</option>
          <option value="Lugo">Lugo</option>
          <option value="Ourense">Ourense</option>
          <option value="Pontevedra">Pontevedra</option>
        </select>
        <input type="submit" value="Buscar" />
      </form>
      <ul className="listaExperiencias">{result}</ul>
    </div>
  );
};
export default Search;
