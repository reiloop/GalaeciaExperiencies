// import { useHistory } from "react-router-dom";

const Experience = (props) => {
  const { key, nombre, descripcion, localidad } = props;
  // const history = useHistory();

  // const goToExperiencePage = (e) => {
  //   history.push(`/experience/${id}`);
  // };

  return (
    <div key={key}>
      <h2>{nombre}</h2>
      <p>{descripcion}</p>
      <p>{localidad}</p>
    </div>
  );
};

export default Experience;
