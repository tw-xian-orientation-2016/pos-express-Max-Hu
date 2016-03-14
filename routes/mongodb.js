
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/pos';
var loader = require('./loader');

function initDB(){

    var items = loader.loadItems();
    items.forEach(function(element){
        insertData('items',element);
    });
}

function getAll(collection, globalCallback){
    var itemsList = [];

    var findItems = function(db, callback) {
        var cursor =db.collection(collection).find( );
        cursor.each(function(err, doc) {
            assert.equal(err, null);
            if (doc != null) {
                callback(doc);
            } else {
                globalCallback(itemsList);
            }
        });
    };
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findItems(db, function(doc) {
            itemsList.push(doc);
            db.close();
        });
    });
    return itemsList;
}


function insertData(collection,objects){
    insertDocument = function(db, callback) {
        db.collection(collection).insert(objects,
            function(err, result) {
            assert.equal(err, null);
            //console.log("Inserted a document into the restaurants collection.");
            callback();
        });
    };
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        insertDocument(db, function() {
            db.close();
        });
    });
}

function removeData(collection,insertData){
    var deletDocument = function(db) {
        db.collection(collection).remove();
        db.close();
        insertData();
    };
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        deletDocument(db);
    });
}


exports.initDB = initDB;
exports.getAll = getAll;
exports.insertData = insertData;
exports.removeData = removeData;