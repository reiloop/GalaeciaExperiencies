// import { useState } from "react";
// ''

const Imagenes = (props) => {
  const { photo } = props;
  const random = Math.floor(Math.random() * 5 + 1);
  console.log(random);
  if (photo) {
    return (
      <div className="imagenes">
        <img
          src={`${process.env.PUBLIC_URL}/images/${photo}.jpg`}
          alt="Foto de experiencia"
        />
      </div>
    );
  } else {
    return (
      <div className="icon">
        <img height="100" width="100" src={`../images/icon-1.png`} alt="icon" />
      </div>
    );
  }
};

export default Imagenes;
