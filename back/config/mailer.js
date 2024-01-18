require('dotenv').config({
  path: '../.env',  // Chemin spécifié pour le fichier .env
});
const nodemailer = require('nodemailer')

// Simulation de l'envoi de courrier électronique pour chaque utilisateur
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ADMIN_MAIL,
      pass: process.env.CLE_MAIL,
    },
    
  });

  module.exports = transporter;