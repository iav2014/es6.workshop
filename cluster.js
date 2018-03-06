// execute app_sync in multi core cluster
var app=require('./httpserver');
app.cluster();