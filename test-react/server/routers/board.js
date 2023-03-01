const express = require('express');
const router = express.Router();
const db = require('../db');

// 미들웨어
function isAuthenticated(req, res, next) {
    if (req.session.user) next();
    else res.json([]);
}

// 게시글 목록
router.get('/posts', isAuthenticated, (req, res) => {
    const sql = 'select * from board order by id desc';
    db.query(sql, (err, data) => {
        if (!err && data) {
            res.json(data);
        } else res.json(err);
    });
});

module.exports = router;
