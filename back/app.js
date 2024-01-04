const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'postgres',
  password: '',
  port: 5432,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Définissez vos routes ici
app.get('/users', async (req, res) => {
    try {
      const users = await pool.query('SELECT * FROM public."Users"');
      res.json(users.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});