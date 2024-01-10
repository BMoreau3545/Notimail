import { NavLink } from 'react-router-dom';
import Mailto from '../assets/LogoNotimail.png';
import "../Navbar.css";
import "../index.css"

export const NavBar = () => {
  return (
    <>
      <nav className='logo'>
          <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
        <div className='center column'>
          <h3>User</h3>
          <NavLink to="/">
            <button>Deconnexion</button>
          </NavLink>
        </div>
      </nav>
    </>
  )
}
