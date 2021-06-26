import { useState, useRef } from "react";

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const fileInput = useRef();
  const [uploadedFile, setUploadedFile] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    const file = fileInput.current.files[0];

    formData.append("photo", file);
    console.log(file.name);

    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, bio }),
      formData,
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
      <form onSubmit={registerUser}>
        <label htmlFor="name">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPasword(e.target.value)}
        ></input>
        <label htmlFor="bio">Biografía</label>
        <textarea
          id="bio"
          name="bio"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <input
          type="file"
          ref={fileInput}
          accept="image/*" /* multiple */
        ></input>

        <input type="submit" value="Enviar" />
      </form>

      {uploadedFile && (
        <>
          <p>
            Se ha subido correctamente tu imagen y se ha creado el usuario,
            revisa tu correo para confirmar
          </p>
          <img src={`../avatars/${uploadedFile}`} alt="Foto subida"></img>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
