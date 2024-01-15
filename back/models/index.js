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
/*
console.log('Instance Sequelize créée');

// Testez la connexion à la base de données
async function testDatabaseConnection() {
    try {
        // Testez la connexion à la base de données en exécutant une requête simple
        await sequelize.authenticate();
        console.log('Connexion à la base de données établie avec succès');
        await createDatabaseStructure(); 
        // Si vous voulez effectuer d'autres tests ou opérations liées à la base de données, vous pouvez les ajouter ici.

    } catch (error) {
        console.error('Erreur lors de la connexion à la base de données', error);
    } finally {
        // N'oubliez pas de fermer la connexion après le test si nécessaire
        await sequelize.close();
  }
}

testDatabaseConnection();

async function createDatabaseStructure() {
    try {
      await sequelize.sync({force: true});
      console.log('Base de données synchronisée avec succès');
      await User.create ({
        "firm_name": "Entreprise8",
      "first_name": "Contact8",
      "last_name": "Nom8",
      "email": "contact8@example.com",
      "phone_number": "6667778888",
      "password": "motDePasse8",
      "last_received_mail": "2023-12-27T11:40:00Z",
      "last_picked_up": "2023-12-27T11:40:00Z",
      "has_mail": false,
      "is_admin": false
      })
    } catch (error) {
      console.error('Erreur lors de la synchronisation de la base de données', error);
    }
}
*/
//module.exports = sequelize;
