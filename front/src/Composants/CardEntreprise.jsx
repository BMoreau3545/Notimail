import "../adminPanel.css";
import { FaRegEdit } from "react-icons/fa";
import React, { useState, useEffect } from 'react';

export const CardEntreprise = () => {
    const [jsonData, setJsonData] = useState([]);
    const [isOpenArray, setIsOpenArray] = useState([]);

    useEffect(() => {
        fetch('../json')
            .then((res) => res.json())
            .then((data) => {
                setJsonData(data);
                setIsOpenArray(new Array(data.users.length).fill(false));
            })
            .catch((err) => console.error(err));
    }, []);

    const toggleDropdown = (index) => {
        const newArray = [...isOpenArray];
        newArray[index] = !newArray[index];
        setIsOpenArray(newArray);
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
                                        <input type="checkbox" className="checkbox"></input>
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
        </>
    );
};