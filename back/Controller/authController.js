// authController.js
// Gestion de la connexion des utilisateurs

// Utilisation du package dotenv pour charger les variables d'encironnement à partir d'un fichier spécifié
require('dotenv').config({
    path: '../.env',  // Chemin spécifié pour le fichier .env
});
const bcrypt = require('bcrypt');  // Module pour le hachage des mots de passe
const jwt = require('jsonwebtoken');  // Module pour la création et la vérification des tokens JWT
const db = require('../models/index'); // importation du model index avec l'objet db qui utilise la configuration sequelize
                                       // et permet de la réutiliser sans faire la configuration a chaque fois


// Fonction asynchrone qui gère la connexion des utilisateurs
async function login (req, res) {
    try {
        // Extraction des données du corps de la requête
        const { firm_name, password } = req.body;
        // Utilisation de Sequelize via la méthode findOne pour trouver un utilisateur 
        const user = await db.User.findOne({where: {firm_name: firm_name}});   
        // Utilisation de l'opération asynchrone avec le mot-clé 'await' pour attendre que la requête se termine.
        // Spécification des critères de recherche (utilisation de where). 
        // Dans ce cas, on cherche un utilisateur dont la valeur dans la colonne 'firm_name' correspond à la variable 'firm_name'.
        // console.log(user)
        // Comparaison du mot de passe fourni avec le mot de passe haché stocké dans la base de données
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (user && passwordMatch) {
            // Si les mots de passe correspondent, génération d'un token JWT avec des informations spécifiques
            const token = jwt.sign(
                { firm_name: user.firm_name },
                process.env.JWT_SECRET,  // Utilisation d'une clé secrète qui sert à crypter le token provenant de variables d'environnement
                { expiresIn: process.env.JWT_EXPIRES_IN }  // Spécification de la durée de validité du token (24 heure dans cet exemple)
            );
           
            // Définir le cookie avec le nom "token"
            res.cookie('token', token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 86400000) });
            console.log(res.cookie);
            // Réponse indiquant que la connexion est réussie
            res.json({message: 'Connexion réussie', token, user})    
        } else {
            // Si les mots de passe ne correspondent pas, renvoyer une erreur d'authentification
            res.status(401).json({ error: 'Mot de passe incorrect.' });
        }
    } catch (error) {
        // En cas d'erreur pendant le processus d'authentification, renvoyer une erreur interne du serveur
        res.status(500).json({ error: error.message });
    }
};

// Fonction de gestion de la déconnexion
function logout(_, res) {
    // Suppression du cookie en définissant une date d'expiration passée
    res.cookie('token', '', { expires: new Date(0), httpOnly: true, secure: true });
    // Réponse indiquant que la déconnexion est réussie
    res.json({ message: 'Déconnexion réussie' });
};

// Exportation de la fonction de connexion pour qu'elle puisse être utilisée ailleurs
module.exports = {
    login,
    logout
};