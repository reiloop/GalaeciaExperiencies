import Search from "../components/Search";

import HeaderMenu from "../components/HeaderMenu";
import { Link } from "react-router-dom";

const SearchPage = (props) => {
  return (
    <div>
      <HeaderMenu></HeaderMenu>
      <Search></Search>
      <footer>
        <Link className="link" to="/" style={{ fontWeight: "300" }}>
          Volver a página de inicio
        </Link>
        <p>(C) ESTÉBAN ESTÉVEZ & JOSÉ M. REIMÓNDEZ (2021)</p>
      </footer>
    </div>
  );
};
export default SearchPage;
