import image from "/home/reiloop/Documents/Proyecto experiencias/Frontend/my-app/src/images/mountain.png"
import { useContext } from 'react';
import { TokenContext } from '../components/TokenContextProvider';

const HeaderMenu = (props) => {
  const [token, setToken] = useContext(TokenContext);
 if (token){
  return (
    <div className="HeaderMenu">
      <img className='header-image' alt='icon' src={image}></img>
      <ul className="header-ul">
        <li>
          <a href="./experiences">Experiencias</a>
        </li>
        <li>
          <a href="./booking/:id">Mis reservas</a>
        </li>
        <li>
          <a href="./user/:id">Mi perfil</a>
        </li>
      </ul>
      <button onClick={() => setToken('')}>
            Sign out
      </button>

    </div>
  );
 } else {
  return (
    <div className="HeaderMenu">
      <img className='header-image' alt='icon' src={image}></img>
      <ul className="header-ul">
        <li>
          <a href="./experiences">Experiencias</a>
        </li>
        <li>
          <a href="./login">Login</a>
        </li>
        <li>
          <a href="./register">Registro</a>
        </li>
      </ul>

    </div>
  );
 }
  

};

export default HeaderMenu;
