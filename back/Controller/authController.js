// Importation de modules nécessaires
require('dotenv').config({
    path: '../.env',  // Chemin spécifié pour le fichier .env
});
const bcrypt = require('bcrypt');  // Module pour le hachage des mots de passe
const jwt = require('jsonwebtoken');  // Module pour la création et la vérification des tokens JWT
const db = require('../models/index');


// Fonction de gestion de la connexion
async function login (req, res) {
    try {
        // Extraction des données du corps de la requête
        const { firm_name, password } = req.body;
        console.log(firm_name, password);

        // Récupération des informations de l'utilisateur à partir de la base de données en utilisant le nom de la société
        const user = await db.User.findOne({where :{firm_name: firm_name}});

        // Comparaison du mot de passe fourni avec le mot de passe haché stocké dans la base de données
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (user && passwordMatch) {
            // Si les mots de passe correspondent, génération d'un token JWT avec des informations spécifiques
            const token = jwt.sign(
                { firm_name: user.firm_name },
                process.env.JWT_SECRET,  // Utilisation d'une clé secrète provenant de variables d'environnement
                { expiresIn: process.env.JWT_EXPIRES_IN }  // Spécification de la durée de validité du token (1 heure dans cet exemple)
            );
            // res.json({ token });  // Envoyer le token comme réponse JSON
            // Définir le cookie avec le nom "token"
            res.cookie('token', token, { httpOnly: true, secure: true, expires: new Date(Date.now() + 3600000) });
            res.json({message: 'Connexion réussie', token, user})    
        } else {
            // Si les mots de passe ne correspondent pas, renvoyer une erreur d'authentification
            res.status(401).json({ error: 'Mot de passe incorrect.' });
        }
    } catch (error) {
        // En cas d'erreur pendant le processus d'authentification, renvoyer une erreur interne du serveur
        res.status(500).json({ error: error.message });
    }
}

async function logout (res) {
        // Suppression du cookie de session
        res.clearCookie('token');

        // Réponse indiquant la déconnexion réussie
        res.json({ message: 'Déconnexion réussie.' });
}

// Exportation de la fonction de connexion pour qu'elle puisse être utilisée ailleurs
module.exports = {
    login,
    logout
};