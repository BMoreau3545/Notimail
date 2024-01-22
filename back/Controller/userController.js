const db = require('../models/index');// Importation du module de base de données (sequelize) pour accéder aux modèles
const axios = require('axios'); // Importation du module axios pour effectuer des requêtes HTTP
const User = db.User; // Importation du modèle User à partir du module sequelize
const bcrypt = require('bcrypt'); // Importation du module bcrypt pour le hachage des mots de passe
const transporter= require('../config/mailer'); // Importation du module nodemailer pour l'envoi d'e-mails
const smsSender = require('../config/smsSender'); // Importation du module smsSender pour l'envoi de SMS
//console.log('createUser route reached'); // Affiche un message dans la console pour indiquer que la route createUser a été atteinte
//  console.log('createUser', JSON.stringify(req.body), JSON.stringify(res.params)); // Affiche les données de la requête et des paramètres dans la console
// Fonction pour créer un nouvel utilisateur
const createUser = async (req, res) => {

  // Fonction pour créer un nouvel utilisateur
  const createUser = async (req, res) => {
    console.log('createUser route reached');
    console.log('createUser', JSON.stringify(req.body), JSON.stringify(res.params));
  
    try {
      const { firm_name, first_name, last_name, email, phone_number } = req.body;
  
      // Utiliser la fonction generatePassword pour générer un mot de passe aléatoire
      const { clearPassword, hashedPassword } = await generatePassword();
  
      const newUser = await User.create({
        firm_name,
        first_name,
        last_name,
        email,
        phone_number,
        password: hashedPassword,
      });
  
      await transporter.sendMail({
        from: process.env.ADMIN_MAIL,
        to: newUser.email,
        subject: 'Votre mot de passe',
        text: `Votre mot de passe est ${clearPassword}`
      });
  
      res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur lors de la création de l\'utilisateur.' });
    }
  }
};

