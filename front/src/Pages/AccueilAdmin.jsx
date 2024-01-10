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
      {jsonData && jsonData.users ? (
        jsonData.users.map((user) => (
          <div key={user.email}>
            <CardEntreprise
              firmName={user.firm_name}
              firstName={user.first_name}
              lastName={user.last_name}
              email={user.email}
              lastReceivedMail={user.last_received_mail}
            />
            <p>
              {`${user.firm_name} - ${user.first_name} ${user.last_name} - Dernier mail reçu le ${user.last_received_mail}`}
            </p>
          </div>
        ))
      ) : (
        <li>Loading...</li>
      )}
      < AdminBoutons />
    </>
  );
};
