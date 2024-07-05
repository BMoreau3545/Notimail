//index.js configuer et initialise Sequelize
// Importation du module 'dotenv' pour charger les variables d'environnement depuis un fichier .env
require('dotenv').config({
    path: './.env',  // Chemin spécifié pour le fichier .env
});

// Importation du module Sequelize depuis la bibliothèque sequelize
// Sequelize est une classe qu'on extrait du module et que l'on stocke dans une variable du meme nom
const { Sequelize } = require('sequelize');

// Importation de la configuration Sequelize depuis le fichier config.js
// Correspond au module exporté par config
const config = require('../config/config');

console.log('Configuration Sequelize:', config.development);
// Création d'une instance Sequelize en utilisant la configuration spécifiée dans config.development
const sequelize = new Sequelize(config.development);
// on fait la configuration qu on stocke dans l'objet db
const db = {
  Sequelize: Sequelize,
  sequelize: sequelize
}
// Création de la propriété User dans la configuration db afin de créer la table à l'aide du model User
// sequelize représente la connexion a la base de donnees
// Sequelize est la classe Sequelize elle-même
db.User = require("./User")(sequelize, Sequelize);

//On exporte la configuration sequelize via db afin de le réutiliser
module.exports = db;

