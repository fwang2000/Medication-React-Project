const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = require('./routes/routes.js')(app);

const server = app.listen(5000, ()=> {
    console.log('Listening on port %s...', server.address().port);
});