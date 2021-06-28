import { useState } from "react";
import Experience from "./Experience";
import ListExperiences from "./ListExperiences";

const Search = (props) => {
  const [searched, setSearched] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [priceIni, setPriceIni] = useState("");
  const [priceFin, setPriceFin] = useState("");
  const [city, setCity] = useState("A Coruña");
  const [result, setResult] = useState([]);

  const results = async (e) => {
    e.preventDefault();
    const results = await fetch(
      `http://localhost:4000/experiences/?search=${searched}&precioIni=${priceIni}&precioFin=${priceFin}&fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}&ciudad=${city}`,
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
      setResult(data);
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
  if (result.length === 0) {
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
          <label htmlFor="fechaIni">Fechas entre </label>
          <input
            id="fechaIni"
            className="date-input"
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <label htmlFor="fechaFin"> y </label>
          <input
            id="fechaFin"
            className="date-input"
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
          <label htmlFor="precioIni">Precio entre </label>
          <input
            id="precioIni"
            className="preciosForm"
            type="number"
            min="0"
            step="5"
            max="999"
            value={priceIni}
            onChange={(e) => setPriceIni(e.target.value)}
          />
          <label htmlFor="precioFin"> y </label>
          <input
            id="precioFin"
            className="preciosForm"
            type="number"
            step="5"
            min="0"
            max="999"
            value={priceFin}
            onChange={(e) => setPriceFin(e.target.value)}
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
        <ListExperiences></ListExperiences>
      </div>
    );
  } else {
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
          <label htmlFor="fechaIni">Fechas entre </label>
          <input
            id="fechaIni"
            className="date-input"
            type="date"
            value={fechaInicio}
            onChange={(e) => setFechaInicio(e.target.value)}
          />
          <label htmlFor="fechaFin"> y </label>
          <input
            id="fechaFin"
            className="date-input"
            type="date"
            value={fechaFin}
            onChange={(e) => setFechaFin(e.target.value)}
          />
          <label htmlFor="precioIni">Precio entre </label>
          <input
            id="precioIni"
            className="preciosForm"
            type="number"
            min="0"
            step="5"
            max="999"
            value={priceIni}
            onChange={(e) => setPriceIni(e.target.value)}
          />
          <label htmlFor="precioFin"> y </label>
          <input
            id="precioFin"
            className="preciosForm"
            type="number"
            step="5"
            min="0"
            max="999"
            value={priceFin}
            onChange={(e) => setPriceFin(e.target.value)}
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
  }
};
export default Search;
