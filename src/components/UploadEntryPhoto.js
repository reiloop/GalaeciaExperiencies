import { useState, useRef, useContext } from "react";
import { TokenContext } from "./TokenContextProvider";

const UploadEntryPhoto = (props) => {
  const [uploadedFile, setUploadedFile] = useState("");
  const { id } = props;
  const [token] = useContext(TokenContext);
  const [url] = useState(`http://localhost:4000/experience/${id}/photo`);
  const fileInput = useRef();

  const fileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const file = fileInput.current.files[0];

    formData.append("photo", file);

    const response = await fetch(url, {
      method: "POST",
      "Content-Type": "application/json",
      headers: {
        Authorization: `${token}`,
      },
      body: formData,
    });

    const body = await response.json();

    console.log(body);

    if (response.ok) {
      setUploadedFile(body.filename);
    } else {
      console.error(body);
    }
  };
  return (
    <div className="entryfoto">
      <p>Añade aquí las fotos de esta experiencia</p>
      <form onSubmit={fileUpload}>
        <input
          type="file"
          ref={fileInput}
          accept="image/*" /* multiple */
        ></input>
        <input type="submit" value="Subir archivo"></input>
      </form>
      {uploadedFile && (
        <>
          <p>Se ha subido correctamente la foto</p>
        </>
      )}
    </div>
  );
};

export default UploadEntryPhoto;
