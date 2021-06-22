// import { useState } from "react";
// ''


const Imagenes = (props) => {
  const { photo } = props;
  console.log(photo);
  return (
    <div className="imagenes">
      <img
        src={`${process.env.PUBLIC_URL}/images/${photo}.jpg`}
        alt="Foto de experiencia"
      />
    </div>
  );
};

export default Imagenes;
