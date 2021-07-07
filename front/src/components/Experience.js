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

      <Imagenes photo={photo} categoria={categoria}></Imagenes>
      <p className="precio">{precio}€</p>
      <ul>
        <li>
          <p> {localidad} </p>
        </li>
        <li>
          <p>
            {dia}/{mes}/{año} 📆
          </p>
        </li>
        <li>
          <p>Categoria: {categoria}</p>
        </li>

        <li>
          <p>
            Plazas disponibles: {libres}/{totales}
          </p>
        </li>
      </ul>

      <p className="descripcion">{descripcion}</p>
    </div>
  );
};

export default Experience;
