const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {get_user_by_firm_name} = require('../Controller/userController');

async function login(req, res) {
    try {
        const {firm_name, password} = req.body;

        const user = await get_user_by_firm_name(firm_name);

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (passwordMatch) {
            const token = jwt.sign({ firm_name: user.firm_name, email: user.email}, process.env.JWT_SECRET, {expiresIn: '1h'});
            res.json({token});
        } else {
            res.status(401).json({error: 'Mot de passe incorrect.'});
        }
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    login
};