// Importation du module Express
const express = require('express');

// Création d'un routeur Express
const router = express.Router();

// Importation de la fonction de connexion depuis le contrôleur d'authentification
const { login } = require('../Controller/authController');

// Définition de la route POST '/login', qui appelle la fonction login du contrôleur d'authentification
router.post('/login', login);
router.post('/logout', authToken, logout);

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = router;