const User = require('./User');
const FoodItem = require('./FoodItem');

// Create associations
User.hasMany(Item, {
  onDelete: 'CASCADE',
  foreignKey: 'id',
});

Item.belongsTo(User, {
  foreignKey: 'id'
});

User.hasMany(Event, {
  onDelete: 'CASCADE',
  foreignKey: 'id',
});

Event.belongsTo(User, {
  foreignKey: 'id'
});

Event.hasMany(Item, {
  onDelete: 'CASCADE',
  foreignKey: 'id',
});

Item.belongsTo(Event, {
  foreignKey: 'id'
});

module.exports = { User, FoodItem };
