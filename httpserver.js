/**
 * http server example
 * can be started in single && cluster mode
 *
 * @public startSingle && startCluster
 */

var logger = require('./lib/logger/logger').logger(__filename);
var cluster = require('cluster');
var bodyParser = require('body-parser');
var config = require('./config/config');
var middleware = require('./lib/middleware/requestBody');
var morgan = require('morgan');
var express = require('express');
var theHTTPLog = morgan(config.morgan.trace, config.morgan.stream);
var app = express();

function startSingle() {
	function encoder (str) {
		var encoded = "";
		for (var i = 0; i < str.length; i++) {
			var a = str.charCodeAt(i);
			var b = a ^ 377829123;
			encoded = encoded + String.fromCharCode(b);
		}
		return encoded;
	}
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(theHTTPLog);
	app.use(middleware.requestBodyParams);
	app.use(bodyParser.json({limit: '5mb'}));
	app.use(express.static(process.cwd() + '/public')); // for public contents
	app.get('/listen', function (req, res) {
		logger.debug('get method called');
		logger.debug(JSON.stringify(req.params));
		res.sendStatus(200);
	});
// start the http server ...
	app.listen(3000, function () {
		logger.warn('HTTPSERVER - listening on port 3000!');
		
	});
	
	/**
	 * listen callback rest service
	 *
	 * @returns http code 200
	 * @public
	 */
	app.post('/listen', function (req, res) {
		res.sendStatus(200);
	});
	app.get('/main', function (req, res) {
		if (!req.query.token) {
			res.sendStatus(403);
		} else {
			logger.debug('[autenticated!]');
			var userAuth = encoder(req.query.token);
			logger.debug(userAuth);
			res.send(userAuth);
		}
	});
}

function startCluster() {
	if (!cluster.isMaster) {
		startSingle();
	}
	else {
		var threads = require('os').cpus().length;
		while (threads--) cluster.fork();
		cluster.on('death', function (worker) {
			cluster.fork();
			logger.info('Process died and restarted, pid:', worker.pid);
		});
	}
}

module.exports.single = startSingle;
module.exports.cluster = startCluster;



