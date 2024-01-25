import NewMail from '../assets/mail_rouge.png';
import '../index.css';
import React, { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { IoMailOpen, IoCloseCircle } from 'react-icons/io5';
import { FaCheckCircle } from 'react-icons/fa';
import { NavBar } from '../Composants/Navbar';

export const AccueilEntreprise = ({ loggedInFirmName, dataFirmName }) => {
  // Etat de la modal
  const [open, setOpen] = useState(false);
  // Etat "has_mail", statut du courrier
  const [confirmReception, setConfirmReception] = useState(false); // Initialisez à false
  // Nouvel état pour stocker le statut has_mail
  const [hasMailStatus, setHasMailStatus] = useState(false);

  // Gestion de la modal
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // Mail reçu ? - Récupération du statut depuis le serveur
  useEffect(() => {
    const fetchMailStatus = async () => {
      try {
        const response = await fetch(`http://localhost:3000/client/get_user_has_mail/${loggedInFirmName}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          // Mettez à jour l'état hasMailStatus avec le statut du courrier
          setHasMailStatus(data.has_mail);
          // Mettez à jour l'état confirmReception avec le statut initial du courrier
          setConfirmReception(data.has_mail);
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
  const handleConfirmation = async () => {
    try {
      // Mettez à jour l'état confirmReception à false lors de la confirmation
      setConfirmReception(false);

      // Faites la requête fetch pour confirmer la réception du courrier (vous pouvez adapter l'URL selon votre backend)
      const confirmMailResponse = await fetch(`http://localhost:3000/client/recup_mail?firm_name=${loggedInFirmName}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      });

      if (confirmMailResponse.ok) {
        // Gérer la confirmation réussie
        console.log('Confirmation réussie');
        // Mettez à jour l'état hasMailStatus avec le statut du courrier
        setHasMailStatus(true);
        // Fermer la modal
        onCloseModal();
        window.location.reload();

      } else {
        // Gérer les erreurs si nécessaire
        console.error('Échec de la confirmation du courrier');
      }
    } catch (error) {
      console.error('Erreur lors de la confirmation de la réception du courrier', error);
    }
  };

  return (
    <>
      <NavBar dataFirmName={dataFirmName} loggedInFirmName={loggedInFirmName} />
      {hasMailStatus ? (
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
