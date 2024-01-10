// Importation du module Sequelize depuis la bibliothèque sequelize
const { Sequelize } = require('sequelize');

// Importation du module 'dotenv' pour charger les variables d'environnement depuis un fichier .env
require('dotenv').config({
    path: '../.env',  // Chemin spécifié pour le fichier .env
});

// Importation de la configuration Sequelize depuis le fichier config.js
const config = require('./config/config');

// Création d'une instance Sequelize en utilisant la configuration spécifiée dans config.development
const sequelize = new Sequelize(config.development);

// Exportation de l'instance Sequelize pour qu'elle puisse être utilisée dans d'autres parties de l'application
module.exports = sequelize;