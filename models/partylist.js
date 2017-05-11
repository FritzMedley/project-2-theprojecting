module.exports = function(sequelize, DataTypes)  {

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