// Importation du module 'dotenv' pour charger les variables d'environnement depuis un fichier .env
require('dotenv').config({
    path: './.env',  // Chemin spécifié pour le fichier .env
});

// Importation du module Sequelize depuis la bibliothèque sequelize
const { Sequelize } = require('sequelize');

// Importation de la configuration Sequelize depuis le fichier config.js
const config = require('../config/config');

console.log('Configuration Sequelize:', config.development);
// Création d'une instance Sequelize en utilisant la configuration spécifiée dans config.development
const sequelize = new Sequelize(config.development);

const db = {
  Sequelize: Sequelize,
  sequelize: sequelize
}

db.User = require("./User")(sequelize, Sequelize);

module.exports = db;

