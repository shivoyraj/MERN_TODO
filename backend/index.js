const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./configs/mongoose');
const routes = require('./routes');

const app = express();
const cors = require('cors');

app.use(bodyParser.json());

connectToDatabase();

app.use(cors());
app.use('/', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});