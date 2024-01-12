// Importation du module 'dotenv' pour charger les variables d'environnement depuis un fichier .env
require('dotenv').config({
    path: './.env',  // Chemin spécifié pour le fichier .env
});

// Importation du module Sequelize depuis la bibliothèque sequelize
const { Sequelize } = require('sequelize');

// Importation de la configuration Sequelize depuis le fichier config.js
const config = require('./config/config');

console.log('Configuration Sequelize:', config.development);
// Création d'une instance Sequelize en utilisant la configuration spécifiée dans config.development
const sequelize = new Sequelize(config.development);

console.log('Instance Sequelize créée');

async function testDatabaseConnection() {
    try {
      await sequelize.authenticate();
      console.log('La connexion à la base de données a réussi.');
    } catch (error) {
      console.error('Erreur de connexion à la base de données:', error);
    } finally {
      // N'oubliez pas de fermer la connexion après le test si nécessaire
      // sequelize.close();
    }
  }
module.exports = sequelize;