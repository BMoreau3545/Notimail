const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUsers = async () => {
  try {
    const saltRounds = 10; // Vous pouvez ajuster le nombre de "rounds" selon vos besoins

    const Ent1 = await User.create({
      firm_name: 'Entreprise1',
      first_name: 'Contact1',
      last_name: 'Nom1',
      email: 'contact1@example.com',
      phone_number: '1234567890', // Assurez-vous que le numéro de téléphone est une chaîne
      password: await bcrypt.hash('motDePasse1', saltRounds),
      last_received_mail: new Date('2024-01-03T08:30:00Z'),
      last_picked_up: new Date('2024-01-03T10:45:00Z'),
      has_mail: true,
      is_admin: false
    });

    const Ent2 = await User.create({
      firm_name: 'Entreprise2',
      first_name: 'Contact2',
      last_name: 'Nom2',
      email: 'contact2@example.com',
      phone_number: '9876543210',
      password: await bcrypt.hash('motDePasse2', saltRounds),
      last_received_mail: new Date('2024-01-02T15:20:00Z'),
      last_picked_up: new Date('2024-01-02T15:20:00Z'),
      has_mail: false,
      is_admin: false
    });

    const Ent3 = await User.create({
      firm_name: 'Entreprise3',
      first_name: 'Contact3',
      last_name: 'Nom3',
      email: 'contact3@example.com',
      phone_number: '5551234567',
      password: await bcrypt.hash('motDePasse3', saltRounds),
      last_received_mail: new Date('2024-01-01T12:00:00Z'),
      last_picked_up: new Date('2024-01-01T12:00:00Z'),
      has_mail: true,
      is_admin: false
    });

    console.log('Utilisateurs créés avec succès:', Ent1.toJSON(), Ent2.toJSON(), Ent3.toJSON());
  } catch (error) {
    console.error('Erreur lors de la création des utilisateurs:', error);
  }
};

createUsers();
