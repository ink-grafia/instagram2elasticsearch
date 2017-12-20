const url = require('url');

const getUser = require('../lib/getuser');
const esRequest = require('../lib/esrequest');

function search(req, res) {
	const parsedUrl = url.parse(req.url, true);
	const username = parsedUrl.query.username;
	const count = parsedUrl.query.count;


	getUser(username, count, (error, posts) => {
		if (error) {
			return res.render('error.html', { error: error.message });
		}

		esRequest(posts);
		res.render('ready.html');
	});

}

module.exports = search;