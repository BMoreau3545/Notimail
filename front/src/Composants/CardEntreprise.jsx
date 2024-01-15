import "../adminPanel.css";
import { FaRegEdit } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { AdminBoutons } from "./AdminBoutons";

export const CardEntreprise = () => {
    const [jsonData, setJsonData] = useState([]);
    const [isOpenArray, setIsOpenArray] = useState([]);
   //creation tableau pour les entreprises à notifié :
   const [aNotif, setANotif] = useState([]);

   useEffect(() => {
    fetch('../json')
        .then((res) => res.json())
        .then((data) => {
            setJsonData(data);
            setIsOpenArray(new Array(data.users.length).fill(false));
            setANotif(new Array(data.users.length).fill(false));
        })
        .catch((err) => console.error(err));
}, []);

    const toggleDropdown = (index) => {
        const newArray = [...isOpenArray];
        newArray[index] = !newArray[index];
        setIsOpenArray(newArray);
    };

      const Notifier = (index) => {
    // Cloner le tableau existant
    const newANotif = [...aNotif];
    
    // Inverser l'état de notification pour l'entreprise correspondante
    newANotif[index] = !newANotif[index];
    
    // Mettre à jour l'état avec le nouveau tableau
    setANotif(newANotif);
    console.log(newANotif)
};

    return (
        <>
            <div className="wrapper">
                {jsonData && jsonData.users ? (
                    console.log(jsonData.users),
                    jsonData.users.map((user, index) => (
                        <div key={user.firm_name}>
                            <section className={`cardPosition ${isOpenArray[index] ? 'openDropdown' : ''}`} onClick={() => toggleDropdown(index)}>
                                <div className="card openDefault">
                                    <div className="coordonees column">
                                        <h4 className="firm_name">{`${user.firm_name}`}</h4>
                                        <p className="first_name">{`${user.first_name}`}</p>
                                        <p className="received_mail">{`${user.last_received_mail}`}</p>
                                    </div>
                                    <div className="column center">
                                        <label className="switch">
                                        <input type="checkbox"
                                                className="checkbox"
                                                checked={aNotif[index]} // Définir l'état activé en fonction du tableau aNotif
                                                onChange={() => Notifier(index)} />
                                            <div className="slider"></div>
                                        </label>
                                        <FaRegEdit style={{ fontSize: '35px', color: '#025892' }} />
                                    </div>
                                </div>
                                {isOpenArray[index] && (
                                    <div className="closeDefault">
                                        <div className="adresse">
                                            <p className="pTexte">Email : </p>
                                            <p className="pTexte">Téléphone : </p>
                                            <p className="pTexte">identifiant : </p>
                                        </div>
                                        <div className="column">
                                            <p className="pTexte">{`${user.email}`}</p>
                                            <p className="pTexte">{`${user.phone_number}`}</p>
                                            <p className="pTexte">{`${user.password}`}</p>
                                        </div>
                                    </div>
                                )}
                            </section>
                        </div>
                    ))
                ) : (
                    <li>Loading...</li>
                )}
            </div>
            <AdminBoutons jsonData={jsonData} newANotif={aNotif} />
        </>
    );
};