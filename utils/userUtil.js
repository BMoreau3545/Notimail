const user = require('../models/User.js');
const bcrypt = require('bcrypt');

const Ent1 = await user.create({
    firm_name: 'Entreprise1',
    first_name: 'Contact1',
    last_name: 'Nom1',
    email: 'contact1@example.com',
    phone_number: 1234567890,
    password: 'motDePasse1',
    last_received_mail: '2024-01-03T08:30:00Z',
    last_picked_up: '2024-01-03T10:45:00Z',
    has_mail: true,
    is_admin: false
});

const Ent2 = await user.create({
    firm_name: 'Entreprise2',
    first_name: 'Contact2',
    last_name: 'Nom2',
    email: 'contact2@example.com',
    phone_number: 9876543210,
    password: 'motDePasse2',
    last_received_mail: '2024-01-02T15:20:00Z',
    last_picked_up: '2024-01-02T15:20:00Z',
    has_mail: false,
    is_admin: false
});

const Ent3 = await user.create({
    firm_name: 'Entreprise3',
      first_name: 'Contact3',
      last_name: 'Nom3',
      email: 'contact3@example.com',
      phone_number: 5551234567,
      password: 'motDePasse3',
      last_received_mail: '2024-01-01T12:00:00Z',
      last_picked_up: '2024-01-01T12:00:00Z',
      has_mail: true,
      is_admin: false
})
