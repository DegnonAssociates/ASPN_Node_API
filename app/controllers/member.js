// member.js

var db        = require("../../core/db");
var httpMsgs  = require("../../core/httpMsgs");
var util      = require("util");
var settings  = require('../../settings');
var expValidate  = require('express-validator');

exports.getList = function (req, res) {
	var page = parseInt(req.query.page, 10) || 1;  // page number passed in URL query string
	var fetch  = settings.defaultSearchLimit;      // items per page
	var offset = (page - 1) * fetch;               // start row
	
	var sql = settings.memberSql;

	sql += "ORDER BY [member id] OFFSET " + offset + " ROWS FETCH NEXT " + fetch + " ROWS ONLY";
	db.executeSql(sql, function(data, err) {
		if(err){
			httpMsgs.show500(req, res, err);
		} else {
			httpMsgs.sendJson(req, res, data);
		}
	});
};

exports.get = function (req, res, memberId) {
	var sql = settings.memberSql;
	sql += "WHERE [Member Id] = " + memberId;

	db.executeSql(sql, function(data, err) {
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