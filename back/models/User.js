//User.js
module.exports = (sequelize, Sequelize) => {
  // Définition du modèle User représentant la table 'Users' dans la base de données
  const User = sequelize.define('Users', {
    // Définition des colonnes de la table 'users' avec leurs types et contraintes
    firm_name: {
      type: Sequelize.DataTypes.STRING(25), // Type de données STRING avec une limite de 25 caractères
      allowNull: false, // La valeur ne peut pas être nulle
      primaryKey: true // Clé primaire de la table
    },
    first_name: {
      type: Sequelize.DataTypes.STRING(25) // Type de données STRING avec une limite de 25 caractères
    },
    last_name: {
      type: Sequelize.DataTypes.STRING(25) // Type de données STRING avec une limite de 25 caractères
    },
    email: {
      type: Sequelize.DataTypes.STRING(50), // Type de données STRING avec une limite de 50 caractères
      allowNull: false // La valeur ne peut pas être nulle
    },
    phone_number: {
      type: Sequelize.DataTypes.STRING(25), // Type de données STRING avec une limite de 25 caractères
      allowNull: false // La valeur ne peut pas être nulle
    },
    password: {
      type: Sequelize.DataTypes.STRING(100), // Type de données STRING avec une limite de 100 caractères
      allowNull: false // La valeur ne peut pas être nulle
    },
    last_received_mail: {
      type: Sequelize.DataTypes.DATE // Type de données TIMESTAMP pour représenter les dates et heures
    },
    last_picked_up: {
      type: Sequelize.DataTypes.DATE, // Type de données TIMESTAMP pour représenter les dates et heures
      allowNull: false, // La valeur ne peut pas être nulle
      defaultValue: new Date()// sequelize.literal('CURRENT_TIMESTAMP') // Valeur par défaut à la date et heure actuelles
    },
    has_mail: {
      type: Sequelize.DataTypes.BOOLEAN, // Type de données BOOLEAN pour représenter les valeurs true/false
      defaultValue: false // Valeur par défaut à false
    },
    is_admin: {
      type: Sequelize.DataTypes.BOOLEAN, // Type de données BOOLEAN pour représenter les valeurs true/false
      defaultValue: false // Valeur par défaut à false
    },
  });
  // Ligne servant à exporter le modèle User
  return User;
}