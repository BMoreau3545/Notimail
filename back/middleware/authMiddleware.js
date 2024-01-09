// Importation du module jsonwebtoken pour gérer les jetons d'authentification
const jwt = require('jsonwebtoken');

// Middleware pour vérifier le jeton d'authentification
function authToken(req, res, next) {
    // Récupération du jeton d'authentification depuis l'en-tête de la requête
    const token = req.header('Authorization');

    // Vérification si le jeton d'authentification est présent
    if (!token) return res.status(401).json({ error: 'Accès non autorisé' });

    // Vérification de la validité du jeton d'authentification
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // En cas d'erreur lors de la vérification du jeton
        if (err) return res.status(403).json({ error: 'Jetons d\'authentification non valide.' });

        // Si la vérification est réussie, l'utilisateur (payload du jeton) est attaché à l'objet de requête (req)
        req.user = user;

        // Appel à la fonction next() pour passer au middleware ou à la route suivante dans la chaîne
        next();
    });
}

// Exportation du middleware pour qu'il puisse être utilisé dans d'autres fichiers
module.exports = {
    authToken
};