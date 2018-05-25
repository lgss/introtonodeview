var restify = require('restify');
var nunjucks = require('nunjucks');
var request = require('request');
var rp = require('request-promise');

var server = restify.createServer();
server.use(restify.plugins.bodyParser());

nunjucks.configure('templates',{autoescape: true});

server.get('/person/:id', function(req, res){
	var person;
	rp('https://pacific-harbor-33237.herokuapp.com/person/' + req.params.id).then(function(body){
		person = JSON.parse(body);
		console.log(person);

		var body = nunjucks.render('training.html', {person : 
			person.person});
		res.writeHead(200,{
			'Content-Length': Buffer.byteLength(body),
			'Content-Type': 'text/html' 
		});
		res.write(body);
		res.end();
	}).catch( function(err){
		console.log(err);
	});
});


server.get('/person', function(req, res){
	var persons;
	rp('https://pacific-harbor-33237.herokuapp.com/person').then( function(body){
		persons = JSON.parse(body);
		console.log(persons)

		var body = nunjucks.render('list.html', {persons :
			persons});
		res.writeHead(200,{
			'Content-Length': Buffer.byteLength(body),
			'Content-Type': 'text/html' 
		});
		res.write(body);
		res.end();
	}).catch( function(err){
		console.log(err);
	});
});

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});