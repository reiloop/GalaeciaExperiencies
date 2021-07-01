import { useHistory } from "react-router-dom";
import Imagenes from "./Imagenes";

const Experience = (props) => {
  const {
    id,
    nombre,
    descripcion,
    localidad,
    photo,
    categoria,
    precio,
    libres,
    totales,
    fecha,
  } = props;
  const history = useHistory();
  const f = new Date(fecha);
  const dia = f.getDate();
  const mes = f.getMonth() + 1;
  const año = f.getFullYear();
  const goToPostPage = (e) => {
    history.push(`/experience/${id}`);
  };
  console.log("Foto", photo);
  return (
    <div className="experience" onClick={goToPostPage}>
      <h1>{nombre}</h1>
      <p>Descripción: {descripcion}</p>
      <p>Provincia: {localidad}</p>
      <p>Categoria: {categoria}</p>
      <p>
        Fecha de la actividad: {dia}/{mes}/{año}
      </p>
      <p>Precio: {precio}€</p>
      <p>
        Plazas libres: {libres}/{totales}
      </p>
      <Imagenes photo={photo} categoria={categoria}></Imagenes>
      <p>Experiencia: {id}</p>
    </div>
  );
};

export default Experience;
