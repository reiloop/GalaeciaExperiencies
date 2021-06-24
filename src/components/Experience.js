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
    fecha,
  } = props;
  const history = useHistory();
  const f = new Date(fecha);
  const dia = f.getDay();
  const mes = f.getMonth();
  const año = f.getDate();
  const goToPostPage = (e) => {
    history.push(`/experience/${id}`);
  };
  console.log("Foto", photo);
  return (
    <div onClick={goToPostPage}>
      <h1>{nombre}</h1>
      <p>
        Descripción: {descripcion} 
      </p>
      <p>
        Provincia: {localidad}
        </p>
        <p> 
        Categoria: {categoria}
        </p>
        <p>
        Fecha:{dia}/{mes}/{año}
        </p>
        <p>
        Precio:{precio}€
      </p>
      <Imagenes photo={photo}></Imagenes>
      <p>Experiencia: {id}</p>
    </div>
  );
};

export default Experience;
