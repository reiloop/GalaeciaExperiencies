import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../components/TokenContextProvider"

const useAllBookings = () => {
  const [allBookings, setAllBooking] = useState([]); // ==> [state, setState]
  const [, setError] = useState(null);
  const [token] = useContext(TokenContext);

  useEffect(() => {
    const getBookings = async () => {
      fetch(`http://localhost:4000/bookings`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        
      })
        .then((res) => res.json())
        .then(
          (result) => {
            setAllBooking(result);
          },
          (error) => {
            setError(error);
          }
        );
    };
    getBookings();
   //const interval = setInterval(getBookings, 1000);
   //return () => clearInterval(interval);
   
  }, []);

  return [allBookings, setAllBooking];
};

export default useAllBookings;
