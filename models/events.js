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
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: false
    },
    endTime: {  
      type: DataTypes.TIME,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
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
