import { CardEntreprise } from "../Composants/CardEntreprise";
import { NavBar } from "../Composants/Navbar";


export const AccueilAdmin = ({ loggedInFirmName, cardData}) => {

  return (
    <>
      <NavBar cardData={cardData} loggedInFirmName={loggedInFirmName}/>
      <CardEntreprise />
    </>
  );
};