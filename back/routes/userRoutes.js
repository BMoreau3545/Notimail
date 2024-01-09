const express = require('express');
const router = express.Router();
const UserController = require('../Controller/userController');

// Routes pour les opérations CRUD d'administration
router.post('/create_user', UserController.createUser);
router.put('/update_user', UserController.updateUser);
// router.patch('/update_users', UserController.updateUsers)
router.delete('/delete_user/:firm_name', UserController.deleteUser);
router.get('/get_user/:firm_name', UserController.getUserByFirmName);
router.get('/get_all_users', UserController.getAllUsers);

module.exports = router;
