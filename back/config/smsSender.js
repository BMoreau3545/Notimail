// smsSender.js
// Cofiguration de l'API AllMySMS via Axios

const axios = require('axios'); // Importation du module Axios, qui est une bibliothèque HTTP permettant d'effectuer des requêtes HTTP vers AllMySMS.

const sendSMS = async (formattedPhoneNumber, message) => {
  try {
    
    console.log(formattedPhoneNumber);
    // Définition des options nécessaires pour effectuer une requête POST vers l'API AllMySMS
    const smsOptions = {
      method: 'POST',
      url: 'https://api.allmysms.com/sms/send',
      headers: {
        'cache-control': 'no-cache',
        'Authorization': `Basic ${process.env.CLE_SMS}`, // Remplacez par votre auth token
        'Content-Type': 'application/json',
      },
      data: {
        from: 'allmysms',
        to: formattedPhoneNumber,
        text: message,
      },
    };

    // Stockage de la réponse à la requête HTTP envoyer avec Axios vers l'API SMS en utilisant les options définies précédemment
    const smsResponse = await axios(smsOptions); // Axios est une bibliothèque Javascript utilisée pour effectuer des requêtes HTTP depuis un navigateur ou Node.js

    if (smsResponse.data.success) { // Vérification du champ success dans la réponse de l'API SMS
      return true; // Si true, l'envoi du SMS a réussi
    } else { // Si false, une erreur est levé, indiquant les détails de l'échec de l'envoi du SMS
      throw new Error(`Erreur lors de l'envoi du SMS à ${formattedPhoneNumber}: ${smsResponse.data.message}`);
    }
  } catch (error) { // En cas d'erreur pendant le processus d'envoi du SMS
    console.error(error); // les détails de l'erreur sont affichés dans la console
    throw new Error(`Erreur lors de l'envoi du SMS: ${error.message}`); // Une nouvelle erreur est lancé avec un message descriptif
  }
};

// Exportation de la fonction sendSMS pour qu'elle puisse être utilisé dans d'autres parties du code ou de l'application
module.exports = {
  sendSMS,
};