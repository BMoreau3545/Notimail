require('dotenv').config({ // Utilisation du package dotenv pour charger les variables d'encironnement à partir d'un fichier spécifié
  path: '../.env',  // Chemin spécifié pour le fichier .env
});

const nodemailer = require('nodemailer') // importation de la biblitohèque nodemailer qui permet l'envoi d'emails

// Création d'un transporteur Nodemailer avec gmail comme service d'emails
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { // Cet objet auth contient l'utilisateur(adresse email) et le mot de passe(spécifique à l'application) pour l'authentification.
      user: process.env.ADMIN_MAIL, // Adresse email depuis laquelle on souhaite envoyer des emails
      pass: process.env.CLE_MAIL, // Mot de passe spécifique à l'application généré pour le compte gmail
      // Ces valeurs sont chargées à partir des variables d'environnement
    },
    
  });

  module.exports = transporter; // Exportation du transporteur pour être utilisé dans d'autres parties de l'application