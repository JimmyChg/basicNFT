const http = require("http")
const fs = require('fs').promises;
const express = require('express')
const app = require("./app")

app.use(express.static('public'));

const host = 'localhost';
const PORT = 8000;

const server = http.createServer(app);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));

