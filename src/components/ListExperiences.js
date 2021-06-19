import Experience from "./Experience";
import useExperiencias from "../hooks/useExperiencias";

const ListExperiences = (props) => {
  const [experiencias] = useExperiencias();
  const postArray = experiencias.map((experiencia) => (
    <Experience
      key={experiencia.id}
      nombre={experiencia.nombre}
      descripcion={experiencia.descripcion}
      localidad={experiencia.localidad}
    />
  ));
  return <ul>{postArray}</ul>;
};

export default ListExperiences;
