import { useContext, useState } from "react";
import { TokenContext } from "./TokenContextProvider";

const AddComment = (props) => {
  const { id } = props;
  const [token] = useContext(TokenContext);
  const [vote, setVote] = useState(1);
  const [comentario, setComment] = useState("");
  const [message, setMessage] = useState("");
  const createComment = async (e) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:4000/experience/${id}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        vote,
        comentario,
      }),
    });

    const body = await res.json();
    console.log(body);
    setMessage(body);
  };

  return (
    <div className="addComments">
      {message && <p style={{ color: "red" }}>{message.error}</p>}
      <form onSubmit={createComment}>
        <label htmlFor="vote">Voto </label>

        <input
          type="number"
          min="1"
          max="5"
          id="vote"
          name="vote"
          value={vote}
          onChange={(e) => setVote(Number(e.target.value))}
        ></input>
        <label htmlFor="comment">Comentario </label>
        <input
          type="text"
          id="comment"
          name="comment"
          value={comentario}
          onChange={(e) => setComment(e.target.value)}
        ></input>
        <input type="submit" value="Comentar" />
      </form>
    </div>
  );
};

export default AddComment;
