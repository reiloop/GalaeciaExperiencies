import { useHistory } from "react-router-dom";
import Imagenes from "./Imagenes";

const Experience = (props) => {
  const { id, nombre, descripcion, localidad, photo, categoria } = props;
  const history = useHistory();

  const goToPostPage = (e) => {
    history.push(`/experience/${id}`);
  };
  console.log(photo);
  return (
    <div onClick={goToPostPage}>
      <h1>{nombre}</h1>
      <p>
        {descripcion} Provincia: {localidad} Categoria: {categoria}
      </p>
      <Imagenes photo={photo}></Imagenes>
      <p>Experiencia: {id}</p>
      
    </div>
  );
};

export default Experience;
