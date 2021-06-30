import useBookings from "../hooks/useBookings";
import useAllBookings from "../hooks/useAllBookings";
import { format } from "date-fns";
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

          <p>El usuario {item.nombre_usuario} ha reservado la actividad {item.nombre_actividad}</p>
          <p>Fecha de la reserva: {item.fecha_uso.slice(0,10)}</p>

        </>
        ));
        return <ul className="listaReservas">{arrayAllBookings}</ul>;
      } else if (allData.length === 1) {
        return (
        <>

          <p>El usuario {allData[0].nombre_usuario} ha reservado la actividad {allData[0].nombre_actividad}</p>
          <p>Fecha de la reserva: {allData[0].fecha_uso.slice(0,10)}</p>
        
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
          <p>Has reservado la actividad {item.nombre}</p>
          <p>Fecha de la reserva: {item.fecha_uso.slice(0,10)}</p>
        </>
        ));
        return <ul className="listaReservas">{arrayBookings}</ul>;
      } else if (data.length === 1) {
        return (
        <>

          <p>Has reservado la actividad {data[0].nombre}</p>
          <p>Fecha de la reserva: {data[0].fecha_uso.slice(0,10)}</p>

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
