// 🔥 Node 7.6 has async/await! Here is a quick run down on how async/await works

var request = require('request');
function getCoffee() {
	return new Promise(resolve => {
		setTimeout(() => resolve('☕'), 2000); // it takes 2 seconds to make coffee
	});
}

async function go() {
	console.log('go1',new Date());
	try {
		// but first, coffee
		const coffee = await getCoffee();
		console.log(coffee); // ☕
		// then we grab some data over an Ajax request
		const wes = await request('https://api.github.com/users/wesbos');
		
		console.log('go2',new Date());
	  return('hola');
	} catch (e) {
		console.error(e); // 💩
	}
}

console.log('main',new Date());
/*
go().then(v=>console.log(v))
	.catch(err=>console.log(err));

console.log('main2',new Date());
*/
go();
console.log('sigo,,,');