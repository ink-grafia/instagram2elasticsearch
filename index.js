const express = require('express');
const bodyParser = require('body-parser');
const getInstaData = require('./lib/getuser.js');
const esRequest = require('./lib/esrequest');
const util = require('util');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser());

app.get("/", (req, res) => res.render('index', { title: 'Insta-phie' }));
app.post('/search', (req, res) => {
  const { userName, count } = req.body;

  if (!userName) {
    res.render('ready');
  }

  const getInstaDataPS = util.promisify(getInstaData);
  getInstaDataPS(userName, count)
    .then(esRequest)
    .then(data => { console.log("LLLLL"); res.render('ready') })
    .catch(err => console.error(err));
})

const port = 5555;
app.listen(port, '5.79.97.23', () => `Server up on: ${port}`);