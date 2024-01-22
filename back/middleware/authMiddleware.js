// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const db = require('../models/index');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        console.log("authenticateAdmin headers: ", req.headers, req.body);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized11' });
        }

        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const user = await db.User.findOne({where: {firm_name:decoded.firm_name}});

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized22' });
        }

        req.user = user; // Ajoute les informations de l'utilisateur au req pour une utilisation ultérieure
        next(); // Passe au middleware ou au contrôleur suivant
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized33' });
    }
};

const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        console.log("authenticateAdmin headers: ", req.headers, req.body);
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized1' });
        }

        const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
        const user = await db.User.findOne({where: {firm_name:decoded.firm_name}});

        if (!user || !user.is_admin) {
            return res.status(401).json({ message: 'Unauthorized2' });
        }

        req.admin = user; // Ajoute les informations de l'admin au req pour une utilisation ultérieure
        next(); // Passe au middleware ou au contrôleur suivant
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Unauthorized3' });
    }
};

// const authToken = (req, res, next) => {
//     // Récupération du jeton d'authentification depuis l'en-tête de la requête
//     const token = req.header('Authorization');

//     // Vérification si le jeton d'authentification est présent
//     if (!token) return res.status(401).json({ error: 'Accès non autorisé' });

//     // Vérification de la validité du jeton d'authentification
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//         // En cas d'erreur lors de la vérification du jeton
//         if (err) return res.status(403).json({ error: 'Jetons d\'authentification non valide.' });

//         // Si la vérification est réussie, l'utilisateur (payload du jeton) est attaché à l'objet de requête (req)
//         req.user = user;

//         // Appel à la fonction next() pour passer au middleware ou à la route suivante dans la chaîne
//         next();
//     });
// };

module.exports = { authenticateUser, authenticateAdmin };