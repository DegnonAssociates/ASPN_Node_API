var settings = require("../settings");

exports.show500 = function(req, resp, err) {
	if (settings.httpMsgsFormat === "HTML") {
		resp.writeHead(500, "Internal Error Occurred", {"Content-Type":"text/html"} );
		resp.write("<html><head><title>500</title></head><body>500: Internal Error. Details: " + err + "</body></html>");
	}
	else {
		resp.writeHead(500, "Internal Error Occurred", {"Content-Type":"application/json"} );
		resp.write(JSON.stringify({ data: "ERROR occurred:" + err }));
	}

	resp.end();
};

exports.sendJson = function (req, resp, data) {
	resp.writeHead(200, {"Content-Type":"application/json"} );
	if (data){
		resp.write(JSON.stringify(data));
	}
	resp.end();
}

exports.show405 = function(req, resp) {
	if (settings.httpMsgsFormat === "HTML") {
		resp.writeHead(405, "Method not Supported", {"Content-Type":"text/html"} );
		resp.write("<html><head><title>405</title></head><body>405: Method not Supported</body></html>");
	}
	else {
		resp.writeHead(405, "Method not Supported", {"Content-Type":"application/json"} );
		resp.write(JSON.stringify({ data: "Method not Supported" }));
	}

	resp.end();
};

exports.show404 = function(req, resp) {
	if (settings.httpMsgsFormat === "HTML") {
		resp.writeHead(404, "Resource not found", {"Content-Type":"text/html"} );
		resp.write("<html><head><title>404</title></head><body>405: Resource not found</body></html>");
	}
	else {
		resp.writeHead(404, "Resource not found", {"Content-Type":"application/json"} );
		resp.write(JSON.stringify({ data: "Resource not found" }));
	}

	resp.end();
};

exports.show413 = function(req, resp) {
	if (settings.httpMsgsFormat === "HTML") {
		resp.writeHead(413, "Request Entity too Large", {"Content-Type":"text/html"} );
		resp.write("<html><head><title>413</title></head><body>413: Request Entity too Large</body></html>");
	}
	else {
		resp.writeHead(413, "Request Entity too Large", {"Content-Type":"application/json"} );
		resp.write(JSON.stringify({ data: "Request Entity too Large" }));
	}

	resp.end();
};

exports.send200 = function(req, resp) {	
	resp.writeHead(200, {"Content-Type":"application/json"} );
	resp.end();
};

exports.showHome = function(req, resp) {
	if (settings.httpMsgsFormat === "HTML") {
		resp.writeHead(200, {"Content-Type":"text/html"} );
		resp.write("<html><head><title>Home</title></head><body>Valid endpoints:<br>/members - GET - to list all Members<br>/members/<memId> - GET - to search for a member</body></html>");
	}
	else {
		resp.writeHead(200, {"Content-Type":"application/json"} );
		resp.write(JSON.stringify( [
			{url: "/members", operation: "GET", description: "To list all members"},
			{url: "/members/<memId>", operation: "GET", description: "To search for a member"} 
		]));
	}

	resp.end();
};