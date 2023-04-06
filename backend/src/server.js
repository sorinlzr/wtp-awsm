const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 5000;

app.get('/', function (req, res) {
    // res.json(src/json/greeting.json);
    const filePath = path.join(__dirname, 'json/greeting.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(JSON.parse(data));
        }
    });

})

app.listen(port, () => {
    console.log(`Now listening on port ${port}`);
});


