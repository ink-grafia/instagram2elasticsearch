const PORT = 5555;
const ADDRESS = '';

const http = require('http');

const render = require('./lib/render');

const public = require('./routes/public');
const home = require('./routes/home');
const search = require('./routes/search'); 
const notFound = require('./routes/notFound');

http.ServerResponse.prototype.render = render;

let server = http.createServer((req, res) => {
	if(req.url.match(/\.(html|css|js|png)$/)) {
		public(req, res);
	} else if (req.url === '/') {
		home(req, res);
	} else if (req.url.startsWith('/search')) {
		search(req, res);
	} else {
		notFound(req, res);
	};
	if (process.getgid() === 0) {
		process.setgid('nobody');
		process.setuid('nobody');
	}
});
server.listen(PORT, ADDRESS, () => console.log('Сервер работает'));


process.on('SIGTERM', function () {
    if (server === undefined) return;
    server.close(function () {
        // Disconnect from cluster master
        process.disconnect && process.disconnect();
    });
});
