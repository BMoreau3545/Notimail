import React, { useState, useEffect } from 'react';
import Mailto from '../assets/LogoNotimail.png';
import { FaArrowLeftLong } from "react-icons/fa6";
import '../index.css';
import { NavLink, useParams } from 'react-router-dom';


export const EditForm = () => {
    const { firm_name: firmNameParam } = useParams();
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        firm_name: '',
        first_name: '',
        last_name: '',
        phone_number: '',
        email: '',
        password: '',
        isAdmin: false,
    });

    // Fetch company details on component mount
    useEffect(() => {
        fetch(`http://localhost:3000/users/get_user/${firmNameParam}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((companyDetails) => {
                console.log('test', companyDetails.is_admin)
                setFormData({
                    firm_name: companyDetails.firm_name,
                    first_name: companyDetails.first_name,
                    last_name: companyDetails.last_name,
                    phone_number: companyDetails.phone_number,
                    email: companyDetails.email,
                    password: companyDetails.password,
                    isAdmin: companyDetails.is_admin,
                });
            })
            .catch((err) => console.error(err));
    }, [firmNameParam, token]);

    const handleDeleteFirm = () => {
        const firmName = firmNameParam;

        if (!firmName) {
            console.error("Nom de l'entreprise manquant");
            return;
        }

        fetch(`http://localhost:3000/users/delete_user/${firmName}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    console.error('Erreur lors de la suppression de l\'entreprise');
                    return;
                }
                console.log('Entreprise supprimée avec succès');
            })
            .catch((error) => {
                console.error('Erreur lors de la suppression de l\'entreprise:', error);
            });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
                console.log('form' , formData);
                console.log('firm' , firmNameParam);
            const response = await fetch(`http://localhost:3000/users/update_user/${firmNameParam}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
    
            console.log('Response status:', response.status);
    
            if (!response.ok) {
                console.error('Erreur lors de la mise à jour de l\'entreprise');
                return;
            }
    
            console.log('Entreprise mise à jour avec succès');
            props.history.push(`/company/${firmNameParam}`);
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'entreprise:', error);
        }
    };

    // Supprimez la fonction EditEntreprise si elle n'est pas nécessaire

    useEffect(() => {
        fetch(`http://localhost:3000/users/get_user/${firmNameParam}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((firmNameParam) => {
                console.log(firmNameParam);
            })
            .catch((err) => console.error(err));
    }, [firmNameParam]);

    return (
        <>
            <section className='SectionForm'>
                <img src={Mailto} id='NotimailLogo' alt="Logo du site" />
                <div className='row align'>
                    <NavLink to="/admin">
                        <button className='backBtn'>
                            <FaArrowLeftLong style={{ fontSize: '2rem', color: '#FFFF' }} />
                        </button>
                    </NavLink>
                    <h2 className='NameEntr'>Entreprise</h2>
                </div>
                <form className='Formulaire' onSubmit={handleSubmit}>
                    <div className='row spaceBeetw'>
                        <label htmlFor="entreprise">Entreprise:</label>
                        <input
                            className='inputForm'
                            type="text"
                            id="entreprise"
                            name="firm_name"
                            value={formData.firm_name}
                            onChange={(e) => setFormData({ ...formData, firm_name: e.target.value })}
                        />
                    </div>
                    <div className='row spaceBeetw'>
                        <label htmlFor="contactNom">Contact:</label>
                        <div className='column'>
                            <input
                                className='inputForm'
                                type="text"
                                id="contactNom"
                                name="first_name"
                                placeholder='Nom'
                                value={formData.first_name}
                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                            />
                            <input
                                className='inputForm'
                                type="text"
                                id="contactPrenom"
                                name="last_name"
                                placeholder='Prénom'
                                value={formData.last_name}
                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className='row spaceBeetw'>
                        <label htmlFor="tel">Téléphone:</label>
                        <input
                            className='inputForm'
                            type="tel"
                            id="tel"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
                        />
                    </div>

                    <div className='row spaceBeetw'>
                        <label htmlFor="email">Email:</label>
                        <input
                            className='inputForm'
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                    </div>

                    <div className='row spaceBeetw'>
                        <label htmlFor="identifiant">Identifiant:</label>
                        <input
                            className='inputForm'
                            type="text"
                            id="identifiant"
                            name="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                    </div>

                    <div className='row'>
                        <label htmlFor="isAdmin">Admin:</label>
                        <input
                            className='inputForm'
                            type="checkbox"
                            id="isAdmin"
                            name="isAdmin"
                            checked={formData.isAdmin}
                            onChange={(e) => setFormData({ ...formData, isAdmin: e.target.checked })}
                        />
                    </div>
                    <div className='row'>
                        <div className='row'>
                            <button onClick={handleDeleteFirm} type="button" className='deleteBtn'>Supprimer</button>
                            <button type="submit" className='submitForm'>Modifier</button>
                        </div>
                    </div>
                </form>
            </section>
        </>
    );
};
