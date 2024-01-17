// Importation du module Express
const express = require('express');
const cookieParser = require('cookie-parser')
// Création d'un routeur Express
const router = express.Router();

// Importation de la fonction de connexion depuis le contrôleur d'authentification
const { login, logout } = require('../Controller/authController');
router.use(express.json());
// Définition de la route POST '/login', qui appelle la fonction login du contrôleur d'authentification
router.post('/login', login);
router.post('/logout', logout);

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = router;