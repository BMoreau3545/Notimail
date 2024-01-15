import { NavLink } from 'react-router-dom';
import Mailto from '../assets/LogoNotimail.png';
import { IoMailOpen ,  IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { Modal } from 'react-responsive-modal';
import "../Navbar.css";
import "../index.css"
import { useState } from 'react';

export const NavBar = ({ loggedInUser, onLogout }) => {
  const [open, setOpen] = useState(false);

  // Gestion de la modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <nav className='logo'>
        <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
        <div className='center column'>
          <h3>{loggedInUser}</h3>
          <button onClick={onOpenModal}>Déconnexion</button>
          <Modal open={open} onClose={onCloseModal} center closeIcon=" ">
            <p>
              Confirmer la déconnexion ?
            </p>
            <div className='centerIcons'>
              <IoCloseCircle className='button-react' style={{ fontSize: '60px', color: '#FF3535' }} onClick={onCloseModal} />
              <NavLink to="/">
                <FaCheckCircle className='button-react' style={{ fontSize: '50px', color: '#025892' }}/>
              </NavLink>
            </div>
          </Modal>
        </div>
      </nav>
    </>
  );
};
