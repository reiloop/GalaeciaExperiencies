import useBookings from "../hooks/useBookings";
import useAllBookings from "../hooks/useAllBookings";

import decodeTokenData from "../utils/decodedTokenData";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";

const AddBookings = (props) => {
  const [token, setToken] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);
  const { id } = props;
  const [bookings] = useBookings(id);
  const [allBookings] = useAllBookings();
  const data = bookings.data;
  const allData = allBookings.data;
  if (decodedToken.rol === "admin") {

    if (allData !== undefined) {
      if (allData.length > 1) {
        const arrayAllBookings = allData.map((item) => (
        <>
          <p key={item.id}>ID de la actividad: {item.id_actividad}</p>
          <p>Id del usuario:{item.id_user}</p>
          <p>Fecha de la reserva:{item.fecha_uso}</p>
        </>
        ));
        return <ul className="listaReservas">{arrayAllBookings}</ul>;
      } else if (allData.length === 1) {
        return (
        <>
        <p key={id}>ID de la actividad: {allData[0].id_actividad}</p>
        <p>Id del usuario:{allData[0].id_user}</p>

        <p>Fecha de la reserva:{allData[0].fecha_uso}</p>
        </>
        )
      } else {
        return <p>No tienes ninguna reserva</p>;
      }
    } else {
      return <p>No tienes ninguna reserva</p>;
    }
  };

  if (decodedToken.rol === "user") {

    if (data !== undefined) {
      if (data.length > 1) {
        const arrayBookings = data.map((item) => (
        <>
          <p key={item.id}>ID de la actividad: {item.id_actividad}</p>
          <p>Fecha de la reserva:{item.fecha_uso}</p>
        </>
        ));
        return <ul className="listaReservas">{arrayBookings}</ul>;
      } else if (data.length === 1) {
        return (
        <>
        <p key={id}>ID de la actividad: {data[0].id_actividad}</p>
        <p>Fecha de la reserva:{data[0].fecha_uso}</p>
        </>
        )
      } else {
        return <p>No tienes ninguna reserva</p>;
      }
    } else {
      return <p>No tienes ninguna reserva</p>;
    }
  };
};
export default AddBookings;
