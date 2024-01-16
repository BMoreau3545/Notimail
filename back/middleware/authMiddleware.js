// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { get_user_by_firm_name } = require('../Controller/userController');

const authenticateUser = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await get_user_by_firm_name(decoded.firm_name);

        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = user; // Ajoute les informations de l'utilisateur au req pour une utilisation ultérieure
        next(); // Passe au middleware ou au contrôleur suivant
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

const authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await get_user_by_firm_name(decoded.firm_name);

        if (!user || !user.is_admin) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        req.admin = user; // Ajoute les informations de l'admin au req pour une utilisation ultérieure
        next(); // Passe au middleware ou au contrôleur suivant
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = { authenticateUser, authenticateAdmin };