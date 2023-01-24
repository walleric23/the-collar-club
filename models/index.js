const User = require('./User');
const Review = require('./Review');
const ProviderInfo = require('./ProviderInfo');

User.hasOne(ProviderInfo, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
 
});
ProviderInfo.belongsTo(User,{
});

User.hasMany(Review, {
  onDelete: 'CASCADE'
});

Review.belongsTo(User, {
  foreignKey: 'user_id'
});

ProviderInfo.hasMany(Review, {
  onDelete: 'CASCADE'
});

Review.belongsTo(ProviderInfo, {
  foreignKey: 'providerInfo_id'
});


module.exports = { User, Review, ProviderInfo};
