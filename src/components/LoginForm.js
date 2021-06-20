import { useState, useContext } from "react";
import { TokenContext } from "./TokenContextProvider";

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
      setToken(data.token);
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

      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};

export default LoginForm;
