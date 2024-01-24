// userRoutes.js
// Importation du module Express pour créer des routes
const express = require('express');

// Création d'un routeur Express pour définir les routes de cette partie de l'application
const router = express.Router();

// Importation du contrôleur des utilisateurs qui gère la logique métier liée aux utilisateurs 
// et implémente les différentes fonctions
const UserController = require('../Controller/userController');

// Importation du middleware d'authentification qui sera utilisé pour certaines routes
const authMiddleware = require('../middleware/authMiddleware');


// Utilisation du middleware pour permettre à Express de parser les requêtes au format JSON
router.use(express.json());

// Routes pour les opérations CRUD d'administration sur les utilisateurs
// Chaque route est associée à une fonction spécifique du UserController

// Création d'un nouvel utilisateur, accessible uniquement par un administrateur authentifié
router.post('/create_user', authMiddleware.authenticateAdmin, UserController.createUser);

// Mise à jour des informations d'un utilisateur, accessible uniquement par un administrateur authentifié
router.put('/update_user/:firm_name', authMiddleware.authenticateAdmin, UserController.updateUser);

// Suppression d'un utilisateur par son nom de société, accessible uniquement par un administrateur authentifié
router.delete('/delete_user/:firm_name', authMiddleware.authenticateAdmin, UserController.deleteUser);

// Obtention des informations d'un utilisateur par son nom de société, accessible uniquement par un utilisateur authentifié
router.get('/get_user/:firm_name', authMiddleware.authenticateAdmin, authMiddleware.authenticateUser, UserController.getUserByFirmName);

// Obtention de la liste de tous les utilisateurs
router.get('/get_all_users', UserController.getAllUsers);

// Obtention de la liste de tous les noms de société
router.get('/get_all_firm_name', UserController.getAllFirmName);

// Notification de tous les utilisateurs par un administrateur authentifié par envoi d un mail à chaque utilisateur
router.put('/notify', authMiddleware.authenticateAdmin, UserController.has_mail);

// Nouvelle route pour l'initialisation de l'utilisateur admin
router.post('/init_admin_user', UserController.initAdminUser);

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = router;


