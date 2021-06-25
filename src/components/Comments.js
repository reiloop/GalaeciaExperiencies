import useComments from "../hooks/useComments";
const Comments = (props) => {
  const { id } = props;
  const [comments] = useComments(id);
  const data = comments.data;

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