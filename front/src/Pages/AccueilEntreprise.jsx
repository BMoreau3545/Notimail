
import NewMail from '../assets/mail_rouge.png';
import '../index.css'
import React, { useState } from 'react';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import { NavLink } from 'react-router-dom';


export const AccueilEntreprise = () => {
    const [open, setOpen] = useState(false);

    const onOpenModal = () => setOpen(true);
    const onCloseModal = () => setOpen(false);

    return (
        <>
            {/* <section className="AccueilAucunMail">        
            <IoMail  style={{ fontSize: '8rem',color: '#025892'}} />
            <p>Aucun courrier en attente</p>
            <button className="noReceptionner">Réceptionner</button>
        </section> */}


            <section className="AccueilMailRecu">
                <div className="IconeSuperposition">
                    <img src={NewMail} alt="icone nouveau mail" id="iconeNewMail" />
                </div>
                <div>
                    <p>Vous avez du courrier en attente</p>
                    <button onClick={onOpenModal} className="Receptionner">Réceptionner</button>
                    <Modal open={open} onClose={onCloseModal} center>
                        <p>
                         Confirmer la recpetion du courrier :
                        </p>
                        <button>X</button>
                        <button>V</button>
                    </Modal>
                </div>

            </section>
        </>
    )
}
