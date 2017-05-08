var db = require("../models");

module.exports = function() {
    db.User.belongsToMany(db.Event, {through: "UserEvent"});
      db.User.hasMany(db.Event, {
        foreignKey: {
          allowNull: false
        }
      });
    db.Event.belongsToMany(db.User, {through: "UserEvent"});
    db.Event.belongsTo(db.User,{onDelete: "cascade"});
};

