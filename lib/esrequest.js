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
    const requests = findedData.medias.map((el) => client.create({ index: 'other', type: 'other', id: el.id, body: el }));
    return Promise.all(requests).catch(() => Promise.resolve());
}

module.exports = esRequest;
