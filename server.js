const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser')
const cors = require('cors');
const notify = require('./api/');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// serve site resources
app.use(express.static(__dirname + '/docs/resources'));
app.use(['/api/docs', '/api/'], express.static(__dirname + '/docs/resources'));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.redirect('/api/docs');
});

app.use('/api/', notify);

app.listen(PORT, () => console.log(`notify is running on port *${PORT}`));
