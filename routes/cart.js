var express = require('express');
var router = express.Router();
var mongodb = require('./mongodb');
var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

router.get('/', function(req, res, next) {
    res.render('cart', { title: 'ejs' });
});

router.get('/items/', function(req, res, next) {
    mongodb.getAll('cart', function(allItems) {
        res.send(allItems);
    })
});

router.post('/items/', function(req, res, next) {
    var cartItems = JSON.parse(req.body.cartItems);
    mongodb.removeData('cart',function(){
        mongodb.insertData('cart',cartItems);
    });
    res.send('success');
});

router.put('/items/', function(req, res, next) {
    var cartItem = JSON.parse(req.body.cartItems);
    mongodb.updateData('cart',cartItem);
    res.send('success');
});

router.delete('/items/:barcode', function(req, res, next) {
    var barcode = req.params.barcode;
    mongodb.removeOneData('cart',barcode,function(){
        res.send('success');
    });
});

router.delete('/', function(req, res, next) {
    mongodb.removeData('cart',function(){
        res.send('success');
    });
});
module.exports = router;
