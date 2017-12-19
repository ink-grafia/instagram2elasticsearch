const http = require('http');

const render = require('./lib/render');

const public = require('./routes/public');
const home = require('./routes/home');
const search = require('./routes/search'); 
const notFound = require('./routes/notFound');

http.ServerResponse.prototype.render = render;

http.createServer((req, res) => {
	if(req.url.match(/\.(html|css|js|png)$/)) {
		public(req, res);
	} else if (req.url === '/') {
		home(req, res);
	} else if (req.url.startsWith('/search')) {
		search(req, res);
	} else {
		notFound(req, res);
	}
}).listen(5606, '5.79.97.23', () => console.log('Сервер работает'));