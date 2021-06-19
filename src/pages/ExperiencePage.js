import { useParams } from "react-router-dom";
import Experience from "../components/Experience";

const Activity = (props) => {
  const { id } = useParams();
  const data = async () => {
    const url = `https://localhost:4000/experience/${id}`;

    const res = await fetch(url);
    const body = await res.json();
    return body;
  };
  const { nombre, descripcion, localidad } = data;
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

export default Activity;
