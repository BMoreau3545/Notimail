import NewMail from '../assets/mail_rouge.png';
import '../index.css';
import React, { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { IoMailOpen, IoCloseCircle } from 'react-icons/io5';
import { FaCheckCircle } from 'react-icons/fa';
import { NavBar } from '../Composants/Navbar';

export const AccueilEntreprise = ({ loggedInFirmName, dataFirmName }) => {
  const [open, setOpen] = useState(false);
  const [confirmReception, setConfirmReception] = useState('');

  // Gestion de la modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // Mail reçu ? - Récupération du statut depuis l'API
useEffect(() => {
    const fetchMailStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/client/recup_mail?firm_name=${loggedInFirmName}`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJtX25hbWUiOiJFbnRyZXByaXNlMiIsImlhdCI6MTcwNTkxNDUyNSwiZXhwIjoxNzEzNjkwNTI1fQ.TC8D0XTm0NcwsOQzogjXdn-Z67WUMexMM26EPdlz8DQ`,
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log('1',data)
          // Mettez à jour l'état confirmReception en fonction du statut de la réponse
          setConfirmReception(data.message);
          console.log('2',data.message)
        } else {
          // Gérer les erreurs si nécessaire
          console.error('Échec de la récupération du statut du courrier');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération du statut du courrier', error);
      }
    };
  
    fetchMailStatus();
  }, [loggedInFirmName]);


  // Confirmation de la réception
  const handleConfirmation = () => {
    setConfirmReception(false);
  };

  return (
    <>
      <NavBar dataFirmName={dataFirmName} loggedInFirmName={loggedInFirmName} />
      {confirmReception ? (
        <section className="AccueilMailRecu">
          <div className="IconeSuperposition">
            <img src={NewMail} alt="icone nouveau mail" id="iconeNewMail" />
          </div>
          <div>
            <p>Vous avez du courrier en attente</p>
            <button onClick={onOpenModal} className="Receptionner">
              Réceptionner
            </button>
            <Modal open={open} onClose={onCloseModal} center closeIcon=" ">
              {/* Le close item est vide pour enlever son affichage par défaut du CSS importé par l'installation de react modal */}
              <p>Confirmer la réception du courrier :</p>
              <div className="centerIcons">
                <IoCloseCircle
                  className="button-react"
                  style={{ fontSize: '60px', color: '#FF3535' }}
                  onClick={onCloseModal}
                />
                <FaCheckCircle
                  className="button-react"
                  style={{ fontSize: '50px', color: '#025892' }}
                  onClick={handleConfirmation}
                  disabled={!confirmReception}
                />
              </div>
            </Modal>
          </div>
        </section>
      ) : (
        <section className="AccueilAucunMail">
          <IoMailOpen style={{ fontSize: '8rem', color: '#4597b574' }} />
          <p>Aucun courrier en attente</p>
          <button className="noReceptionner">Réceptionner</button>
        </section>
      )}
    </>
  );
};
