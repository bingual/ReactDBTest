const express = require('express');
const session = require('express-session');
const cors = require('cors');
const app = express();
const accounts = require('./routers/accounts');
const board = require('./routers/board');

// 외부인증 설정
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true,
    }),
);

app.use(
    session({
        secret: 'keyboard cat',
        resave: false,
        saveUninitialized: true,
    }),
);

// 계정관련
app.use('/accounts', accounts);

// 게시글관련
app.use('/', board);

// 서버 포트설정
app.listen(8080, () => {
    console.log('listening on 8080');
});
