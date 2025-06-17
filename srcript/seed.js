require('dotenv').config();
const connectDB = require('../config/db');
const User = require('../models/User');

connectDB();

const seedUsers = async () => {
  try {
    await User.deleteMany();

    const users = [
      { username: "Jp Soutar", password: "1234", role: "admin" },
      { username: "Jp Faber", password: "1234", role: "admin" },
      { username: "user1", password: "5678", role: "user" }
    ];

    await User.insertMany(users);
    console.log('Database seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedUsers();