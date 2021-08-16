const Sequelize = require('sequelize')
const { Model } = Sequelize

module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    }
  )

  User.associate = (models) => {
    models.User.hasMany(models.Project, {
      foreignKey: 'UserId',
      as: 'projects'
    })
  }
  
  return User
}
