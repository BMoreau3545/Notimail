/* eslint-disable react/prop-types */
import { CardEntreprise } from "../Composants/CardEntreprise";
import { NavBar } from "../Composants/Navbar";


export const AccueilAdmin = ({ loggedInFirmName }) => {

  return (
    <>
      <NavBar loggedInFirmName={loggedInFirmName}/>
      <CardEntreprise />
    </>
  );
};