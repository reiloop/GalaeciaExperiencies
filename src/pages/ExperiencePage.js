import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Experience from "../components/Experience";

const ExperiencesPage = () => {
  const { postId } = useParams();
  const [url] = useState(`http://localhost:4000/experience/${postId}`);
  const [, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [actividad, setActividad] = useState([]); // ==> [state, setState]
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setActividad(result);
          console.log(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [url]);

  if (actividad.status) {
    const data = actividad.data;
    console.log(data);
    return (
      <div>
        <Experience
          key={data.id}
          id={data.id}
          nombre={data.nombre}
          descripcion={data.descripcion}
          localidad={data.localidad}
        />
      </div>
    );
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <ul>Error: no se ha encontrado la experiencia deseada</ul>;
  }
};

export default ExperiencesPage;
