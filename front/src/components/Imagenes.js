// import { useState } from "react";
// ''

const Imagenes = (props) => {
  const { photo, categoria } = props;

  if (photo) {
    return (
      <div className="imagenes">
        <img
          src={`${process.env.PUBLIC_URL}/images/${photo}.jpg`}
          alt="Foto de experiencia"
        />
      </div>
    );
  } else if (categoria === "Naturaleza"){
    return (
      <div className="icon">
        <img height="100" width="100" src={`../images/icon-3.png`} alt="icon" />
      </div>
    );
  } else if (categoria === "Aventuras"){
    return (
      <div className="icon">
        <img height="100" width="100" src={`../images/Aventuras.png`} alt="icon" />
      </div>
    );
  } else if (categoria === "Al aire libre"){
    return (
      <div className="icon">
        <img height="100" width="100" src={`../images/Air.png`} alt="icon" />
      </div>
    );
  } else if (categoria === "Deportes"){
    return (
      <div className="icon">
        <img height="100" width="100" src={`../images/Deportes.png`} alt="icon" />
      </div>
    );
  }
};

export default Imagenes;
