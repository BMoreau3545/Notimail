const db = require('../models/index');// Importation du module de base de données (sequelize) pour accéder aux modèles
const User = db.User; // Importation du modèle User à partir du module sequelize

// Fonction asynchrone pour valider la récupération du courrier par un utilisateur
const recupMail = async (req, res) => {
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

  module.exports = {
    recupMail
  } 