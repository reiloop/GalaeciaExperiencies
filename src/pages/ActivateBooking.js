import { Link } from "react-router-dom";
import ActivateBooking from "../components/ActivateBooking";
import HeaderMenu from "../components/HeaderMenu";

const ActivateBookingPage = () => {
  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <ActivateBooking></ActivateBooking>
      <Link to="/" style={{ fontWeight: "bold" }}>
        Has activado tu reserva, ahora puedes valorala.
      </Link>
    </div>
  );
};

export default ActivateBookingPage;
