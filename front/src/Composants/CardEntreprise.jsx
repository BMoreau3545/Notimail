import "../adminPanel.css";
import { FaRegEdit } from "react-icons/fa";
import React, { useState, useEffect } from 'react';
import { AdminBoutons } from "./AdminBoutons";

export const CardEntreprise = () => {
    const [cardData, setCardData] = useState([]);
    const [isOpenArray, setIsOpenArray] = useState([]);
    const [aNotif, setANotif] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/users/get_all_users')
            .then((res) => res.json())
            .then((cardData) => {
                setCardData(cardData);
                setIsOpenArray(new Array(cardData.length).fill(false));
                setANotif(new Array(cardData.length).fill(false));
            })
            .catch((err) => console.error(err));
    }, []);

    const toggleDropdown = (index) => {
        const newArray = [...isOpenArray];
        newArray[index] = !newArray[index];
        setIsOpenArray(newArray);
    };

    const Notifier = (index) => {
        const newANotif = [...aNotif];
        newANotif[index] = !newANotif[index];
        setANotif(newANotif);
        console.log(newANotif)
    };

    return (
        <>
            <div className="wrapper">
                {cardData && cardData ? (
                    console.log(cardData),
                    cardData.map((nom, index) => (
                        <div key={nom.firm_name}>
                            <section className={`cardPosition ${isOpenArray[index] ? 'openDropdown' : ''}`} onClick={() => toggleDropdown(index)}>
                                <div className="card openDefault">
                                    <div className="coordonees column">
                                        <h4 className="firm_name">{`${nom.firm_name}`}</h4>
                                        <p className="first_name">{`${nom.first_name}`}</p>
                                        <p className="received_mail">{`${nom.last_received_mail}`}</p>
                                    </div>
                                    <div className="column center">
                                        <label className="switch">
                                            <input
                                                type="checkbox"
                                                className="checkbox"
                                                checked={aNotif[index]}
                                                onChange={() => Notifier(index)}
                                            />
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
                                            <p className="pTexte">{`${nom.email}`}</p>
                                            <p className="pTexte">{`${nom.phone_number}`}</p>
                                            <p className="pTexte">{`${nom.password}`}</p>
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
            <AdminBoutons cardData={cardData} newANotif={aNotif} />
        </>
    );
};
