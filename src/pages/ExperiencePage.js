import { useParams } from "react-router-dom";
import Experience from "../components/Experience";
import useExperiencias from "../hooks/useExperiencias";

const ExperiencesPage = (props) => {
  const { postId } = useParams();
  const [experiencias] = useExperiencias();
  console.log(experiencias);
  const data = experiencias[postId];
  const { id, nombre, descripcion, localidad } = data;
  return (
    <div>
      <Experience
        key={id}
        nombre={nombre}
        descripcion={descripcion}
        localidad={localidad}
      />
    </div>
  );
};

export default ExperiencesPage;
