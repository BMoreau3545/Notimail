import { useState, useEffect } from 'react';
import { AdminBoutons } from "./AdminBoutons";
import { SearchBar } from "./Searchbar";
import { FaRegEdit } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "../adminPanel.css";

export const CardEntreprise = () => {
  // État pour stocker les données des cartes
  const [cardData, setCardData] = useState([]);
  // État pour gérer l'ouverture et la fermeture des dropdowns
  const [isOpenArray, setIsOpenArray] = useState([]);
  // État pour gérer les notifications activées ou désactivées
  const [aNotif, setANotif] = useState([]);
  // État pour stocker les résultats de recherche
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    // Récupération des données utilisateur à partir de l'API lorsque le composant est monté
    fetch('http://localhost:3000/users/get_all_users')
      .then((res) => res.json())
      .then((cardData) => {
        // Mise à jour des états avec les données récupérées
        setCardData(cardData);
        // Initialisation des états des dropdowns et des notifications avec des valeurs par défaut
        setIsOpenArray(new Array(cardData.length).fill(false));
        setANotif(new Array(cardData.length).fill(false));
        // Affiche toutes les entreprises par défaut dans les résultats de recherche
        setSearchResult(cardData.map((nom) => nom.firm_name));
      })
      .catch((err) => console.error(err));
  }, []);

  // Fonction pour basculer l'état des dropdowns
  const toggleDropdown = (index) => {
    const newArray = [...isOpenArray];
    newArray[index] = !newArray[index]; // Inverse l'état de l'élément spécifié
    setIsOpenArray(newArray); // Met à jour l'état avec le nouveau tableau
  };

  // Fonction pour basculer l'état des notifications
  const Notifier = (index) => {
    const newANotif = [...aNotif];
    newANotif[index] = !newANotif[index]; // Inverse l'état de la notification pour l'élément spécifié
    setANotif(newANotif); // Met à jour l'état avec le nouveau tableau
    console.log(newANotif); // Affiche l'état actuel des notifications dans la console
  };

  // Fonction pour gérer les changements des résultats de recherche
  const handleSearchResultChange = (result) => {
    setSearchResult(result); // Met à jour les résultats de recherche avec les résultats passés en paramètre
    setIsOpenArray(new Array(result.length).fill(false)); // Réinitialise l'état d'ouverture des dropdowns pour les résultats de recherche
  };

  // Fonction pour formater la date et l'heure de réception des mails
  const fonctDate = (nom) => {
    const date = new Date(nom.last_received_mail);
    const jour = date.getDate();
    const mois = date.getMonth() + 1; // Le mois commence à 0, +1 pour ajuster à la numérotation humaine
    const annee = date.getFullYear();
    const heures = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    // Retourne la date et l'heure formatées sous forme de chaîne
    return `${jour}/${mois}/${annee} ${heures}:${minutes}:${seconds}`;
  };

  return (
    <>
      <div className="wrapper">
        <SearchBar 
          dataFirmName={cardData.map((nom) => nom.firm_name)} // Passe les noms des firmes comme données à la barre de recherche
          onSearchResultChange={handleSearchResultChange} // Définit la fonction à appeler lors des changements de résultats de recherche
        />
        {cardData && cardData.length > 0 ? (
          // Affiche les cartes des entreprises
          cardData.map((nom, index) => (
            <div key={nom.firm_name}>
              <section 
                className={`cardPosition ${isOpenArray[index] ? 'openDropdown openDefault' : ''}`} // Ajoute des classes dynamiques selon l'état d'ouverture du dropdown
                onClick={() => toggleDropdown(index)} // Définit la fonction à appeler lors du clic pour ouvrir/fermer le dropdown
              >
                <div 
                  className="card" 
                  style={{ display: searchResult.includes(nom.firm_name) ? 'flex' : 'none' }} // Affiche ou cache l'élément selon s'il est dans les résultats de recherche
                >
                  <div className="coordonees column">
                    <h4 className="firm_name">{nom.firm_name}</h4>
                    <p className="first_name">{`${nom.last_name} ${nom.first_name}`}</p>
                    <p className="received_mail">{fonctDate(nom)}</p>
                  </div>
                  <div className="column center">
                    <label className="switch">
                      <input
                        type="checkbox"
                        className="checkbox"
                        checked={aNotif[index]} // Définit l'état coché selon l'état de la notification
                        onChange={() => Notifier(index)} // Définit la fonction à appeler lors du changement d'état de la case à cocher
                      />
                      <div className="slider"></div>
                    </label>
                    <NavLink to={`/adminDetails/${nom.firm_name}`}>
                      <div className='edition-button'>
                        <FaRegEdit style={{ fontSize: '35px', color: '#025892' }} />
                      </div>
                    </NavLink>
                  </div>
                </div>
                {isOpenArray[index] && (
                  <div className="closeDefault">
                    <div className="adresse">
                      <p className="pTexte">Email : </p>
                      <p className="pTexte">Téléphone : </p>
                    </div>
                    <div className="column">
                      <p className="pTexte">{nom.email}</p>
                      <p className="pTexte">{nom.phone_number}</p>
                    </div>
                  </div>
                )}
              </section>
            </div>
          ))
        ) : (
          <li>Loading...</li> // Affiche un message de chargement si les données ne sont pas encore disponibles
        )}
      </div>
      <AdminBoutons cardData={cardData} newANotif={aNotif} /> {/* Composant pour les boutons d'administration */}
    </>
  );
};
