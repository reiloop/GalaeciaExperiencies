import useBookings from "../hooks/useBookings";
import useAllBookings from "../hooks/useAllBookings";
import decodeTokenData from "../utils/decodedTokenData";
import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";

const AddBookings = (props) => {
  const [token] = useContext(TokenContext);
  const decodedToken = decodeTokenData(token);
  const { id } = props;
  const [bookings] = useBookings(id);
  const [allBookings] = useAllBookings();
  const data = bookings.data;
  const allData = allBookings.data;
  console.log(allData);
  if (decodedToken.rol === "admin") {
    if (allData !== undefined) {
      if (allData.length > 1) {
        const arrayAllBookings = allData.map((item) => (
          <div className="reservas">
            <p>
              El usuario {item.nombre_usuario} ha reservado la actividad
              <a href={`/experience/${item.id}`}> {item.nombre_actividad}</a>
            </p>
            <p>Fecha de la reserva: {item.fecha_uso.slice(0, 10)}</p>
          </div>
        ));
        return <ul className="listaReservas">{arrayAllBookings}</ul>;
      } else if (allData.length === 1) {
        return (
          <div className="reservas">
            <p>
              El usuario {allData[0].nombre_usuario} ha reservado la actividad
              <a href={`/experience/${allData[0].id}`}>
                {allData[0].nombre_actividad}
              </a>
            </p>
            <p>Fecha de la reserva: {allData[0].fecha_uso.slice(0, 10)}</p>
          </div>
        );
      } else {
        return <p>No tienes ninguna reserva</p>;
      }
    } else {
      return <p>No tienes ninguna reserva</p>;
    }
  }

  if (decodedToken.rol === "user") {
    if (data !== undefined) {
      if (data.length > 1) {
        const arrayBookings = data.map((item) => (
          <div className="reservas">
            <p>
              Has reservado la actividad
              <a href={`/experience/${item.id}`}> {item.nombre}</a>
            </p>
            <p>Fecha de la actividad: {item.fecha_uso.slice(0, 10)}</p>
          </div>
        ));
        return <ul className="listaReservas">{arrayBookings}</ul>;
      } else if (data.length === 1) {
        return (
          <div className="reservas">
            <p>
              Has reservado la actividad
              <a href={`/experience/${data[0].id}`}> {data[0].nombre}</a>
            </p>
            <p>Fecha de la actividad: {data[0].fecha_uso.slice(0, 10)}</p>
          </div>
        );
      } else {
        return <p>No tienes ninguna reserva</p>;
      }
    } else {
      return <p>No tienes ninguna reserva</p>;
    }
  }
};
export default AddBookings;
