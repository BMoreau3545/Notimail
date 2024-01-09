import { useState } from "react";
import { CardEntreprise } from "../Composants/CardEntreprise"
import { useEffect } from "react";


export const AccueilAdmin = () => {
    
 const [jsonData, setJsonData] = useState([]);

    useEffect(() => {
      fetch('../json') 
        .then((res) => res.json())
        .then((data) => {
           console.log(data)
          setJsonData(data);
        })
        .catch((err) => console.error(err));
    }, []);

    return (
        <>
            {<CardEntreprise />}
        </>)
}