import { useState, useEffect } from "react";
import { CardEntreprise } from "../Composants/CardEntreprise";
import { NavBar } from "../Composants/Navbar";
import { AdminBoutons } from "../Composants/AdminBoutons";

export const AccueilAdmin = ({ jsonData }) => {


  return (
    <>
      <NavBar/>
      <CardEntreprise />
    </>
  );
};