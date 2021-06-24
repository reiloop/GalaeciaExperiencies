import { useState, useEffect } from "react";
import { TokenContext } from "./TokenContextProvider";

/*
const AddComment = (props) => {
  const {id} = props;
  const [token] = useContext(TokenContext);
    const [Comments, setComments] = useState("");
    const res = fetch(`http://localhost:4000/experience/${id}/comments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
        "Access-Control-Allow-Origin": "*",
      },
    });
    const body =  res.json();
    const comentario = body.data.comentario;
    setComments(comentario)
    
    return (
      <div>
          <button onClick={AddComment}>Comentarios</button>
        <p>
            Comentarios: {Comments}
        </p>
    </div>
)
};
export default AddComment;
*/
const AddComment = (props) => {
  const {id} = props;
  const [url] = useState(`http://localhost:4000/experience/${id}/comments`);
  const [, setError] = useState(null);
  const [comments, setComments] = useState("");
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setComments(result);
        },
        (error) => {
          setError(error);
        }
      );
  }, [url]);
console.log(comments);
const data = comments.data;
const arrayComentarios = data.map((item) => (
  
    <p
      key={item.id}
      >{item.comentario}</p>
  
));
return <ul className="listaComentarios">{arrayComentarios}</ul>;


  };
  export default AddComment;
