var express = require('express');
var router = express.Router();
var mongodb = require('./mongodb');
var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));
var loader = require('./loader');

router.post('/', function(req, res) {
    //var items = loader.loadItems();
    var collection = req.body.collection;
    //console.log(cartItems);
    mongodb.removeData(collection,function(){
        res.send('success');
    });
});

module.exports = router;
