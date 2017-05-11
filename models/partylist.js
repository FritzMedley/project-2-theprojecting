module.exports = function(sequelize, DataTypes)  {
  // var Partylist = sequelize.define("Partylist", {
  //   // UserId: {
  //   //   type: DataTypes.INTEGER,
  //   //   allowNull: false,
  //   //   references: {
  //   //     model: "User",
  //   //     key: "id"
  //   //   }
  //   // },
  //   // EventId: {
  //   //   type: DataTypes.INTEGER,
  //   //   allowNull: false,
  //   //   references: {
  //   //     model: "Event",
  //   //     key: "id"
  //   //   }
  //   // },
  // },
  // {
  //   classMethods: {
  //     associate: function(models) {
  //       // Associating Author with Posts
  //       // When an Author is deleted, also delete any associated Posts
  //       Partylist.hasMany(models.Event,{
  //         foreignKey: {
  //           name: "EventId",
  //           allowNull: false
  //         }
  //       });
  //       Partylist.hasMany(models.User,{
  //         foreignKey: {
  //           name: "UserId",
  //           allowNull: false
  //         }
  //       });
  //   }
  // }});

  var Partylist = sequelize.define("Partylist", {},{
    // We're saying that we want our Author to have Posts
    classMethods: {
      associate: function(models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Partylist.belongsTo(models.Event);
        Partylist.belongsTo(models.User);
        
      }
    }
  });

  return Partylist;

};