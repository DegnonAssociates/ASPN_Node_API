// settings.js

exports.dbConfig = {
	user:     "aspnadmin",
	password: "aspnadminpwd",
	server:   "degnonsql2",
	database: "ASPN",
	port: 1433
};

exports.webPort = 3000;
exports.httpMsgsFormat = "JSON";

exports.memberSql = "SELECT [Member ID] as memberId, First_Name as firstName, Last_Name as lastName, middle_nam as middleName, degrees as degree, academicti as academicTitle, department, org as institution, telephone as busPhone, email, address, address2, city, state, zip, country, fax_number as fax, webAccess, dues_year as duesYear FROM Main ";
exports.activitySql = "SELECT a.[Member ID] as memberId, a.positionCode, a.actOptOut, a.memYear, a.chairman, a.coChair, a.termExp, a.activityNote, m.First_Name	as firstName, m.Last_Name as lastName, m.degrees, m.email FROM Activities a INNER JOIN Main m ON a.[Member ID] = m.[Member ID]";
exports.activityCodeSql = "SELECT * FROM [Activity Codes] ";
exports.defaultSearchLimit = 25;

exports.secret = "5FDF19D7-EC51-4FE6-AAA1-E10B729BFF09";