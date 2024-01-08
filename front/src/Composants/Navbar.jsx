import { NavLink } from 'react-router-dom';
import Mailto from '../assets/LogoNotimail.png';
import "../Navbar.css";
import "../index.css"

export const NavBar = () => {
  return (
    <>
      <nav className='logo'>
        {/* <NavLink to="/home"> */}
          <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
        {/* </NavLink> */}
        <div>
          <h3>User</h3>
          <button>Deconnexion</button>
        </div>
      </nav>
    </>
  )
}
