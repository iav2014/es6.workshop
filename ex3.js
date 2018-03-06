/**
 * async call examples
 * mongodb calls && how to avoid callback hells
 *
 * @public
 */
var config = require('./config/config');
var MongoClient = require('mongodb').MongoClient;
var mongo = require('mongodb');
var request = require('request');

function mongodbConnect(data, callback) {
	mongo.connect(data.uri, data.options, function (err, db) {
		if (err) {
			console.error(err);
			return callback(err);
		}
		else {
			console.log('connected to mongodb!');
			callback(null, {db: db, value: '', count: 0});
		}
	});
}

function mongodbCount(data, callback) {
	data.db.collection('million', function (e, coll) {
		coll.find({cid: data.value}, {}).count(function (e, count) {
			console.log(data.value, count);
			data.count += count;
			callback(null, data);
		});
	});
}

function close(data, callback) {
	if (data.db.close()) {
		console.log('db closed!');
	}
	callback(null, data);
}

function adapter(data, callback) {
	console.log('total', data.count);
	callback(null, 'done!');
}

function getCoffee() {
	return new Promise(resolve => {
		setTimeout(() => resolve('☕'), 2000); // it takes 2 seconds to make coffee
	});
}

 async function go(data,callback) {
	console.log(callback);
	console.log('go-init', new Date());
	try {
		// but first, coffee
		const coffee = await getCoffee();
		console.log(coffee); // ☕
		// then we grab some data over an Ajax request
		const wes = await request('https://api.github.com/users/wesbos');
		
		callback(null,'go-end');
		
	} catch (e) {
		console.error(e); // 💩
		callback(e);
	}
}
function goo(data,callback){
	var r=go(data,function(err,result){
		console.log(err,result);
		callback(null,'done')
	});

}
function start(data, callback) {
	const async = require('async');
	/*
	go({},function(err,result){
		console.log(err,result);
	});
	*/
	let startTime = Date.now();
	async.waterfall([
			async.apply(mongodbConnect, data),
			function (data, callback) {
				data.value = 'EL', callback(null, data)
			},
			mongodbCount,
			function (data, callback) {
				data.value = 'SH', callback(null, data)
			},
			mongodbCount,
			function (data, callback) {
				data.value = 'BK', callback(null, data)
			},
			mongodbCount,
			close,
	  
			adapter,
		 goo
		
		], function (err, result) {
			callback(err, {
				results: result,
				duration: (Date.now() - startTime) / 1000
			});
		}
	);
}

start(config.nosql.test, function (err, result) {
	if (err) console.log(err);
	else console.log(result);
});
