const express = require('express');
const cors = require('cors');
const app = express();

require('dotenv').config();
require('./configs/mongodb');

app.use(express.json());  //middleware to parse json
app.use(express.urlencoded({extended: true}));

app.use(cors({origin: '*'}));

app.use('/',require('./routers/userRouters')); //dynamic routing

const port = process.env.PORT || 5000;

app.listen(port, () => console.log('Server running at ' + port + '...'));
