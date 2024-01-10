import { useState, useEffect } from "react";
import { CardEntreprise } from "../Composants/CardEntreprise";
import { NavBar } from "../Composants/Navbar";
import { AdminBoutons } from "../Composants/AdminBoutons";

export const AccueilAdmin = () => {
  const [jsonData, setJsonData] = useState([]);

  useEffect(() => {
    fetch('../json')
      .then((res) => res.json())
      .then((data) => {
        setJsonData(data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <NavBar/>
      <CardEntreprise/>
      < AdminBoutons />
    </>
  );
};
