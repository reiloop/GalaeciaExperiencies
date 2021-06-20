const Imagenes = (props) => {
  const { photo } = props;
  console.log(photo);
  return (
    <div className="imagenes">
      <img
        src={`../../../proyecto-experiencias/uploads/imagenes/${photo}`}
        alt="Foto de experiencia"
      ></img>
    </div>
  );
};

export default Imagenes;
