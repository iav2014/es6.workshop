/**
 * async call examples
 * solution for lopp and call request
 *
 * @public
 */
var async = require('async');
var request = require('request');

function executeSyncloop(data, callback) {
	for (var i = 0; i < data.i; i++) {
		console.log(i);
	}
	callback(null, data);
}

function callAsyncUrl(data, callback) {
	let payload = {
		url: data.url
	};
	request.post(payload, function (err, response, body) {
		if (err) {
			console.error('>>> Application error: ' + err);
			callback(err);
			
		} else {
			console.log('call:' + data.url, ' ok!');
			callback(null, data);
		}
	});
}

function start(data, callback) {
	const async = require('async');
	let startTime = Date.now();
	async.waterfall([
			async.apply(executeSyncloop, {i: 100, url: 'https://google.es'}),
			callAsyncUrl
		], function (err, result) {
			callback(err, {
				results: result,
				duration: (Date.now() - startTime) / 1000
			});
		}
	);
}

start({}, function (err, result) {
	if (err) console.log(err);
	else {
		console.log(result);
		console.log('tis is the end!');
	}
});