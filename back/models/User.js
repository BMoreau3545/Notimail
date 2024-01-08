const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('NotimailDB', 'admin', '21323517', {
  host: 'localhost',
  dialect: 'postgres',
  port:5432
});

const User = sequelize.define('User', {
    firm_name: {
      type: DataTypes.STRING(25),
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING(25)
    },
    last_name: {
      type: DataTypes.STRING(25)
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING(25),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(25)
    },
    last_received_mail: {
      type: DataTypes.TIMESTAMP
    },
    last_picked_up: {
      type: DataTypes.TIMESTAMP,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    has_mail: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
  });

sequelize.sync();

module.exports = User;