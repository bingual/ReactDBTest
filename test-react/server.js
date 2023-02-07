const express = require('express');
const path = require('path');
const db = require('./src/db');
const app = express();

// 서버 포트설정
app.listen(8080, () => {
    console.log('listening on 8080');
});

// 외부인증 설정
app.use(express.json());
var cors = require('cors');
app.use(cors());

// static 설정
app.use(express.static(path.join(__dirname, '/build')));

// router 설정
app.get('/', (request, response) => {
    response.sendFile(path.join(__dirname, '/build/index.html'));
});

// db설정
app.get('/products', (request, response) => {
    db.query('SELECT * FROM test', (err, data) => {
        if (!err) response.send({ products: data });
        else response.send(err);
    });
});
