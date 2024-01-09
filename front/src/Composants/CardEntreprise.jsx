import "../adminPanel.css";
import { FaRegEdit } from "react-icons/fa";
import React, { useState, useEffect } from 'react';

export const CardEntreprise = () => {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
        fetch('../json')
            .then((res) => res.json())
            .then((data) => {
                setJsonData(data);
            })
            .catch((err) => console.error(err));
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <section className={`cardPosition ${isDropdownOpen ? 'openDropdown' : ''}`} onClick={toggleDropdown}>
                <div className="card openDefault">
                    <div className="coordonees column">

                        <h4 className="firm_name">Entreprise</h4>
                        <p className="first_name">Nom contact</p>
                        <p className="received_mail">Date</p>
                    </div>
                    <div className="column center">
                        <label className="switch">
                            <input type="checkbox" className="checkbox"></input>
                            <div className="slider"></div>
                        </label>
                        <FaRegEdit style={{ fontSize: '35px', color: '#025892' }} />
                    </div>
                </div>
                {isDropdownOpen && (
                    <div className="closeDefault">
                        <div className="adresse">
                            <p className="pTexte">Email : </p>
                            <p className="pTexte">Téléphone : </p>
                            <p className="pTexte">identifiant : </p>
                        </div>
                        <div className="column">
                            <p className="pTexte">adresse-email@exemple.com</p>
                            <p className="pTexte">+33601020304</p>
                            <p className="pTexte">1137</p>
                        </div>
                    </div>
                )}
            </section>
        </>
    );
};


