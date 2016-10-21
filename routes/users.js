var express = require('express');
var router = express.Router();
var user = require('../socketServer/user');
var location = require('../socketServer/location');

/* GET users listing. */
router.get('/', function(req, res, next) {
    // var parameters =
    // res.send(req.toString());
    var query = req.query;
    var maclist = location.getMACList(60 * 10);
    var userlist = {};
    for (var index in maclist) {
        var name = user.getUserName(maclist[index]);
        if (name) userlist[maclist[index]] = name;
    }
    res.send(JSON.stringify(userlist));
});

module.exports = router;
