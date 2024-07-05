// config.js
// Configuration Sequelize pour l'environnement de développement
module.exports = {
    development: {
        // Dialecte de la base de données (par exemple, 'mysql', 'postgres', 'sqlite', etc.)
        dialect: process.env.DB_DIALECT,

        // Nom d'utilisateur pour se connecter à la base de données
        username: process.env.DB_USER,

        // Mot de passe pour se connecter à la base de données
        password: process.env.DB_PASSWORD,

        // Nom de la base de données à laquelle se connecter
        database: process.env.DB_NAME,

        // Hôte de la base de données (par exemple, 'localhost' ou une adresse IP)
        host: process.env.DB_HOST,

        // Port sur lequel la base de données écoute les connexions (par exemple, 5432 pour postgreSQL)
        port: process.env.DB_PORT,
    }
};