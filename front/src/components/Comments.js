import useComments from "../hooks/useComments";
const Comments = (props) => {
  const { id } = props;
  const [comments] = useComments(id);
  const data = comments.data;

  if (data !== undefined) {
    if (data.length > 1) {
      const arrayComentarios = data.map((item) => (
        <p key={item.id}>
          " {item.comentario} "-- Valoración: {item.voto}
        </p>
      ));
      return (
        <div className="comentarios">
          <h2>Comentarios</h2>
          <ul>{arrayComentarios}</ul>
        </div>
      );
    } else if (data.length === 1) {
      return (
        <div className="comentarios">
          <h2>Comentarios</h2>{" "}
          <p className="comentarios">
            " {data[0].comentario} " -- Valoración {data[0].voto}
          </p>{" "}
        </div>
      );
    } else {
      return <p>Sin comentarios en esta actividad</p>;
    }
  } else {
    return <p>Sin comentarios en esta actividad</p>;
  }
};
export default Comments;
