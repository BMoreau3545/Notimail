const db = require('../models/index');
const axios = require('axios');
const User = db.User;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

// Fonction pour créer un nouvel utilisateur
const createUser = async (req, res) => {
  console.log('createUser route reached');
  console.log('createUser', JSON.stringify(req.body), JSON.stringify(res.params));
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
    console.log("update :", req.body, req.params);
    try {
      const { firm_name, first_name, last_name, email, phone_number } = req.body;

       // Ajouter une vérification du rôle de l'utilisateur
       const loggedInUser = await User.findOne({ where: { is_admin: req.params.is_admin === 'true' } });

       if (!loggedInUser.is_admin) {
           return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à effectuer cette opération.' });
       }
  
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
      console.log("ok");
  
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

// Fonction pour notifier plusieurs utilisateurs par courrier électronique et notification
const has_mail = async (req, res) => {
  try {
    const { firm_name } = req.body;

    const users = await User.findAll({ where: { firm_name } });
    if (!users || users.length === 0) {
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }

    // Filtrer les utilisateurs dont has_mail est false
    const usersToSendMail = users.filter(user => !user.has_mail);

    if (usersToSendMail.length === 0) {
      return res.status(200).json({ message: 'Aucun utilisateur à notifier.' });
    }

    // Simulation de l'envoi de courrier électronique pour chaque utilisateur
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'benjamin.moreau@institutsolacroup.com',
        pass: 'nfgg elep zmxg xwfp',
      },
    });
    
    const mailPromises = users.map(user => {
      const mailOptions = {
        from: 'benjamin.moreau@institutsolacroup.com',
        to: usersToSendMail.map(user => user.email).join(','), // Joindre les adresses e-mail avec une virgule
        subject: 'Nouveau courrier reçu',
        text: 'Vous avez du courrier. Consultez votre boîte aux lettres.',
      };

      return transporter.sendMail(mailOptions);
    });
    // Mettez à jour la propriété has_mail à true et last_received_mail à la date actuelle pour les utilisateurs notifiés
    const currentDate = new Date();
    // Mettez à jour la propriété has_mail à true pour les utilisateurs notifiés
    await Promise.all(usersToSendMail.map(user => user.update({ has_mail: true, last_received_mail: currentDate })));

     // Envoyer des SMS aux utilisateurs nonifiés
     const smsPromises = usersToSendMail.map(async user => {

      const formattedPhoneNumber = `+33${user.phone_number.slice(1)}`;

      // Ajoutez la logique d'envoi de SMS avec AllMySMS ici
      const smsOptions = {
        method: 'POST',
        url: 'https://api.allmysms.com/sms/send',
        headers: {
          'cache-control': 'no-cache',
          'Authorization': `Basic ${process.env.CLE_SMS}`, // Remplacez par votre auth token
          'Content-Type': 'application/json',
        },
        data: {
          from: 'allmysms',
          to: formattedPhoneNumber,
          text: 'Vous avez du courrier à récupérer. Consultez votre boîte aux lettres.',
          // Ajoutez d'autres paramètres si nécessaire, comme la date
        },
      };

      const smsResponse = await axios(smsOptions);

      if (smsResponse.data.success) {
        // Mettez à jour la propriété has_mail à true pour les utilisateurs notifiés
        await user.update({ has_mail: true, last_received_mail: new Date() });
      }
    });

    // Attendre la résolution de toutes les promesses
    await Promise.all(smsPromises);


    res.json({ message: 'Utilisateurs notifiés avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la notification des utilisateurs.' });
  }
};

const recupCourrier = async (req, res) => {
  try {
    const { firm_name } = req.query;

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ where: { firm_name } });
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérification si l'utilisateur a déjà validé la récupération du courrier
    if (user.has_mail) {
      // Mise à jour des champs dans la base de données
      await user.update({
        has_mail: false, // has_mail devient false après la validation
        last_picked_up: new Date(), // Enregistrement de la date et de l'heure de la validation
      });

      

      res.json({ message: 'Récupération du courrier validée avec succès.' });
    } else {
      res.status(400).json({ message: 'Le courrier a déjà été récupéré ou n\'existe pas.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la validation de la récupération du courrier.' });
  }
};

const updateUserRole = async (req, res) => {
  try {
    const { firm_name, is_admin } = req.body;

    // Ajouter une vérification du rôle de l'utilisateur
    const loggedInUser = await User.findOne({ where: { is_admin: req.params.is_admin === 'true' } });

    if (!loggedInUser.is_admin) {
        return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à effectuer cette opération.' });
    }

    // Empêcher la modification du rôle si cela entraîne une absence d'administrateur
    if (is_admin) {
      const adminCount = await User.count({ where: { is_admin: true } });
      if (adminCount === 1) {
        return res.status(400).json({ message: 'Il doit toujours y avoir au moins un administrateur.' });
      }
    }

    const existingUser = await User.findOne({ where: { firm_name } });
    if (!existingUser) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    await existingUser.update({ is_admin });

    res.json({ message: 'Rôle utilisateur mis à jour avec succès.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du rôle utilisateur.' });
  }
};

// Fonction pour obtenir tous les noms d'entreprise de tous les utilisateurs
const getAllFirmName = async (req, res) => {
  try {
      const users = await User.findAll();
      const firmNames = users.map(user => user.firm_name);
      res.json(firmNames);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des noms d\'entreprise.' });
  }
};

// Exportation de la fonction
module.exports = {
  createUser,
  hashPassword,
  updateUser,
  deleteUser,
  getUserByFirmName,
  getAllUsers,
  has_mail, // Ajout de la fonction has_mail à l'exportation
  recupCourrier,
  updateUserRole,
  getAllFirmName,
};