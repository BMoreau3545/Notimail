import React, { useState } from 'react';
import Loupe from '../assets/loupe.png';
import "../index.css";

export const SearchBar = ({ dataFirmName, onSearchResultChange }) => {
  //
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResult, setSearchResult] = useState('');

  //fonction de recuperartion de la valeur entrer dans le champs recherche lors d'un changement
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  //fonction de recherche
  const handleSearchSubmit = (event) => {
    //retrait du comprtement par defaut du submit qui est de recharger la page
    event.preventDefault();
    //test
    console.log('I SEARCH YOU : ', searchQuery);

    //constante avec les resultats filtrées 
    const SearchFirm = dataFirmName.filter((firm_name) =>
      firm_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    //mise a jour de l'etat de SearchResult
    setSearchResult(SearchFirm);

    if (onSearchResultChange) {
      onSearchResultChange(SearchFirm);
    }
  };

  return (
    <>
      <form id="search" onSubmit={handleSearchSubmit}>
        <div id="searchbar">
          <button id='loupe_button' type="submit">
            <img src={Loupe} id="loupe_img" alt="loupe" />
          </button>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Rechercher"
            id='recherche'
          />
        </div>
      </form>
    </>
  );
};
