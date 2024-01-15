import NewMail from '../assets/mail_rouge.png';
import '../index.css';
import React, { useEffect, useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { IoMailOpen ,  IoCloseCircle } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { NavBar } from '../Composants/Navbar';

export const AccueilEntreprise = () => {
    const [open, setOpen] = useState(false);
    const [confirmReception, setConfirmReception] = useState(true);

//Gestion de la modal
    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

//mail recu ? , pour le moment Forcé a oui
const handleConfirmation = () => {
    setConfirmReception(false);
}
    return (
        <>
             { <NavBar />}
            {confirmReception ? (
                <section className="AccueilMailRecu">
                    <div className="IconeSuperposition">
                        <img src={NewMail} alt="icone nouveau mail" id="iconeNewMail" />
                    </div>
                    <div>
                        <p>Vous avez du courrier en attente</p>
                        <button onClick={onOpenModal} className="Receptionner">Réceptionner</button>
                        <Modal open={open} onClose={onCloseModal} center closeIcon=" ">
                            {/*Le close item est vide pour enlever son affichage par défaut du CSS importé par l'installation de react modal */}
                            <p>
                                Confirmer la réception du courrier :
                            </p>
                            <div className='centerIcons'>
                                <IoCloseCircle style={{ fontSize: '60px', color: '#FF3535' }} onClick={onCloseModal}/>
                                <FaCheckCircle style={{ fontSize: '50px', color: '#025892' }} onClick={handleConfirmation} disabled={!confirmReception}/>
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
