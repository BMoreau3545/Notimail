import MailSelect from '../assets/envoie.png';
import Newuser from '../assets/plus.png';
import "../adminboutons.css"
import React, { useState } from 'react';
import Modal from 'react-responsive-modal';

export const AdminBoutons = () => {
  const [open, setOpen] = useState(false);

  // Gestion de la modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <>
      <div id='badpage'>
        <button><img src={Newuser} className="icon" alt="bouton pour ajouter un utilisateur" /></button>  
        <button><img src={MailSelect} onClick={onOpenModal} className="icon" alt="bouton pour envoyer un mail au entreprise cocher" /></button>  
      </div>

      <Modal open={open} onClose={onCloseModal} center>
        <p>
          Vous vous apprêtez à notifier :
        </p>
        <div className='mailList'>
          <ul>
            <li></li>
          </ul>
        </div>
        <div className='boutonsModal'>
          <button onClick={onCloseModal} className='annuler'>Annuler</button>
          <button className='envoyer'>Envoyer</button>
        </div>

      </Modal>
    </>
  );
};