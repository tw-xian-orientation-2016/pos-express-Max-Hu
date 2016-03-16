var express = require('express');
var router = express.Router();
var mongodb = require('./mongodb');
var bodyParser = require('body-parser')
router.use( bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));


router.get('/', function(req, res) {
    mongodb.getAll('items', function(allItems) {
        res.send(allItems);
    })
});

module.exports = router;
