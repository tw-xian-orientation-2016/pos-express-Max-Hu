var express = require('express');
var router = express.Router();
var mongodb = require('./mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('receiptList', { title: 'ejs' });
});

router.get('/receipt/', function(req, res, next) {
    mongodb.getAll('receipts', function(allItems) {
        res.send(allItems);
    })
});

router.post('/', function(req, res, next) {
    var receipt = JSON.parse(req.body.receipt);
    mongodb.insertData('receipts',receipt);
    res.send('success');
});

module.exports = router;
