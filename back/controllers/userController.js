const User = require('../models/User');
const bcrypt = require('bcrypt');

// Fonction pour créer un nouvel utilisateur
const createUser = async (req, res) => {
    try {
      const { firm_name, first_name, last_name, email, phone_number, password } = req.body;
  
      const existingUser = await User.findOne({ where: { firm_name } });
      if (existingUser) {
        return res.status(400).json({ message: 'Un utilisateur avec ce nom d\'entreprise existe déjà.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await User.create({
        firm_name,
        first_name,
        last_name,
        email,
        phone_number,
        password: hashedPassword,
      });
  
      res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur lors de la création de l\'utilisateur.' });
    }
  };

  // Fonction pour hacher le mot de passe
const hashPassword = async (req, res) => {
    try {
      const { firm_name, password } = req.body;
  
      const existingUser = await User.findOne({ where: { firm_name } });
      if (!existingUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await existingUser.update({ password: hashedPassword });
  
      res.json({ message: 'Mot de passe mis à jour avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du mot de passe.' });
    }
  };
  
  // Fonction pour mettre à jour un utilisateur existant
const updateUser = async (req, res) => {
    try {
      const { firm_name, first_name, last_name, email, phone_number } = req.body;
  
      const existingUser = await User.findOne({ where: { firm_name } });
      if (!existingUser) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      await existingUser.update({
        first_name: first_name || existingUser.first_name,
        last_name: last_name || existingUser.last_name,
        email: email || existingUser.email,
        phone_number: phone_number || existingUser.phone_number,
      });
  
      res.json({ message: 'Utilisateur mis à jour avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'utilisateur.' });
    }
  };

  // Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
      const { firm_name } = req.params;
  
      const userToDelete = await User.findOne({ where: { firm_name } });
      if (!userToDelete) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      await userToDelete.destroy();
  
      res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur.' });
    }
  };

  // Fonction pour obtenir un utilisateur par son nom d'entreprise
const getUserByFirmName = async (req, res) => {
    try {
      const { firm_name } = req.params;
  
      const user = await User.findOne({ where: { firm_name } });
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
  
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'utilisateur.' });
    }
  };

  // Fonction pour obtenir la liste de tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs.' });
    }
  };

  module.exports = {
    createUser,
    hashPassword,
    updateUser,
    deleteUser,
    getUserByFirmName,
    getAllUsers,
  };