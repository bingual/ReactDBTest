const express = require('express');
const router = express.Router();
const db = require('../db');

// 회원가입
router.post('/signup', (req, res) => {
    const userData = req.body;
    const { username, password } = userData;
    const sql = 'insert into user values(null, ?, ?)';
    db.query(sql, [username, password], (err, data) => {
        if (!err) res.status(200).json({ result: 'ok' });
        else res.status(401).json(err);
    });
});

// 로그인
router.post('/login', (req, res, next) => {
    const userData = req.body;
    const { username, password } = userData;
    const sql = 'select * from user where username = ? and password = ?';

    db.query(sql, [username, password], (err, data) => {
        if (!err && data && data.length > 0) {
            // 전체 세션을 비우고 세션저장
            req.session.regenerate((err) => {
                if (err) next(err);
                req.session.user = data[0].username;

                // 세션이 저장되기전에는 실행되지않음
                req.session.save(function (err) {
                    if (err) return next(err);
                    res.status(200).json({
                        user: req.session.user,
                        isAuthenticated: true,
                    });
                });
            });
        } else res.status(401).json(err);
    });
});

// 로그아웃
router.post('/logout', (req, res, next) => {
    req.session.user = null;
    req.session.save(function (err) {
        if (err) next(err);
        req.session.regenerate(function (err) {
            if (err) next(err);
            res.json({ result: 'ok' });
        });
    });
});

module.exports = router;
