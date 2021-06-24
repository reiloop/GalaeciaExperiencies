import { useContext } from "react";
import { TokenContext } from "./TokenContextProvider";

const Booking = (props) => {
  const { id, precio, fecha } = props;
  const [token] = useContext(TokenContext);

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
      }),
    });
    const body = await res.json();
    console.log(body);
  };

  return (
    <div>
      <form onSubmit={bookExperience}>
        <input type="submit" value="RESERVAR" />
      </form>
    </div>
  );
};
export default Booking;
