import React, { useState } from 'react';
import Loupe from '../assets/loupe.png';
import "../index.css";

export const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

   const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log('I SEARCH YOU : ', searchQuery);
  };

  return (
    <>
   
    <form id="search" onSubmit={handleSearchSubmit}>
    <div id="searchbar">
       <button id='loupe_button' type="submit"><img src={Loupe} id="loupe_img"></img></button>
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