// Fonction pour créer un nouvel utilisateur qui est admin
const createAdmin = async (req, res) => {
  // Affichage d'un message dans la console indiquant que la route createAdmin a été atteinte
  console.log('createAdmin route reached');
  // Affichage des données de la requête et des paramètres dans la console
  console.log('createAdmin', JSON.stringify(req.body), JSON.stringify(res.params));

    try {
      // Extraction des données nécessaires de la requête
      const { firm_name, first_name, last_name, email, phone_number, password, is_admin } = req.body;
      
      // Recherche d'un utilisateur existant avec le même nom d'entreprise
      const existingUser = await User.findOne({ where: { firm_name } });
      // Vérification de l'existence de l'utilisateur
      if (existingUser) {
        // Si un utilisateur avec le même nom d'entreprise existe, renvoyer une erreur
        return res.status(400).json({ message: 'Un utilisateur avec ce nom d\'entreprise existe déjà.' });
      }
      
      // Hachage du mot de passe fourni
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Création d'un nouvel utilisateur avec les informations fournies avec is_admin à true
      await User.create({
        firm_name,
        first_name,
        last_name,
        email,
        phone_number,
        password: hashedPassword,
        is_admin: true,
      });
      // Réponse JSON indiquant que l'utilisateur a été créé avec succès
      res.status(201).json({ message: 'Utilisateur créé avec succès.' });
    } catch (error) {
      // En cas d'erreur pendant le processus, affichage de l'erreur dans la console
      console.error(error);
      // Réponse JSON en cas d'erreur serveur lors de la création de l'utilisateur
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
      // Extraction des données nécessaires de la requête
      const { generate_password } = req.body;
      const { firm_name } = req.params;
      let clearPassword;
      let hashedPassword;
      // Ajout d'une vérification du rôle de l'utilisateur
       if (!req.admin) {
          // Si l'utilisateur n'a pas le rôle d'administrateur, renvoyer une erreur 403
           return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à effectuer cette opération.' });
       }
       // Recherche de l'utilisateur existant dans la base de données
      const existingUser = await User.findOne({ where: { firm_name } });
      // Vérification de l'existence de l'utilisateur
      if (!existingUser) {
        // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
      // Génération d'un mot de passe si l'option generate_password est activée
      if(generate_password){
        // Appel de la fonction generatePassword pour obtenir un nouveau mot de passe
        const { clearPassword, hashedPassword } = await generatePassword();
        console.log(clearPassword);
        console.log(hashedPassword);
      }

      // Mise à jour des informations de l'utilisateur dans la base de données
      await existingUser.update({
        first_name: req.body.first_name ?? existingUser.first_name,
        last_name: req.body.last_name ?? existingUser.last_name,
        email: req.body.email ?? existingUser.email,
        phone_number: req.body.phone_number ?? existingUser.phone_number,
        password: hashedPassword ?? existingUser.password,
        is_admin: existingUser.isAdmin,
      });
      // Envoi du nouveau mot de passe par courrier électronique si l'option generate_password est activée
      if(generate_password){
        transporter.sendMail({
          from: process.env.ADMIN_MAIL,
          to: existingUser.email,
          subject: 'Votre mot de passse',
          text:`Votre mot de passe est ${clearPassword}`
        })
      }
      // Réponse JSON indiquant que l'utilisateur a été mis à jour avec succès
      res.json({ message: 'Utilisateur mis à jour avec succès.' });
    } catch (error) {
      // En cas d'erreur pendant le processus, affichage de l'erreur dans la console
      console.error(error);
       // Réponse JSON en cas d'erreur serveur lors de la mise à jour de l'utilisateur
      res.status(500).json({ message: 'Erreur serveur lors de la mise à jour de l\'utilisateur.' });
    }
  };

  // Fonction pour supprimer un utilisateur
const deleteUser = async (req, res) => {
    try {
      // Extraction du nom d'entreprise à partir des paramètres de la requête
      const { firm_name } = req.params;
      // Recherche de l'utilisateur à supprimer dans la base de données
      const userToDelete = await User.findOne({ where: { firm_name } });

      // Vérification de l'existence de l'utilisateur
      if (!userToDelete) {
        // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
      
      // Suppression de l'utilisateur de la base de données
      await userToDelete.destroy();

      // Réponse JSON indiquant que l'utilisateur a été supprimé avec succès
      res.json({ message: 'Utilisateur supprimé avec succès.' });
    } catch (error) {
      // En cas d'erreur pendant le processus, affichage de l'erreur dans la console
      console.error(error);
      // Réponse JSON en cas d'erreur serveur lors de la suppression de l'utilisateur
      res.status(500).json({ message: 'Erreur serveur lors de la suppression de l\'utilisateur.' });
    }
  };

  // Fonction pour obtenir un utilisateur par son nom d'entreprise
const getUserByFirmName = async (req, res) => {
    try {
      // Extraction du nom d'entreprise à partir des paramètres de la requête
      const { firm_name } = req.params;
      console.log("ok");
      
      // Recherche de l'utilisateur dans la base de données en fonction du nom d'entreprise
      const user = await User.findOne({ where: { firm_name } });

      // Vérification de l'existence de l'utilisateur
      if (!user) {
        // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
        return res.status(404).json({ message: 'Utilisateur non trouvé.' });
      }
      // Réponse JSON avec les détails de l'utilisateur
      res.json(user);
    } catch (error) {
      // En cas d'erreur pendant le processus, affichage de l'erreur dans la console
      console.error(error);
      // Réponse JSON en cas d'erreur serveur lors de la récupération de l'utilisateur
      res.status(500).json({ message: 'Erreur serveur lors de la récupération de l\'utilisateur.' });
    }
  };

  // Fonction pour obtenir la liste de tous les utilisateurs
const getAllUsers = async (req, res) => {
    try {
      // Recherche de tous les utilisateurs dans la base de données
      const users = await User.findAll();
      // Réponse JSON avec la liste des utilisateurs
      res.json(users);
    } catch (error) {
      // En cas d'erreur pendant le processus, affichage de l'erreur dans la console
      console.error(error);
      // Réponse JSON en cas d'erreur serveur lors de la récupération des utilisateurs
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des utilisateurs.' });
    }
  };

// Fonction pour notifier plusieurs utilisateurs par courrier électronique et notification
const has_mail = async (req, res) => {
  try {
    // Extraction du nom d'entreprise à partir du corps de la requête
    const { firm_name } = req.body;
    // Recherche de tous les utilisateurs dans la base de données avec le même nom d'entreprise
    const users = await User.findAll({ where: { firm_name } });
    // Vérification si des utilisateurs ont été trouvés
    if (!users || users.length === 0) {
      // Si aucun utilisateur n'est trouvé, renvoyer une erreur 404
      return res.status(404).json({ message: 'Aucun utilisateur trouvé.' });
    }

    // Filtrer les utilisateurs dont has_mail est false
    const usersToSendMail = users.filter(user => !user.has_mail);

    // Vérification si des utilisateurs doivent être notifiés
    if (usersToSendMail.length === 0) {
      // Si aucun utilisateur n'a besoin d'être notifié, renvoyer une réponse 200
      return res.status(200).json({ message: 'Aucun utilisateur à notifier.' });
    }

    // Configuration du courrier électronique une seule fois en utilisant le transporteur
    const mailOptions = {
      from: process.env.ADMIN_MAIL, // Adresse e-mail de l'expéditeur
      subject: 'Nouveau courrier reçu', // Sujet du courrier électronique
      text: 'Vous avez du courrier. Consultez votre boîte aux lettres.', // Corps du courrier électronique
    };

    // Configuration des destinataires en utilisant les adresses e-mail des utilisateurs à notifier
    mailOptions.to = usersToSendMail.map(user => user.email).join(',');

    // Envoi du courrier électronique en une seule fois avec tous les destinataires
    await transporter.sendMail(mailOptions);

    // Mettez à jour la propriété has_mail à true et last_received_mail à la date actuelle pour les utilisateurs notifiés
    const currentDate = new Date();
    // Mettez à jour la propriété has_mail à true pour les utilisateurs notifiés
    await Promise.all(usersToSendMail.map(user => user.update({ has_mail: true, last_received_mail: currentDate })));

    // Envoyer des SMS aux utilisateurs notifiés
    const smsPromises = usersToSendMail.map(async user => {
      // Formatage du numéro de téléphone pour l'envoi SMS
      const formattedPhoneNumber = `+33${user.phone_number.slice(1)}`;
      console.log("userController :", formattedPhoneNumber);
      try {
        // Appel de la fonction sensSMS du module smsSender
        await smsSender.sendSMS(formattedPhoneNumber, 'Vous avez du courrier à récupérer. Consultez votre boîte aux lettres.');
        // Mise à jour de la propriété has_mail à true et last_received_mail à la date actuelle pour les utilisateurs notifiés par SMS
        await user.update({ has_mail: true, last_received_mail: new DataTransfer() });
      } catch (error) {
        // Gestion des erreurs lors de l'envoi de SMS
        console.error(error.message);
      }
    });
    

    // Attendre la résolution de toutes les promesses
    await Promise.all(smsPromises);

    // Réponse JSON indiquant que les utilisateurs ont été notifiés avec succès
    res.json({ message: 'Utilisateurs notifiés avec succès.' });
  } catch (error) {
    // Gestion des erreurs générales de la fonction
    console.error(error);
    // Réponse JSON en cas d'erreur serveur lors de la notification des utilisateurs
    res.status(500).json({ message: 'Erreur serveur lors de la notification des utilisateurs.' });
  }
};

// Fonction asynchrone pour valider la récupération du courrier par un utilisateur
const recupCourrier = async (req, res) => {
  try {
    // Extraction du nom de l'entreprise à partir des paramètres de requête
    const { firm_name } = req.query;

    // Recherche de l'utilisateur dans la base de données en utilisant le nom de l'entreprise
    const user = await User.findOne({ where: { firm_name } });
    // Vérification si l'utilisateur a été trouvé
    if (!user) {
      // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

    // Vérification si l'utilisateur a déjà validé la récupération du courrier
    if (user.has_mail) {
      // Mise à jour des champs dans la base de données après validation de la récupération du courrier
      await user.update({
        has_mail: false, // has_mail devient false après la validation
        last_picked_up: new Date(), // Enregistrement de la date et de l'heure de la validation
      });

      
      // Réponse JSON indiquant que la récupération du courrier a été validée avec succès
      res.json({ message: 'Récupération du courrier validée avec succès.' });
    } else {
      // Si l'utilisateur n'a pas de courrier à récupérer, renvoyer une erreur 400
      res.status(400).json({ message: 'Le courrier a déjà été récupéré ou n\'existe pas.' });
    }
  } catch (error) {
    // Gestion des erreurs générales de la fonction
    console.error(error);
    // Réponse JSON en cas d'erreur serveur lors de la validation de la récupération du courrier
    res.status(500).json({ message: 'Erreur serveur lors de la validation de la récupération du courrier.' });
  }
};
// Fonction asynchrone pour mettre à jour le rôle d'un utilisateur
const updateUserRole = async (req, res) => {
  try {
    // Extraction des données de la requête, y compris le nom de l'entreprise (firm_name) et le nouveau rôle administrateur (is_admin)
    const { firm_name, is_admin } = req.body;

    // Recherche de l'utilisateur actuellement connecté dans la base de données en utilisant le rôle administrateur de la requête
    const loggedInUser = await User.findOne({ where: { is_admin: req.params.is_admin === 'true' } });

    // Vérification si l'utilisateur actuellement connecté a le rôle administrateur
    if (!loggedInUser.is_admin) {
      // Si l'utilisateur actuellement connecté n'a pas le rôle administrateur, renvoyer une erreur 403
        return res.status(403).json({ message: 'Vous n\'êtes pas autorisé à effectuer cette opération.' });
    }

    // Empêcher la modification du rôle si cela entraîne une absence d'administrateur
    if (is_admin) {
      // Compter le nombre d'utilisateurs ayant le rôle administrateur dans la base de données
      const adminCount = await User.count({ where: { is_admin: true } });

      // Vérification si la modification du rôle entraînerait une absence d'administrateur
      if (adminCount === 1) {
        // Si la modification entraîne une absence d'administrateur, renvoyer une erreur 400
        return res.status(400).json({ message: 'Il doit toujours y avoir au moins un administrateur.' });
      }
    }

    // Recherche de l'utilisateur à mettre à jour en utilisant le nom de l'entreprise
    const existingUser = await User.findOne({ where: { firm_name } });
    // Vérification si l'utilisateur à mettre à jour existe
    if (!existingUser) {
      // Si l'utilisateur n'est pas trouvé, renvoyer une erreur 404
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }

     // Mise à jour du rôle de l'utilisateur dans la base de données
    await existingUser.update({ is_admin });
    // Réponse JSON indiquant que le rôle de l'utilisateur a été mis à jour avec succès
    res.json({ message: 'Rôle utilisateur mis à jour avec succès.' });
  } catch (error) {
    // Gestion des erreurs générales de la fonction
    console.error(error);
    // Réponse JSON en cas d'erreur serveur lors de la mise à jour du rôle utilisateur
    res.status(500).json({ message: 'Erreur serveur lors de la mise à jour du rôle utilisateur.' });
  }
};

// Fonction pour obtenir tous les noms d'entreprise de tous les utilisateurs
const getAllFirmName = async (req, res) => {
  try {
      // Récupération de tous les utilisateurs depuis la base de données
      const users = await User.findAll();
      // Mapping pour extraire uniquement les noms d'entreprise de chaque utilisateur
      const firmNames = users.map(user => user.firm_name);
       // Réponse JSON avec la liste des noms d'entreprise
      res.json(firmNames);
  } catch (error) {
      // Gestion des erreurs en cas d'échec lors de la récupération des noms d'entreprise
      console.error(error);
      // Réponse JSON en cas d'erreur serveur lors de la récupération des noms d'entreprise
      res.status(500).json({ message: 'Erreur serveur lors de la récupération des noms d\'entreprise.' });
  }
};

const generatePassword = async () =>{
  try {
    let newPassword;
    do {
      // Génération d'un nombre aléatoire entre 000000 et 999999, conversion en chaîne de caractères
      newPassword = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    } while (await User.findOne({where: {password: newPassword } })); // Vérification de l'unicité du mot de passe dans la base de données
    if (!newPassword) {
      throw new Error('Mot de passe généré est vide.');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return { clearPassword: newPassword, hashedPassword };
  } catch (error) {
    console.error(error); // Affichage de l'erreur dans la console en cas d'échec
    res.status(500).json({ message: 'Erreur lors de la génération du mot de passe.' }); // Réponse JSON en cas d'erreur serveur lors de la création de l'utilisateur
  }
};  

// Exportation de la fonction
module.exports = {
  createUser,
  createAdmin,
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