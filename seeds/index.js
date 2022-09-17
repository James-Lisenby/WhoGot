const sequelize = require('../config/connection');
const { User, Item, Event } = require('../models');

const userData = require('./userData.json');
const itemData = require('./itemData.json');
const eventData = require('./eventData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Event.bulkCreate(eventData, {
    individualHooks: true,
    returning: true,
  });

  await Item.bulkCreate(itemData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
