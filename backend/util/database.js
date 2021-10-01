/**
 * 
 * MySQL connection configurations
 *   
 */

const mysql = require("mysql");
const fs = require("fs");

//Connect to mysql
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root"
});

function readFile(fileName, callback) {
  fs.readFile(fileName, 'utf8' , (err, data) => {
    if (err) {
      return callback(err);
    }
    callback(null, data);
  })
}

exports.createDatabase = function(){
  var sql = "select count(*) as dbcount from information_schema.schemata where schema_name like 'accounting';"

  this.runSQL(sql, (data)=>{

    var result = JSON.parse(JSON.stringify(data))[0];

    if(result.dbcount == 0){
        console.log("No Accounting Database available :/");    
        console.log("Trying to create a new one...");
        readFile(__dirname + '/create_db.sql', (err, data) => {
          if(err){
            console.log("Error reading database initialization file");
          } else {
            var sqlArray = data.split(";");

            sqlArray.forEach(s => {
              if(s.trim().length > 0){
                console.log("Running:", s);
                this.runSQL(s + ";",()=>{});
              }
            });
          }
        });
    } else {
      this.runSQL("USE accounting", ()=>{});
      console.log("Accounting Database found!"); 
    }

  });
  
}

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
