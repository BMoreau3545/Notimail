const express = require('express');
const sequelize = require('./models/User.js');  // Assurez-vous que le chemin est correct
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vérifiez la connexion à la base de données et synchronisez le modèle
sequelize.authenticate()
  .then(() => {
    console.log('Connexion à la base de données établie avec succès.');
    return sequelize.sync(); // Cela créera les tables s'il n'existe pas
  })
  .then(() => {
    console.log('Tables synchronisées avec succès.');
  })
  .catch(err => {
    console.error('Erreur de connexion à la base de données :', err);
  });


// Montez les routes pour les opérations CRUD liées à l'utilisateur
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});