import { useHistory } from "react-router-dom";



const Experience = (props) => {
  
  const { id, nombre, descripcion, localidad} = props;
  const history = useHistory();

  const goToPostPage = (e) => {
    history.push(`/experience/${id}`);
  };

  return (
    <div onClick={goToPostPage}>
      <h1 className="experienceH1">{nombre}</h1>
      <p>
        {descripcion} Provincia: {localidad}
      </p>
      
      <p>Experiencia: {id}</p>
    </div>
  );
};

export default Experience;
