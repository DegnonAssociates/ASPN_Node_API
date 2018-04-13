var db = require ("../../core/db");
var settings = require("../../settings");


exports.getCount = function (table) {
	var cSql = "SELECT count(*) as numRows FROM " + table;
	db.executeSql(cSql, function(results, err) {
		if (err){
			console.log(err);
		} else {
			console.log(results[0].numRows);
			return results[0].numRows;
		}
	});
	

}