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
router.get('/get_all_users', authMiddleware.authenticateAdmin, UserController.getAllUsers);
router.get('/get_all_firm_name', authMiddleware.authenticateAdmin, UserController.getAllFirmName);
router.post('/notify', authMiddleware.authenticateAdmin, UserController.has_mail);
router.put('/recup_mail', authMiddleware.authenticateUser, UserController.recupCourrier);
router.put('/update_user_role', authMiddleware.authenticateAdmin, UserController.updateUserRole);

// Exportation du routeur pour qu'il puisse être utilisé dans d'autres parties de l'application
module.exports = router;
