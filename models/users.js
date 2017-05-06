



module.exports = function(sequelize, DataTypes){
  var User = sequelize.define("User", {
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
  classMethods: {
    associate: function(models) {
      User.belongsToMany(models.Event, {through: "UserEvent"});
      User.hasMany(models.Event, {
        onDelete: "cascade"
      });
    }

    }
}
);
  return User;
};
