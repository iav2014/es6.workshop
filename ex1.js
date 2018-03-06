/**
 * async call examples
 * loop counter & async call
 *
 * @public
 * 
 */
var request=require('request');
let payload = {
	url: 'https://google.es'
};
request.post(payload, function (err, response, body) {
	console.log('making request...');
	if (err) {
		console.error('>>> Application error: ' + err);
		
	} else {
		console.log('done request!');
		console.log('cuando llegas aquim ha hcho primero el for y despues la request');
	}
});
for(var i=0;i<100;i++){
	console.log(i);
};
console.log('this is the end?');
