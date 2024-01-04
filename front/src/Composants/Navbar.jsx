import { NavLink } from 'react-router-dom';
import Mailto from '../assets/LogoNotimail.jpg';
import "../Navbar.css";

export const NavBar = () => {
  return (
    <>
      <nav className='logo'>
        {/* <NavLink to="/home"> ajout du retour home quand la route sera crée */}
          <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
        {/* </NavLink> */}
        <div>
          <h3>User</h3>
          <button>Deconnexion</button>
        </div>
      </nav>
    </>
  );
};
