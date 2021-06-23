import { useEffect, useState } from "react";
import Experience from "./Experience";

const Search = (props) => {
  const [searched, setSearched] = useState("");
  const [, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/experiences?search=${searched}`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setResult(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [searched]);
  if (result.status) {
    console.log(result.data);
    const data = result.data;

    const arrayResult = data.map((item) => (
      <>
        <Experience
          key={item.id}
          id={item.id}
          nombre={item.nombre}
          descripcion={item.descripcion}
          localidad={item.localidad}
          categoria={item.categoria}
        />
      </>
    ));
    return <ul className="listaExperiencias">{arrayResult}</ul>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <ul>Error: no se ha encontrado la experiencia deseada</ul>;
  }
};
export default Search;
