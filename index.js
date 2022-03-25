const { response } = require('express');
//NeDB
const Datastore = require('nedb');
//express
const { request } = require('express');
const express = require('express');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

//giving path to a filename
const database = new Datastore('database.db');
//loads data into memory
database.loadDatabase();


app.post('/api', (request, response) => {
    console.log('I got a request');
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;
    database.insert(data);
    response.json({
        status: 'success',
        //adds timestamp to JSON object
        timestamp: timestamp,
        latitude: data.lat,
        longitude: data.lon
    });
});


