var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
// example es6 sintax demo
//ES6 arrow example
var data = [{c: 1}, {c: 2}, {c: 3}];
data.forEach(elem => {
	console.log(elem);
});

// this context
var obj = {
	foo: function () {
		console.log('foo')
	},
	bar: function () {
		this.foo();
	}
}

// let private vars
function a() {
	var hello = 'hello';
	if (hello) {
		let world = 'world';
		console.log(hello, world); // works!
	}
	//console.log(hello,world); // not works
}

// concatenate strings
let hello = "hello";
let world = "world";
console.log(`=> ${hello}  ${world}`);

let grants = 'hello\
	world';
console.log(grants);

// assingnement
var obj = {myhello: 'hello', myworld: 'world'};
let {myhello, myworld} = obj;
console.log(myhello, myworld);

var helloworld = function () {
	return ['hello', 'world'];
};
var [fhello, fworld] = helloworld();
console.log(fhello, fworld);


function displayLog(trace = 'no data value to show in log') {
	console.log(trace);
};
displayLog('my trace'); // my trace
displayLog(); // no data value to show in log

function isReady(callback) {
	callback(null, 'hello');
}
function isReady2(callback) {
	callback(null, 'world');
}

function start() {
	//ES5
	isReady(function (err, result) {
		if (!err)
			console.log(result);
	});
	//ES6
	isReady2((err, result) => {
		if (!err) console.log(result);
	})
}

start();

var numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var cuadrados = numeros.map(function (n) {
	return n * n;
});

var cuadrados2 = numeros.map(n => n * n);
console.log(cuadrados, cuadrados2);

//ES5
function sumEs5(a, b) {
	return (a + b);
}

console.log(sumEs5(2, 2)); // 4
//ES6
var sumEs6 = (x, y) => x + y;
console.log(sumEs6(5, 1)); // 6


//ES6 classes use example

class Rectangulo  {
	constructor(base, altura) {
		this.base = base;
		this.altura = altura;
	}
	
	calcArea() {
		return this.base * this.altura;
	}
}

var r = new Rectangulo(5, 10);
console.log(r.calcArea()); // 50
 

// generators
function* order(){
	var n = 0; // 0 begin
	while(n<5) {
		n++;
		yield n;
	}
	
}

var generator = order();
console.log(generator.next()); // value: 1 done: false
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next());
console.log(generator.next()); // value: undefined, done: true!

//octal && binary && hexa sintax,
var numbers = [{notation:'binary',value:0b1010},{notation:'octal',value:0o12},{notation:'hexa',value:0xa}];
var x=numbers.map(item => {
	console.log(item);
});

// Sets
var s = new Set();
s.add("this").add("is").add("hello").add("world");
console.log(s.size === 4); // size is 4? : true
console.log(s.has("moon")); // false
console.log(s.has("hello")); // true! find it!

// Maps
var m = new Map();
m.set('alice', {dni:'1234567890Z'});
m.set('cooper', {dni:'9876543210A'});
console.log(m.get('alice')); // 1234567890Z

// Promise

function httpGet(url) {
	return new Promise(
		function (resolve, reject) {
			const request = new XMLHttpRequest();
			request.onload = function () {
				if (this.status === 200) {
					// Success
					console.log('success');
					resolve(this.responseText);
				} else {
					// Something went wrong (404 etc.)
					console.log('fail');
					reject(new Error(this.statusText));
				}
			};
			request.onerror = function () {
				reject(new Error(
					'XMLHttpRequest Error: '+this.statusText));
			};
			request.open('GET', url);
			request.send();
		});
}
function timeout(ms, promise) {
	return new Promise(function (resolve, reject) {
		promise.then(resolve);
		setTimeout(function () {
			reject(new Error('Timeout after '+ms+' ms')); // (A)
		}, ms);
	});
}
timeout(1000, httpGet('http://82.223.249.111/contenido/aa.html'))
	.then(function (value) {
		console.log('Contents: ' + value);
	})
	.catch(function (reason) {
		console.error('Error or timeout', reason);
	});