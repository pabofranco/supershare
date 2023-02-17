const path = require('path');
const express = require('express');
const bparser = require('body-parser');
const cors = require('cors');
const { server: { host, port } } = require('./config/Settings.json');

// server setup
const server = express();

server.use(bparser.json());
server.use(cors());

// routes
const mainRoute = require('./routes/main');

// route-binding
server.use('/', mainRoute);

// server start
server.listen(port, host, () => console.log(`API online at http://${host}:${port}`));