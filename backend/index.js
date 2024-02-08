const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./configs/mongoose');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

connectToDatabase();

app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});