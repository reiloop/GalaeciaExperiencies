import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Experience from "../components/Experience";
import HeaderMenu from "../components/HeaderMenu";
import Imagenes from "../components/Imagenes";
import AddComment from "../components/AddComment";
import Booking from "../components/Booking";

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
    const photos = data.photos;

    return (
      <div className="experience">
        <HeaderMenu></HeaderMenu>

        <Experience
          key={data.id}
          id={data.id}
          nombre={data.nombre}
          descripcion={data.descripcion}
          localidad={data.localidad}
          categoria={data.categoria}
          fecha={data.fecha_disponible}
          precio={data.precio}
        />
        <ul className="images">
          {photos.map((e) => (
            <Imagenes key={e.imagen} photo={e.imagen}></Imagenes>
          ))}{" "}
        </ul>
        <AddComment id={data.id}></AddComment>
        <Booking
          id={data.id}
          precio={data.precio}
          fecha={data.fecha_disponible}
        ></Booking>
      </div>
    );
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <ul>Error: no se ha encontrado la experiencia deseada</ul>;
  }
};

export default ExperiencesPage;
