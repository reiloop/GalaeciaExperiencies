import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const useUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [url] = useState(`http://localhost:4000/user/${id}`);

  const cargarUser = async () => {
    const res = await fetch(url);
    const fetchedUser = await res.json();
    setUser(fetchedUser);
  };

  useEffect(() => {
    cargarUser();
  }, []);

  return user;
};

export default useUser;
