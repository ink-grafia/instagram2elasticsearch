const http = require('http');
const fs = require('fs');
const path = require('path');
const spawn = require("child_process").spawn;



function getInstaData(username, count, done) {
    console.log('imhere', username, count)

    let ls = spawn('java', ['-jar', path.resolve('files','instagram-data.jar'), username, count]);
    ls.on('close', (code) => {
        console.log("child process exited with code: " + code);
        let filename = 'output_' + username + '.json';
        console.log(filename);
        fs.readFile(path.resolve('.', filename), 'utf-8', (error, text) => {
            if (error) {
                done(error);
            }
            console.log(text)
            let result = null;
            try {
				result = JSON.parse(text);
			} catch (error) {
				done(error);
			}
            if (!result) return done('Ошибка запроса')
            done(null, result);
        }); 
    });
};

module.exports = getInstaData;