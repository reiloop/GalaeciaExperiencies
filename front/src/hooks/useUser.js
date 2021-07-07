import { useState, useEffect } from "react";

function useUser(id, token) {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const cargarUser = async () => {
      const res = await fetch(`http://localhost:4000/user/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `${token}`,
        },
      });
      const fetchedUser = await res.json();
      setUser(fetchedUser);
    };
    cargarUser();
  }, [id, token]);

  console.log(user);
  return [user];
}

export default useUser;
