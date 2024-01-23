//server.js

// Importation du module Express
const express = require('express');

// Configuration des options pour gérer les requêtes CORS
const corsOptions = {
  allowHeaders: ['authorization'],
  origin: '*',
}

// Importation des modules de routes pour l'admin, l'authentification et les clients
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const clientRoutes = require('./routes/clientRoutes');

// Importation de la connexion Sequelize depuis index.js
const db = require('./models/index');

// Création d'une instance de l'application Express
const app = express();

// Définition du port sur lequel le serveur écoutera les requêtes
const port = 3000;

// Importation du middleware CORS
const cors = require('cors');

// Configuration des middlewares pour permettre à Express de traiter les requêtes JSON, gérer CORS et traiter les requêtes url-encoded
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));

// Vérification de la connexion à la base de données et synchronisation du modèle
db.sequelize.sync({force: false})
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

// Montage des routes pour les opérations CRUD liées à l'utilisateur sous le préfixe '/users', '/auth', '/client'.
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/client', clientRoutes);

// Mise en écoute du serveur sur le port spécifié
app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
