var db = require("../util/database.js");

/*------+-------------+------+-----+---------+----------------+
| Field | Type        | Null | Key | Default | Extra          |
+-------+-------------+------+-----+---------+----------------+
| id    | bigint(20)  | NO   | PRI | NULL    | auto_increment |
| name  | varchar(60) | NO   |     | NULL    |                |
+-------+-------------+------+-----+---------+---------------*/

exports.getPersons = function(callback){
	console.log("getting persons...");
	db.runSQL("select * from person", function(rows){
		callback(JSON.stringify(rows));
	});	
}

exports.getPerson = function(callback, id){
	db.runSQL("select * from person where id = " + id + ";", function(row){
		callback(JSON.stringify(row[0]));
	});	
}

exports.addPerson = function(callback, person){
	db.runSQL("insert into person (name) values ('" + person.name + "');", function(row){
		callback('Record included');
	});	
}

exports.updPerson = function(callback, person){
	db.runSQL("update person set name = '" + person.name + "' where id = " + person.id + ";", function(row){
		callback('Record updated');
	});	
}

exports.delPerson =  function(callback, id){
	db.runSQL("delete from person where id = " + id + ";", function(row){
		callback('Record deleted');
	});
}


