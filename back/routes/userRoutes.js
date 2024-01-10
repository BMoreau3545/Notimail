// Importation du module Express
const express = require('express');

// Création d'un routeur Express
const router = express.Router();

// Importation du contrôleur d'utilisateurs
const UserController = require('../Controller/userController');

// Routes pour les opérations CRUD d'administration sur les utilisateurs
router.post('/create_user', UserController.createUser);   // Route pour créer un nouvel utilisateur
router.put('/hashPassword', UserController.hashPassword); // Route pour
router.put('/update_user', UserController.updateUser);    // Route pour mettre à jour un utilisateur existant
// router.patch('/update_users', UserController.updateUsers)  // Commenté : route pour mettre à jour plusieurs utilisateurs
router.delete('/delete_user/:firm_name', UserController.deleteUser);  // Route pour supprimer un utilisateur par le nom de la société
router.get('/get_user/:firm_name', UserController.getUserByFirmName);  // Route pour récupérer un utilisateur par le nom de la société
router.get('/get_all_users', UserController.getAllUsers);   // Route pour récupérer tous les utilisateurs
router.post('/notify', UserController.has_mail);

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = router;
