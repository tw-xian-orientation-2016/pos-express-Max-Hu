var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('receiptList', { title: 'ejs' });
});

router.get('/receipt/', function(req, res, next) {
    var collection = req.body.collection;
    mongodb.getAll(collection, function(allItems) {
        res.send(allItems);
    })
});

router.post('/', function(req, res, next) {
    var cartItems = JSON.parse(req.body.cartItems);
    mongodb.insertData('cart',cartItems);
    res.send('success');
});

module.exports = router;
