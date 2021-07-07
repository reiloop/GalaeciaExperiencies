import { useContext, useState } from "react";
import { TokenContext } from "./TokenContextProvider";

const Booking = (props) => {
  const { id, precio, fecha, plazasLibres, email } = props;
  const [token] = useContext(TokenContext);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const bookExperience = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/experience/${id}/booking`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        fecha,
        precio,
        plazasLibres,
        email,
      }),
    });
    const restarPlazaLibre = async (e) => {
      const res = await fetch(
        `http://localhost:4000/experience/${id}/booking`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({
            plazasLibres,
          }),
        }
      );
      const body = await res.json();
      console.log(body);
    };
    const body = await res.json();
    setMessage(body.message);
    if (body.error) {
      setError(body.error);
    } else {
      restarPlazaLibre();
    }
  };
  return (
    <div className="booking">
      <form onSubmit={bookExperience}>
        <input type="submit" value="RESERVAR" />
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};
export default Booking;
