const User = require('./User');
const Item = require('./Item');
const Event = require('./Event');

// Create associations
User.hasMany(Item, {
  onDelete: 'CASCADE',
  foreignKey: 'user_id',
});

Item.belongsTo(User, {
  foreignKey: 'user_id'
});

User.hasMany(Event, {
  onDelete: 'CASCADE',
  foreignKey: 'host_user_id',
});

Event.belongsTo(User, {
  foreignKey: 'host_user_id'
});

Event.hasMany(Item, {
  onDelete: 'CASCADE',
  foreignKey: 'event_id',
});

Item.belongsTo(Event, {
  foreignKey: 'event_id'
});

module.exports = { User, Item };
