var connection = require("./connection.js");

//Helper function to connect to SQL

//Object for all SQL statements.

var orm = {
	all: function(tableInput, cb) {
		var queryString = "SELECT * FROM " + tableInput + ";"
		connection.query(queryString, function(err, result) {
			if(err) {
				throw err;
			}
			cb(result);
		});
	}

	create: function(table, cols, vals, cb) {
		var queryString = "INSERT INTO " + table; 
		

	}




}