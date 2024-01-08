// Importation des modules Sequelize et DataTypes à partir du package 'sequelize'
const { Sequelize, DataTypes } = require('sequelize');

// Création d'une instance Sequelize en spécifiant les informations de connexion à la base de données
const sequelize = new Sequelize('NotimailDB', 'admin', '21323517', {
  host: 'localhost',  // L'hôte de la base de données
  dialect: 'postgres', // Le type de base de données, ici PostgreSQL
  port: 5432 // Le port sur lequel le serveur PostgreSQL écoute
});

// Définition du modèle User représentant la table 'users' dans la base de données
const User = sequelize.define('User', {
  // Définition des colonnes de la table 'users' avec leurs types et contraintes
  firm_name: {
    type: DataTypes.STRING(25), // Type de données STRING avec une limite de 25 caractères
    allowNull: false, // La valeur ne peut pas être nulle
    primaryKey: true // Clé primaire de la table
  },
  first_name: {
    type: DataTypes.STRING(25) // Type de données STRING avec une limite de 25 caractères
  },
  last_name: {
    type: DataTypes.STRING(25) // Type de données STRING avec une limite de 25 caractères
  },
  email: {
    type: DataTypes.STRING(50), // Type de données STRING avec une limite de 50 caractères
    allowNull: false // La valeur ne peut pas être nulle
  },
  phone_number: {
    type: DataTypes.STRING(25), // Type de données STRING avec une limite de 25 caractères
    allowNull: false // La valeur ne peut pas être nulle
  },
  password: {
    type: DataTypes.STRING(25) // Type de données STRING avec une limite de 25 caractères
  },
  last_received_mail: {
    type: DataTypes.TIMESTAMP // Type de données TIMESTAMP pour représenter les dates et heures
  },
  last_picked_up: {
    type: DataTypes.TIMESTAMP, // Type de données TIMESTAMP pour représenter les dates et heures
    allowNull: false, // La valeur ne peut pas être nulle
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP') // Valeur par défaut à la date et heure actuelles
  },
  has_mail: {
    type: DataTypes.BOOLEAN, // Type de données BOOLEAN pour représenter les valeurs true/false
    defaultValue: false // Valeur par défaut à false
  },
  is_admin: {
    type: DataTypes.BOOLEAN, // Type de données BOOLEAN pour représenter les valeurs true/false
    defaultValue: false // Valeur par défaut à false
  }
});

// Synchronisation du modèle avec la base de données
sequelize.sync();

// Exportation du modèle User pour qu'il puisse être utilisé dans d'autres fichiers
module.exports = User;