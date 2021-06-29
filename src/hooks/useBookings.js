import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider"

const useBookings = (id) => {
  const [bookings, setBooking] = useState([]); // ==> [state, setState]
  const [, setError] = useState(null);
  const [token] = useContext(TokenContext);

  useEffect(() => {
    const getBookings = async () => {
      fetch(`http://localhost:4000/experience/${id}/booking`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setBooking(result);
          },
          (error) => {
            setError(error);
          }
        );
    };
    getBookings();
   //const interval = setInterval(getBookings, 1000);
   //return () => clearInterval(interval);
   
  }, [id]);

  return [bookings, setBooking];
};

export default useBookings;
