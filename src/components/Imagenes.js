// import { useState } from "react";
// ''
import icon from "../../src/images/ICON.png"

const Imagenes = (props) => {
  const { photo } = props;
  if (photo){
    return (
      <div className="imagenes">
        <img
          src={`${process.env.PUBLIC_URL}/images/${photo}.jpg`}
          alt="Foto de experiencia"
        />
      </div>
    );
  }else{

    return (
      <div className="icon">
        <img 
          height="100" 
          width="100"
          src={icon}
          alt="icon"
        />
      </div>
    );
  };
  };

export default Imagenes;
