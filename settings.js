exports.dbConfig = {
	user:     "aspnadmin",
	password: "aspnadminpwd",
	server:   "degnonsql2",
	database: "ASPN",
	port: 1433
};

exports.webPort = 3000;
exports.httpMsgsFormat = "JSON";

exports.memberSql = "SELECT [Member ID] as memberId, First_Name as firstName, Last_Name as lastName, email, address, address2, city, state, zip, country, telephone, fax_number, webAccess FROM Main ";
exports.activitySql = "SELECT [Member ID] as nenberId, positionCode, actOptOut, memYear, chairman, coChair, termExp, activityNote FROM Activities ";
exports.activityCodeSql = "SELECT * FROM [Activity Codes] ";
exports.defaultSearchLimit = 25;

exports.secret = "5FDF19D7-EC51-4FE6-AAA1-E10B729BFF09";