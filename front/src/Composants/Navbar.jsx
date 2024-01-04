import { NavLink } from 'react-router-dom';
import Mailto from '..assets/LogoNotimail.jpg';
import "../index.css";

export const NavBar = () => {
  return (
    <>
      <div className='logo'>
        <NavLink to="/home">
          <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
        </NavLink>
        <div>
          <h3>User</h3>
          <button>Deconnexion</button>
        </div>
      </div>
    </>
  );
};
