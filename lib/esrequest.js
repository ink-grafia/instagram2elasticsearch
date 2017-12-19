const fs = require('fs');
const path = require('path');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
    host: [
        {
          host: 'es-master-0.example.com',
          auth: 'admin:W8rCGJKYnDdc',
          protocol: 'https',
          port: 9200
        }
      ],
      ssl: {
          ca: fs.readFileSync(path.resolve('pki', 'chain.pem')),
          rejectUnauthorized: true
      }
});


function esRequest(findedData) {
    let receivedDate = new Date();
    for (let i = 0; i < findedData.medias.length; i++) {
        client.create({
            index: 'other',
            type: 'other',
            id: findedData.medias[i].id,
            body: findedData.medias[i],
          }, function (error, response) {
            if (error) {
                console.log(error);
            }
            return console.log(response);
          });
    }
}

module.exports = esRequest;