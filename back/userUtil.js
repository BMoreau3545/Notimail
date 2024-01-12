const User = require('./models/User');
const bcrypt = require('bcrypt');

const createUsers = async () => {
  try {
    const saltRounds = 10; // Vous pouvez ajuster le nombre de "rounds" selon vos besoins

    const Ent1 = await User.create({
      "firm_name": "Entreprise6",
      "first_name": "Contact6",
      "last_name": "Nom6",
      "email": "contact6@example.com",
      "phone_number": "9990001111",
      "password": "motDePasse6",
      "last_received_mail": "2023-12-29T14:30:00Z",
      "last_picked_up": "2023-12-29T14:30:00Z",
      "has_mail": false,
      "is_admin": false
    });

    const Ent2 = await User.create({
      "firm_name": "Entreprise7",
      "first_name": "Contact7",
      "last_name": "Nom7",
      "email": "contact7@example.com",
      "phone_number": "4445556666",
      "password": "motDePasse7",
      "last_received_mail": "2023-12-28T20:55:00Z",
      "last_picked_up": "2023-12-28T20:55:00Z",
      "has_mail": true,
      "is_admin": false
    });

    const Ent3 = await User.create({
      "firm_name": "Entreprise8",
      "first_name": "Contact8",
      "last_name": "Nom8",
      "email": "contact8@example.com",
      "phone_number": "6667778888",
      "password": "motDePasse8",
      "last_received_mail": "2023-12-27T11:40:00Z",
      "last_picked_up": "2023-12-27T11:40:00Z",
      "has_mail": false,
      "is_admin": false
    });

    console.log('Utilisateurs créés avec succès:', Ent1.toJSON(), Ent2.toJSON(), Ent3.toJSON());
  } catch (error) {
    console.error('Erreur lors de la création des utilisateurs:', error);
  }
};

createUsers();
