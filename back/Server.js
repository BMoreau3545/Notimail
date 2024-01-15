// Importation du module Express
const express = require('express');

// Importation des routes liées à l'utilisateur depuis le fichier userRoutes.js
const userRoutes = require('./routes/userRoutes');

// Importation de la connexion Sequelize depuis index.js
const db = require('./models/index');

// Création d'une instance de l'application Express
const app = express();

// Définition du port sur lequel le serveur écoutera les requêtes
const port = 3000;

// Utilisation de middleware pour permettre à Express de traiter les requêtes au format JSON
app.use(express.json());

app.use(cors());

// Utilisation de middleware pour permettre à Express de traiter les requêtes au format URL-encoded
app.use(express.urlencoded({ extended: true }));

// Vérification de la connexion à la base de données et synchronisation du modèle
db.sequelize.sync({force: true})
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
    return db.sequelize.authenticate();
  })
  .then(() => {
    console.log('Authentification à la base de données réussie.');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });

// Montage des routes pour les opérations CRUD liées à l'utilisateur sous le préfixe '/users'
app.use('/users', userRoutes);

// Mise en écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});