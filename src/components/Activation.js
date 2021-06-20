import { useState, useEffect } from "react";
import { useParams } from "react-router";

function Activation() {
  const [, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const { registrationCode } = useParams();
  const [url] = useState(`http://localhost:4000/activate/${registrationCode}`);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [url]);

  if (items.error) {
    return <div>Error: {items.error}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <ul>{items.message}</ul>;
  }
}

export default Activation;
