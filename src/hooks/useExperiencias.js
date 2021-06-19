import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";

const useExperiencias = () => {
  const [experiencias, setExperiencias] = useState([]); // ==> [state, setState]
  const [token, setToken] = useContext(TokenContext);

  useEffect(() => {
    const cargarExperiencias = async () => {
      const res = await fetch("http://localhost:4000/experiences", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) {
        setExperiencias(data);
      } else {
        setToken("");
      }
    };
    cargarExperiencias();
    const interval = setInterval(cargarExperiencias, 500);

    return () => clearInterval(interval);
  }, [token, setToken]);

  return [experiencias, setExperiencias];
};

export default useExperiencias;
