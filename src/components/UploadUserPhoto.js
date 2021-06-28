import { useState, useRef, useContext } from "react";
import { TokenContext } from "./TokenContextProvider";

const UploadUserPhoto = (props) => {
  const [uploadedFile, setUploadedFile] = useState("");
  const { id } = props;
  const [token] = useContext(TokenContext);
  const [url] = useState(`http://localhost:4000/users/${id}`);
  const fileInput = useRef();

  const fileUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    const file = fileInput.current.files[0];

    formData.append("photo", file);

    const response = await fetch(url, {
      method: "PUT",
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
    <div>
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
          <p>Se ha subido correctamente tu foto de perfil</p>
        </>
      )}
    </div>
  );
};

export default UploadUserPhoto;
