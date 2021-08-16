const Sequelize = require('sequelize')
const {Model} = Sequelize

module.exports =  (sequelize, DataTypes) =>{
  class Project extends Model{}
  Project.init({
    name: DataTypes.STRING,
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Project'
  })

  Project.associate = (models) => {
    models.Project.belongsTo(models.User, {
      foreignKey: 'UserId',
      targetKey: 'id',
      onDelete: 'CASCADE'
    })
  }
 
  return Project
}

