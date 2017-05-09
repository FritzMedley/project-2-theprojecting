module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {
    oauthId: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    credType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
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
        User.hasMany(models.Event, 
          {
           foreignKey: {
            name: "creatorId",
            allowNull: false,
          }
        });
        User.belongsToMany(models.Event, {through: "UserEvent"});
      }
    }
  }
);
  return User;
};
