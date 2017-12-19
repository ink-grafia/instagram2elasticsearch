const http = require('http');
const fs = require('fs');
const path = require('path');

function getuser(username, done) {

    if (username === 'init') {
        let userdata;
        fs.readFile(path.resolve('files', 'output_zuck.json'), 'utf-8', (error, text) => {
            if (error) {
                done(error);
            }

            try {
				result = JSON.parse(text);
			} catch (error) {
				done(error);
			}
            
            done(null, result);
        }); 
    }
};

module.exports = getuser;