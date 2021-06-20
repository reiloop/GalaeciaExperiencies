import Experience from "./Experience";
import { useState, useEffect } from "react";

const ListExperiences = () => {
  const [, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [experiencias, setExperiencias] = useState([]); // ==> [state, setState]
  useEffect(() => {
    fetch(`http://localhost:4000/experiences`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setExperiencias(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (experiencias.status) {
    console.log(experiencias.data);
    const data = experiencias.data;

    const arrayExperiencias = data.map((item) => (
      <Experience
        key={item.id}
        id={item.id}
        nombre={item.nombre}
        descripcion={item.descripcion}
        localidad={item.localidad}
      />
    ));
    return <ul>{arrayExperiencias}</ul>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <ul>Error: no se ha encontrado la experiencia deseada</ul>;
  }
};

export default ListExperiences;
