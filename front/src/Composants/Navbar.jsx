  import { NavLink, useNavigate } from 'react-router-dom';
  import Mailto from '../assets/LogoNotimail.png';
  import { IoMailOpen ,  IoCloseCircle } from "react-icons/io5";
  import { FaCheckCircle } from "react-icons/fa";
  import { Modal } from 'react-responsive-modal';
  import "../Navbar.css";
  import "../index.css"
  import { useState } from 'react';

  export const NavBar = ({ loggedInFirmName}) => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();

    // Gestion de la modal
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    // Déconnexion de l'utilisateur
    const handleLogout = async () => {
      try {
        console.log('Tentative de déconnexion...');
  
        //supprimer le token
        const token = localStorage.getItem('token');
  
        if (!token) {
          // Si le token n'est pas présent, l'utilisateur est probablement déjà déconnecté
          console.log('Utilisateur déjà déconnecté');
          return;
        }
        console.log('envoie de la requete en POST');
        const response = await fetch('http://localhost:3000/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          console.log('Utilisateur déconnecté avec succès');
          // Nettoyez le localStorage
          localStorage.removeItem('token');
          localStorage.removeItem('firmName');
          localStorage.removeItem('is_admin');
          // Redirection vers la page de connexion
          navigate('/');
        } else {
          console.error('Erreur lors de la déconnexion');
        }
      } catch (error) {
        console.error('Erreur lors de la requête de déconnexion :', error);
      }
    }

    return (
      <>
        <nav className='logo'>
          <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
          <div className='center column'>
            <h3 className='nomConnexion'>{loggedInFirmName}</h3>
            <button className='deconnexion' onClick={onOpenModal}>Déconnexion</button>
            <Modal open={open} onClose={onCloseModal} center closeIcon=" ">
              <p>
                Confirmer la déconnexion ?
              </p>
              <div className='centerIcons'>
                <IoCloseCircle className='button-react' style={{ fontSize: '60px', color: '#FF3535' }} onClick={onCloseModal} />
                  <FaCheckCircle className='button-react' style={{ fontSize: '50px', color: '#025892' }} onClick={handleLogout} />
              </div>
            </Modal>
          </div>
        </nav>
      </>
    );
  };
