(function() {

var loclog = require('../utils/log').getLogger('location');
var logger = require('../utils/log').getLogger();
var _ = require('underscore');

var Queue = require('../utils/queue');
var queue = new Queue();
var ht = {};
var count = 0;

/*
 * mac: bracelet tag,
 * data: HBeacon data,
 * name: username
 */
var saveLocationData = function(mac, data, name){
    var date = Date.now();
    mac = mac.toUpperCase();
    var dateStr = new Date(date).toISOString();
    var dataStr = JSON.stringify(data);
    if (name) loclog.info(`${dateStr} ${mac} ${dataStr} ${name}`);
    else loclog.info(`${dateStr} ${mac} ${dataStr}`);
    var newDate = {
        date : date,
        mac : mac,
        data : data
    }

    //action counter
    count ++;

    //save to queue
    // queue.append(newDate);

    //save to hashtable
    ht[mac] = date;
}

//last: 截止到当前多少秒内的mac数组
var getMACList = function(last){
    var date = Date.now();
    var array = [];
    last = last * 1000;
    _.each(ht, (value, key, list) =>{
        if (date - value < last) array.push(key);
    });
    return array;
}

// ht = {
//     'one' : 1,
//     'two' : 2,
//     'three' : 3
// }
// console.log( getMACList(1));

var _location = {};
// _location.cache = cache;
// _location.table = table;
_location.saveLocationData = saveLocationData;
_location.getMACList = getMACList;

exports = module.exports = _location;


}.call(this));
