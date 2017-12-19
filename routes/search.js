const url = require('url');

const getuser = require('../lib/getuser');
const esrequest = require('../lib/esrequest');

function search(req, res) {
	const parsedUrl = url.parse(req.url, true);
	const username = parsedUrl.query.username;


	getuser(username, (error, posts) => {
		if (error) {
			return res.render('error.html', { error: error.message });
		}

		esrequest(posts);
		res.render('ready.html');
	});

}

module.exports = search;