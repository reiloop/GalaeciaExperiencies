import { useEffect, useState } from "react";

const useComments = (id) => {
  const [comments, setComments] = useState([]); // ==> [state, setState]
  const [, setError] = useState(null);
  useEffect(() => {
    const getComments = async () => {
      fetch(`http://localhost:4000/experience/${id}/comments`)
        .then((res) => res.json())
        .then(
          (result) => {
            setComments(result);
          },
          (error) => {
            setError(error);
          }
        );
    };
    getComments();
    const interval = setInterval(getComments, 1000);
    return () => clearInterval(interval);
  }, [id]);

  return [comments, setComments];
};

export default useComments;
