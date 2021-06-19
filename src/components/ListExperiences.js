import Experience from "./Experience";
let basedatos = [];
const dataExperiences = async () => {
  const res = await fetch("http://localhost:4000/experiences");
  const { data } = await res.json();

  for (let i = 0; i < data.length; i++) {
    basedatos.push({
      id: data[i].id,
      nombre: data[i].nombre,
      descripcion: data[i].descripcion,
      localidad: data[i].localidad,
    });
  }
};
dataExperiences();

const ListExperiences = (props) => {
  const postArray = basedatos.map((e) => (
    <Experience
      key={e.id}
      nombre={e.nombre}
      descripcion={e.descripcion}
      localidad={e.localidad}
    />
  ));
  return <div>{postArray}</div>;
};

export default ListExperiences;
