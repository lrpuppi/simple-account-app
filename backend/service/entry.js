var db = require('../util/database.js');

/*
+--------------+---------------+------+-----+---------+----------------+
| Field        | Type          | Null | Key | Default | Extra          |
+--------------+---------------+------+-----+---------+----------------+
| id           | bigint(20)    | NO   | PRI | NULL    | auto_increment |
| payment_date | date          | YES  |     | NULL    |                |
| due_date     | date          | NO   |     | NULL    |                |
| description  | varchar(80)   | NO   |     | NULL    |                |
| type         | varchar(255)  | NO   |     | NULL    |                |
| value        | decimal(10,2) | NO   |     | NULL    |                |
| person_id    | bigint(20)    | NO   | MUL | NULL    |                |
+--------------+---------------+------+-----+---------+----------------+
*/

exports.getEntries = function(callback){
	db.runSQL("select * from entry", function(rows){
		callback(JSON.stringify(rows));
	});	
}

exports.getEntry = function(callback, id){
	db.runSQL("select * from entry where id = " + id + ";", function(row){
		callback(JSON.stringify(row[0]));
	});	
}

exports.addEntry = function(callback, entry){
	var sql = "insert into entry (payment_date, due_date, description, type, value, person_id) "
			+ "values (" 
			+ "STR_TO_DATE('" + this.dateToDMA(entry.payment_date)  + "', '%d/%m/%Y'), "
			+ "STR_TO_DATE('" + this.dateToDMA(entry.due_date) + "', '%d/%m/%Y'), '"
			+ entry.description + "', '"
			+ entry.type + "', '"
			+ entry.value + "', '"
			+ entry.person_id + "');"

	db.runSQL(sql,function(row){
			callback('Record included');
		});	
}

exports.updEntry = function(callback, entry){
	var sql = "update entry set "
			+ "payment_date  = STR_TO_DATE('" + this.dateToDMA(entry.payment_date)  + "', '%d/%m/%Y'), "
			+ "due_date = STR_TO_DATE('" + this.dateToDMA(entry.due_date) + "', '%d/%m/%Y'), "
			+ "description = '" + entry.description + "', "
			+ "type = '" 	  + entry.type + "', "
			+ "value = '" 	  + entry.value + "', "
			+ "person_id = '" + entry.person_id + "' "
			+ "where id = " + entry.id + ";";

	console.log(sql);

	db.runSQL(sql, function(row){
		callback('Record updated');
	});	
}

exports.delEntry =  function(callback, id){
	db.runSQL("delete from entry where id = " + id + ";", function(row){
		callback('Record deleted');
	});
}

exports.dateToDMA = function(date) {
	console.log("CONVERTING --> " + date);
	date = new Date(date);
	var d = date.getDate();
	var m = date.getMonth() + 1; //Month from 0 to 11
	var y = date.getFullYear();
	return '' + (d <= 9 ? '0' + d : d) + '/' + (m<=9 ? '0' + m : m) + '/' + y;
}
