// Importation du module Express pour créer des routes
const express = require('express');

// Création d'un routeur Express pour définir les routes de cette partie de l'application
const router = express.Router();

const clientController = require('../Controller/clientController');

// Importation du middleware d'authentification qui sera utilisé pour certaines routes
const authMiddleware = require('../middleware/authMiddleware');

// Utilisation du middleware pour permettre à Express de parser les requêtes au format JSON
router.use(express.json());

// Récupération du courrier par un utilisateur authentifié
router.put('/recup_mail', authMiddleware.authenticateUser, clientController.recupMail);

router.get('/get_user_has_mail/:firm_name', authMiddleware.authenticateUser, clientController.getHasMailByFirmName)

module.exports = router;