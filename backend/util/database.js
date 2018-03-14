/**
 * 
 * MySQL connection configurations
 *   
 */

var mysql = require("mysql");

//Connect to mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "accounting"
});

exports.runSQL = function(sql, callback){
	console.log("Connecting database...");

 	con.query(sql, function (error, results) {
		console.log("Preparing query..: " + sql);
 		if(error){
 			throw error;
 		} else {
			console.log("Running query..: " + sql);
			callback(results);
 		}
 	});
};