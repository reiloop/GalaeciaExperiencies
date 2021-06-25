import { useState } from "react";

const RegisterForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [bio, setBio] = useState("");
  const [name, setName] = useState("");
  const registerUser = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, bio }),
    });

    const body = await res.json();
    console.log(body);
  };

  return (
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
  );
};

export default RegisterForm;
