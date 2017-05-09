module.exports = function(sequelize, DataTypes){
  var Event = sequelize.define("Event", {
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    numAttendees: {
      type: DataTypes.STRING,
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    location: {
      type: DataTypes.STRING,
      allowNull: true
    },
    startTime: {
      type: DataTypes.STRING,
      allowNull: true
    },
    endTime: {  
      type: DataTypes.STRING,
      allowNull: true
    },
    date: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    // We're saying that we want our Author to have Posts
    classMethods: {
      associate: function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Event.belongsTo(models.User, {
          foreignKey: {
            name: "creatorId",
            allowNull: false,
          }
        });
        Event.belongsToMany(models.User, {through: "UserEvent"});
      }
    }
  }
);
  return Event;
};
