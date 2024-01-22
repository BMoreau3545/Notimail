import { NavLink, useNavigate } from 'react-router-dom';
import Mailto from '../assets/LogoNotimail.png';
import { IoMailOpen ,  IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { Modal } from 'react-responsive-modal';
import "../Navbar.css";
import "../index.css"
import { useState } from 'react';

export const NavBar = ({ loggedInFirmName, loginPassword, selectedUser}) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Gestion de la modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  console.log(loggedInFirmName)

  // Déconnexion de l'utilisateur
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3000/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firm_name: loggedInFirmName,
          password: loginPassword,
          is_admin: selectedUser === 'admin'
        }),
      });

      if (response.ok) {
        console.log('Utilisateur déconnecté avec succès');
        // Nettoyez le localStorage
        // localStorage.removeItem('token');
        // localStorage.removeItem('firmName');
        // localStorage.removeItem('isAdmin');
        localStorage.clear('token');
        console.log('Après la déconnexion :', localStorage.getItem('token'));
        // Redirection vers la page de connexion
        navigate('/');


      } else {
        console.error('Erreur lors de la déconnexion');
      }
    } catch (error) {
      console.error('Erreur lors de la requête de déconnexion:', error);
    }
  };

  return (
    <>
      <nav className='logo'>
        <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
        <div className='center column'>
          <h3>{loggedInFirmName}</h3>
          <button onClick={onOpenModal}>Déconnexion</button>
          <Modal open={open} onClose={onCloseModal} center closeIcon=" ">
            <p>
              Confirmer la déconnexion ?
            </p>
            <div className='centerIcons'>
              <IoCloseCircle className='button-react' style={{ fontSize: '60px', color: '#FF3535' }} onClick={onCloseModal} />
              <NavLink to="/">
                <FaCheckCircle className='button-react' style={{ fontSize: '50px', color: '#025892' }} onClick={handleLogout} />
              </NavLink>
            </div>
          </Modal>
        </div>
      </nav>
    </>
  );
};
