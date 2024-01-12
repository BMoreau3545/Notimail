// Importation du modèle User
const { Sequelize } = require('sequelize');
const sequelize = require('./sequelize');
const User = require('./models/User');


// Synchronisation du modèle avec la base de données
sequelize.sync().then(() => {
  console.log('Structure de la table synchronisée avec la base de données.');
}).catch(error => {
  console.error('Erreur lors de la synchronisation avec la base de données:', error);
});