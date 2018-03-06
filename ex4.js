/**
 * ES5 && ES6 examples
 *
 *
 * @public
 */
// example es6 sintax demo
//ES6 arrow example
	console.log('[ES6] arrow operator example');
var data = [{ c: 1 }, { c: 2 }, { c: 3 }];
data.forEach(elem => {
	console.log(elem);
});

// this context
console.log('[ES6 & ES5] "this" context');
var obj = {
	foo: function () {
		console.log('foo');
	},
	bar: function () {
		this.foo();
	}
};
obj.bar();

console.log('[ES6] let & const vars')
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
console.log(`[ES6] concatenate string => ${ hello }  ${ world }`);

let grants = 'hello\
	world';
console.log(grants);

// assingnement
var obj = { myhello: 'hello', myworld: 'world' };
let { myhello, myworld } = obj;
console.log('ES6 assingnement',myhello, myworld);

var helloworld = function () {
	return ['hello', 'world'];
};
var [fhello, fworld] = helloworld();
console.log('ES6',fhello, fworld);

function displayLog(trace = 'no data value to show in log') {
	console.log(trace);
};
displayLog('my trace'); // my trace
displayLog(); // no data value to show in log

// generator

function* sequencial(){
	var c=0;
	while(true){
		c++;
		yield c;
	}
}

var g=sequencial();
console.log('generator',g.next());
console.log('generator',g.next());

console.log('[ES6] propagador')
// ES5
var arr1 = [0, 1, 2];
var arr2 = [3, 4, 5];
Array.prototype.push.apply(arr1, arr2);
console.log(arr1);
// ES6
var arr11 = [0, 1, 2];
var arr22 = [3, 4, 5];
arr11.push(...arr22);
console.log(arr11);