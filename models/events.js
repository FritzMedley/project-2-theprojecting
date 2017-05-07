
module.exports = function(sequelize, DataTypes){
  var Event = sequelize.define("Event", {
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    numAttendees: {
      type: DataTypes.STRING,
      allowNull: false
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
{
  classMethods: {
    associate: function(models) {
      Event.belongsToMany(models.User, {through: "UserEvent"});
      Event.belongsTo(models.User, {
        as: "creatorId",
        foreignKey: {
          allowNull: false
        }
      });
    }
  }
});
  return Event;
};
