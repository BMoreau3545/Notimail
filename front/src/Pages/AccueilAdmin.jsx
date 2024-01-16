import { useState, useEffect } from "react";
import { CardEntreprise } from "../Composants/CardEntreprise";
import { NavBar } from "../Composants/Navbar";
import { SearchBar } from "../Composants/Searchbar";
import { AdminBoutons } from "../Composants/AdminBoutons";

export const AccueilAdmin = ({ loggedInFirmName, cardData }) => {


  return (
    <>
      <NavBar cardData={cardData} loggedInFirmName={loggedInFirmName}/>
      <SearchBar />
      <CardEntreprise />
    </>
  );
};