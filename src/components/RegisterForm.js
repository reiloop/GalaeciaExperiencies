import { useState } from "react";

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const [uploadedFile, setUploadedFile] = useState("");

  const registerUser = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, bio }),
    });

    const body = await response.json();

    console.log(body);

    if (response.ok) {
      setUploadedFile(body);
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
        <input type="submit" value="Enviar" />
      </form>

      {uploadedFile && (
        <>
          <p>
            Se ha creado correctamente tu cuenta de usuario, revisa tu correo
            para confirmar tu cuenta.
          </p>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
