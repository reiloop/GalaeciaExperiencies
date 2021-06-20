import { useEffect, useState } from "react";

const useExperiencias = () => {
  const [experiencias, setExperiencias] = useState([]); // ==> [state, setState]
  useEffect(() => {
    const cargarExperiencias = async () => {
      const res = await fetch(`http://localhost:4000/experiences`);
      const data = await res.json();
      setExperiencias(data);
    };
    cargarExperiencias();
  }, []);

  return [experiencias, setExperiencias];
};

export default useExperiencias;
