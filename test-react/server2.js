var escapeHtml = require('escape-html');
var express = require('express');
var session = require('express-session');
var cors = require('cors');
const db = require('./server/db');
var app = express();

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

// middleware to test if authenticated
function isAuthenticated(req, res, next) {
    if (req.session.user) next();
    else next('route');
}

app.get('/', isAuthenticated, (req, res) => {
    // this is only called when there is an authentication user due to isAuthenticated

    res.send({ username: req.session.user });
});

app.get('/', (req, res) => {
    res.send(
        '<form action="/login" method="post">' +
            'Username: <input name="user"><br>' +
            'Password: <input name="pass" type="password"><br>' +
            '<input type="submit" text="Login"></form>',
    );
});

app.post(
    '/login',
    express.urlencoded({ extended: false }),
    (req, res, next) => {
        // login logic to validate req.body.user and req.body.pass
        // would be implemented here. for this example any combo works

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation

        const { user } = req.body;

        req.session.regenerate((err) => {
            if (err) next(err);

            // store user information in session, typically a user id
            req.session.user = user;

            // save the session before redirection to ensure page
            // load does not happen before session is saved
            req.session.save(function (err) {
                if (err) return next(err);
                res.redirect('/');
            });
        });
    },
);

app.get('/logout', (req, res, next) => {
    // logout logic

    // clear the user from the session object and save.
    // this will ensure that re-using the old session id
    // does not have a logged in user
    req.session.user = null;
    req.session.save(function (err) {
        if (err) next(err);

        // regenerate the session, which is good practice to help
        // guard against forms of session fixation
        req.session.regenerate(function (err) {
            if (err) next(err);
            res.redirect('/');
        });
    });
});

// 게시글 목록
app.get('/posts', isAuthenticated, (request, response) => {
    const sql = 'select * from board';
    console.log(request.session.user);
    db.query(sql, (err, data) => {
        if (!err && data) {
            response.send(data);
        } else console.error(err);
    });
});

app.listen(8080);
