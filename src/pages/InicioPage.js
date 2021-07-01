import HeaderMenu from "../components/HeaderMenu";
import ListExperiences from "../components/ListExperiences";

const InicioPage = (props) => {
  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <ListExperiences></ListExperiences>
      <footer>
        <p>(C) ESTÉBAN ESTÉVEZ & JOSÉ M. REIMÓNDEZ (2021)</p>
      </footer>
    </div>
  );
};

export default InicioPage;
