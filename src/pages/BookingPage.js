import { useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider";
import { Redirect } from "react-router-dom";
import decodeTokenData from "../utils/decodedTokenData";
import HeaderMenu from "../components/HeaderMenu";
import { useParams } from "react-router-dom";
import AddBookings from "../components/AddBookings";


const BookingPage = (props) => {
  const { userId } = useParams();

  const [token] = useContext(TokenContext);
  if (token !== "") {
    const decodedToken = decodeTokenData(token);
    if (decodedToken.rol === "user" || decodedToken.rol === "admin") {
      return (
        <div>
          <HeaderMenu></HeaderMenu>
          <AddBookings 
            key={userId}
            id={userId} ></AddBookings>
        </div>
      );
    }
  } else {
    return <Redirect to={"/"} />;
  }
};

export default BookingPage;
