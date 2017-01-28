var express = require('express');

var bodyParser = require('body-parser');
var path = require('path');
var pug = require('pug');

var app = express();

app.use(function(req,res,next){
	console.log('Time :',Date.now());
	next();
});

//app.set('view engine','pug');
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res){
	res.render('index',{
		title:'Hello World',
		showTitle:true,
		people: ['John','Steve','James']
	});
})

/*app.get('/about', function(req,res){
	res.send('This is the about page!');
})*/

app.listen(3000);
console.log('Server started on 3000');


module.exports = app;