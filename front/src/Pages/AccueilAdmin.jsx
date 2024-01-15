import { useState, useEffect } from "react";
import { CardEntreprise } from "../Composants/CardEntreprise";
import { NavBar } from "../Composants/Navbar";
import { SearchBar } from "../Composants/Searchbar";
import { AdminBoutons } from "../Composants/AdminBoutons";

export const AccueilAdmin = ({ loggedInFirmName, jsonData }) => {


  return (
    <>
      <NavBar jsonData={jsonData} loggedInFirmName={loggedInFirmName}/>
      <SearchBar />
      <CardEntreprise />
    </>
  );
};