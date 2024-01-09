const express = require('express');
const { Pool } = require('pg');
require('dotenv').config({
  path: '../.env',
});

const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: '',
  port: 5432,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Montez les routes pour les opérations CRUD liées à l'utilisateur
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});