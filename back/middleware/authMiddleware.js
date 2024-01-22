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

// const authenticateToken = (req, res, next) => {
//     const token = req.cookies.token;
  
//     // Vérification si le token est révoqué
//     if (revokedTokens.includes(token)) {
//       return res.status(401).json({ error: 'Token révoqué. Veuillez vous reconnecter.' });
//     }
  
//     jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//       if (err) {
//         return res.status(403).json({ error: 'Token non valide. Veuillez vous reconnecter.' });
//       }
//       req.user = user;
//       next();
//     });
//   };
  

module.exports = { 
    authenticateUser, 
    authenticateAdmin,
 };