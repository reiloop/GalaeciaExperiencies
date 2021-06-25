import { useState, useEffect } from "react";

const Comments = (props) => {
  const { id } = props;
  const [, setError] = useState(null);
  const [comments, setComments] = useState("");
  useEffect(() => {
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
  }, [id]);
  console.log(comments);
  const data = comments.data;
  console.log(data);
  if (data !== undefined) {
    if (data.length > 1) {
      const arrayComentarios = data.map((item) => (
        <p key={item.id}>{item.comentario}</p>
      ));
      return <ul className="listaComentarios">{arrayComentarios}</ul>;
    } else if (data.length === 1) {
      return <p>{data[0].comentario}</p>;
    } else {
      return <p>Sin comentarios en esta actividad</p>;
    }
  } else {
    return <p>Sin comentarios en esta actividad</p>;
  }
};
export default Comments;
