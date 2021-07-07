import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Experience from "../components/Experience";
import HeaderMenu from "../components/HeaderMenu";
import Imagenes from "../components/Imagenes";
import Comments from "../components/Comments";
import Booking from "../components/Booking";
import AddComment from "../components/AddComment";
import decodeTokenData from "../utils/decodedTokenData";
import { TokenContext } from "../components/TokenContextProvider";
import UploadEntryPhoto from "../components/UploadEntryPhoto";
import EraseForm from "../components/EraseForm";
import EditForm from "../components/EditForm";

const ExperiencesPage = () => {
  const [token] = useContext(TokenContext);

  const { postId } = useParams();
  const [url] = useState(`http://localhost:4000/experience/${postId}`);
  const [, setError] = useState(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [actividad, setActividad] = useState([]); // ==> [state, setState]
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setActividad(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, [url]);

  if (actividad.status) {
    const data = actividad.data;
    const decodedToken = decodeTokenData(token);
    console.log(data);
    const photos = data.photos;
    const date = new Date(data.fecha_disponible)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    if (!decodedToken) {
      return (
        <div className="experiencePage">
          <HeaderMenu></HeaderMenu>
          <Booking
            id={data.id}
            precio={data.precio}
            email={data.email}
            fecha={date}
            plazasLibres={data.plazas_disponibles}
          ></Booking>
          <Experience
            key={data.id}
            id={data.id}
            nombre={data.nombre}
            descripcion={data.descripcion}
            localidad={data.localidad}
            categoria={data.categoria}
            fecha={data.fecha_disponible}
            precio={data.precio}
            libres={data.plazas_disponibles}
            totales={data.plazas_totales}
          />
          <ul className="images">
            {photos.map((e) => (
              <Imagenes key={e.imagen} photo={e.imagen}></Imagenes>
            ))}{" "}
          </ul>
          <Comments id={data.id}></Comments>
          <AddComment id={data.id}></AddComment>
          <footer>
            <Link className="link" to="/" style={{ fontWeight: "300" }}>
              Volver a página de inicio
            </Link>
            <p>(C) ESTÉBAN ESTÉVEZ & JOSÉ M. REIMÓNDEZ (2021)</p>
          </footer>
        </div>
      );
    } else if (decodedToken.rol === "admin") {
      return (
        <div className="experiencePage">
          <HeaderMenu></HeaderMenu>

          <Experience
            key={data.id}
            id={data.id}
            nombre={data.nombre}
            descripcion={data.descripcion}
            localidad={data.localidad}
            categoria={data.categoria}
            fecha={data.fecha_disponible}
            precio={data.precio}
            libres={data.plazas_disponibles}
            totales={data.plazas_totales}
          />
          <ul className="images">
            {photos.map((e) => (
              <Imagenes key={e.imagen} photo={e.imagen}></Imagenes>
            ))}{" "}
          </ul>
          <UploadEntryPhoto id={postId}></UploadEntryPhoto>
          <EditForm id={data.id}></EditForm>
          <EraseForm id={data.id}></EraseForm>
        </div>
      );
    } else if (decodedToken.rol === "user") {
      return (
        <div className="experiencePage">
          <HeaderMenu></HeaderMenu>
          <Booking
            id={data.id}
            precio={data.precio}
            fecha={date}
            plazasLibres={data.plazas_disponibles}
          ></Booking>
          <Experience
            key={data.id}
            id={data.id}
            nombre={data.nombre}
            descripcion={data.descripcion}
            localidad={data.localidad}
            categoria={data.categoria}
            fecha={data.fecha_disponible}
            precio={data.precio}
            libres={data.plazas_disponibles}
            totales={data.plazas_totales}
          />
          <ul className="images">
            {photos.map((e) => (
              <Imagenes key={e.imagen} photo={e.imagen}></Imagenes>
            ))}{" "}
          </ul>
          <Comments id={data.id}></Comments>
          <AddComment id={data.id}></AddComment>
          <footer>
            <Link className="link" to="/" style={{ fontWeight: "300" }}>
              Volver a página de inicio
            </Link>
            <p>(C) ESTÉBAN ESTÉVEZ & JOSÉ M. REIMÓNDEZ (2021)</p>
          </footer>
        </div>
      );
    }
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <ul>Error: no se ha encontrado la experiencia deseada</ul>;
  }
};

export default ExperiencesPage;
