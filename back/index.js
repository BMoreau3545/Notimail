const { Sequelize } = require('sequelize');
require('dotenv').config({
    path: '../../.env',
});
const config = require('../config/config');

// Création d'une instance Sequelize en spécifiant les informations de connexion à la base de données
const sequelize = new Sequelize(config.development);

module.exports = sequelize;