const express = require('express');
const router = express.Router();
const UserController = require('../Controller/userController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(express.json());

// Routes pour les opérations CRUD d'administration sur les utilisateurs
router.post('/create_user', authMiddleware.authenticateAdmin, UserController.createUser);
router.put('/hashPassword', authMiddleware.authenticateAdmin, UserController.hashPassword);
router.put('/update_user', authMiddleware.authenticateAdmin, UserController.updateUser);
router.delete('/delete_user/:firm_name', authMiddleware.authenticateAdmin, UserController.deleteUser);
router.get('/get_user/:firm_name', authMiddleware.authenticateUser, UserController.getUserByFirmName);
router.get('/get_all_users', UserController.getAllUsers);
router.get('/get_all_firm_name', UserController.getAllFirmName);
router.post('/notify', authMiddleware.authenticateAdmin, UserController.has_mail);
router.put('/recup_mail', authMiddleware.authenticateUser, UserController.recupCourrier);
router.put('/update_user_role', authMiddleware.authenticateAdmin, UserController.updateUserRole);

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = router;


// // Importation du module Express
// const express = require('express');

// // Création d'un routeur Express
// const router = express.Router();

// // Importation du contrôleur d'utilisateurs
// const UserController = require('../Controller/userController');

// // Routes pour les opérations CRUD d'administration sur les utilisateurs
// router.post('/create_user', UserController.createUser);   // Route pour créer un nouvel utilisateur
// router.put('/hashPassword', UserController.hashPassword); // Route pour
// router.put('/update_user', UserController.updateUser);    // Route pour mettre à jour un utilisateur existant
// router.delete('/delete_user/:firm_name', UserController.deleteUser);  // Route pour supprimer un utilisateur par le nom de la société
// router.get('/get_user/:firm_name', UserController.getUserByFirmName);  // Route pour récupérer un utilisateur par le nom de la société
// router.get('/get_all_users', UserController.getAllUsers);   // Route pour récupérer tous les utilisateurs
// router.get('/get_all_firm_name', UserController.getAllFirmName);
// router.post('/notify', UserController.has_mail);
// router.put('/recup_mail', UserController.recupCourrier);
// router.put('/update_user_role', UserController.updateUserRole);

// // Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
// module.exports = router;
