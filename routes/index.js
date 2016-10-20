var express = require('express');
var router = express.Router();

var location = require('../socketServer/location');

/* GET home page. */
router.get('/', function(req, res, next) {
    var a5 = location.getMACList(300);
    var a30 = location.getMACList(1800);
    var aday = location.getMACList(3600*24);
    res.render('index', { title: 'Express', a5: a5, a30:a30, aday:aday });
});

module.exports = router;
