var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('receiptList', { title: 'ejs' });
});

module.exports = router;
