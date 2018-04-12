var db = require("../../core/db");
var httpMsgs = require("../../core/httpMsgs");
var util = require("util");

exports.getList = function (req, res) {
	db.executeSql("SELECT TOP(10) [Member Id] as memberId, First_Name as firstName, Last_Name as lastName, email FROM Main", function(data, err) {
		if(err){
			httpMsgs.show500(req, res, err);
		} else {
			httpMsgs.sendJson(req, res, data);
		}
	});
};

exports.get = function (req, res, memberId) {
	db.executeSql("SELECT [Member Id] as memberId, First_Name as firstName, Last_Name as lastName, email FROM Main WHERE [Member Id] = " + memberId, function(data, err) {
		if(err){
			httpMsgs.show500(req, res, err);
		} else {
			httpMsgs.sendJson(req, res, data);
		}
	});
};

exports.add = function (req, res) {
	try {
		if(!req.body) throw new Error("Input not valid");
		var data = req.body;
		if (data) {
			var sql = "INSERT INTO Main (First_Name, Last_Name, email) VALUES ";
			sql += util.format("('%s', '%s', '%s')", data.firstName, data.lastName, data.email);
			db.executeSql(sql, function (data, err) {
				if (err) {
					httpMsgs.show500(req, res, err);
				} else {
					httpMsgs.send200(req, res);
				}
			});
		}
		else {
			throw new Error("Input not valid");
		}
	}
	catch (ex) {
		httpMsgs.show500(req, res, ex);
	}
};

exports.update = function (req, res) {
	try {
		if(!req.body) throw new Error("Input not valid");
		var data = req.body;

		if (data) {

			if(!data.memberId) throw new Error("memberId not provided");

			var sql = "UPDATE Main SET";

			var isDataProvided = false;
			if(data.firstName) {
				sql += " First_Name = '" + data.firstName + "',";
				isDataProvided = true;
			}

			if(data.lastName) {
				sql += " Last_Name = '" + data.lastName + "',";
				isDataProvided = true;
			}

			if(data.email) {
				sql += " Email = '" + data.email + "',";
				isDataProvided = true;
			}

			if(data.updated) {
				sql += " Updated = '" + data.updated + "',";
				isDataProvided = true;
			}

			sql = sql.slice(0, -1); //remove last comma
			sql += "WHERE [member id] = " + data.memberId;


			db.executeSql(sql, function (data, err) {
				if (err) {
					httpMsgs.show500(req, res, err);
				} else {
					httpMsgs.send200(req, res);
				}
			});
		}
		else {
			throw new Error("Input not valid");
		}
	}
	catch (ex) {
		httpMsgs.show500(req, res, ex);
	}
};

exports.delete = function (req, res) {
	try {
		if(!req.body) throw new Error("Input not valid");
		var data = req.body;
		if (data) {

			if(!data.memberId) throw new Error("memberId not provided");

			var sql = "DELETE FROM Main";
			
			sql += "WHERE [member id] = " + data.memberId;

			db.executeSql(sql, function (data, err) {
				if (err) {
					httpMsgs.show500(req, res, err);
				} else {
					httpMsgs.send200(req, res);
				}
			});
		}
		else {
			throw new Error("Input not valid");
		}
	}
	catch (ex) {
		httpMsgs.show500(req, res, ex);
	}
};