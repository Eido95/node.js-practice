// http://www.tutorialspoint.com/nodejs/nodejs_event_loop.htm
// https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_http
const http = require("http");
const fs = require("fs");
const express = require("express");
const events = require("events");

const eventEmitter = new events.EventEmitter();

var buffer = new Buffer(10);


var connectionCounter = 0;
var serverPort = 8081;
var serverHostname = "localhost";
var text = "Tutorials Point is giving self learning content to teach the world in simple and easy way!!!!!";



eventEmitter.on("connected (" + connectionCounter + ")", function() {
	console.log("connection successful. (" + ++connectionCounter + ")");

	eventEmitter.emit("data_received");
});

eventEmitter.on("data_received", function() {
	console.log("data received successfully.");
});

var server = http.createServer(function (request, response) {
	eventEmitter.emit("connected (" + connectionCounter + ")");
	// This function will be invoked whenever a connection established.
	//
	// response
	// Class: http.ServerResponse
	// https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_class_http_serverresponse
	//
	// Sends a response (following HTTP header) header to the request:
	// HTTP Status: 200 : OK
	// Content Type: text/plain
	response.writeHead(200, {
		"Content-Type": "text/plain"}
		);
	//console.log("Connection has been established with " + );

	// Send the response body as "Hello World"
	response.end("Hello Kido!");

});
// https://nodejs.org/dist/latest-v4.x/docs/api/http.html#http_server_listen_port_hostname_backlog_callback
// Begin accepting connections on the specified port and hostname.
server.listen(serverPort, serverHostname);

console.log("Server running at http://" + serverHostname + ":" + serverPort + "/");

fs.open(__dirname + "/input.txt", "r", function(error, fd) {
		var rs = fs.createReadStream(null, {
			encoding: "utf-8",
			start: 1,
			autoClose: true,
			fd: fd
	});

	rs.on("readable", () => {
		console.log("readable!");
		var chunk;
		while (true) {
			rs.pause();
			// TODO: figureout why this is not halting the program.
			// http://www.tutorialspoint.com/nodejs/nodejs_event_loop.htm
			setTimeout(() => {

    		//readable.resume();
  		}, 1000);
			chunk = rs.read(5);
			if (chunk == null) {
				//console.log("Closed stream. ");
				//break;
			}
			else {
				console.log(chunk.toString("utf-8"));
			}
		}
	});

	console.log("start reading " + rs.path);

	console.log("reading is stream is paused? " + rs.isPaused());

});
//var inputText = fileSystem.readFileSync(__dirname + "/input.txt", "utf-8");
//console.log(inputText);
//fileSystem.writeFile(__dirname + "/input", text, function (error) {
//	if (error) {
//		return console.log(error);
//	}
//	else {
//		console.log("File written successfully to " + __dirname);
//	}
//});

console.log("Program Ended.");
