import { useState, useContext } from "react";
import { TokenContext } from "./TokenContextProvider";
import { useRef } from 'react';

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [, setToken] = useContext(TokenContext);
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setError("");
      setToken(data.accessToken);
      console.log(data.token);
    } else {
      setError(data);
    }
  };
  return (
    <form id="login" onSubmit={login}>
      <label htmlFor="loginEmail">Email</label>
      <input
        type="email"
        id="loginEmail"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="loginPassword">Password</label>
      <input
        type="password"
        id="loginPassword"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input type="submit" value="Enviar" />
      <input type="file" ref={fileInput} accept="image/*"></input>
        <input type="submit" value="Subir archivo"></input>

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LoginForm;