const HeaderMenu = (props) => {
  return (
    <div className="chatRoomHeader">
      <h2>Experiencias Gallaecia</h2>
      <ul>
        <li>Experiencias</li>
        <li>Sobre Nosotros</li>
        <li>Cursos</li>
      </ul>
      <ul>
        <li>
          <a href="./login">Login</a>
        </li>
        <li>
          <a href="./register">Registro</a>
        </li>
      </ul>
    </div>
  );
};

export default HeaderMenu;
