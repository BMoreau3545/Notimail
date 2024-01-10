// Importation de modules nécessaires
const bcrypt = require('bcrypt');  // Module pour le hachage des mots de passe
const jwt = require('jsonwebtoken');  // Module pour la création et la vérification des tokens JWT
const { get_user_by_firm_name } = require('../Controller/userController');  // Importation d'une fonction pour récupérer les informations de l'utilisateur

// Fonction de gestion de la connexion
async function login(req, res) {
    try {
        // Extraction des données du corps de la requête
        const { firm_name, password } = req.body;

        // Récupération des informations de l'utilisateur à partir de la base de données en utilisant le nom de la société
        const user = await get_user_by_firm_name(firm_name);

        // Comparaison du mot de passe fourni avec le mot de passe haché stocké dans la base de données
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            // Si les mots de passe correspondent, génération d'un token JWT avec des informations spécifiques
            const token = jwt.sign(
                { firm_name: user.firm_name, email: user.email },
                process.env.JWT_SECRET,  // Utilisation d'une clé secrète provenant de variables d'environnement
                { expiresIn: '1h' }  // Spécification de la durée de validité du token (1 heure dans cet exemple)
            );
            res.json({ token });  // Envoyer le token comme réponse JSON
        } else {
            // Si les mots de passe ne correspondent pas, renvoyer une erreur d'authentification
            res.status(401).json({ error: 'Mot de passe incorrect.' });
        }
    } catch (error) {
        // En cas d'erreur pendant le processus d'authentification, renvoyer une erreur interne du serveur
        res.status(500).json({ error: error.message });
    }
}

async function logout (req, res) {
        // Suppression du cookie de session
        res.clearCookie('token');

        // Réponse indiquant la déconnexion réussie
        res.json({ message: 'Déconnexion réussie.' });
}

// Exportation de la fonction de connexion pour qu'elle puisse être utilisée ailleurs
module.exports = {
    login
};