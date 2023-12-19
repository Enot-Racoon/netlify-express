'use strict';
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');

const router = express.Router();

const baseStyle = `
<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
</style>`;
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write(`${baseStyle}<h2>Hello from Express.js!</h2>`);
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));

app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, './index.html')));

module.exports = app;
module.exports.handler = serverless(app);
