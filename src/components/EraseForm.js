import { useContext } from "react";
import { TokenContext } from "./TokenContextProvider";

const EraseForm = (props) => {
  const [token] = useContext(TokenContext);
  const { id } = props;

  const eraseExperience = async (e) => {
    e.preventDefault();
    if (window.confirm("Seguro que quieres eliminar esta experiencia?")) {
      const res = await fetch(`http://localhost:4000/experience/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });

      const body = await res.json();
      console.log(body);
      window.alert("Has eliminado la experiencia");
      window.location = "/";
    } else {
      window.location = `/experience/${id}`;
    }
  };

  return (
    <form className="eraseExp" onSubmit={eraseExperience}>
      <label htmlFor="id">¿Quieres eliminar esta actividad?</label>
      <input type="submit" value="Eliminar" />
    </form>
  );
};

export default EraseForm;
