(function() {

var fs = require('fs');
var readline = require('readline');
var _ = require('underscore');

//global mac : lastTime cache
var cache = {};
//global table data
var table = [];

var lineReader = require('readline').createInterface({
    input: fs.createReadStream('./socketServer/people.txt')
});

var getUserName = function(mac){
    var name = '';
    var obj = cache[mac];
    if (obj) name = obj.name;
    return name;
}

lineReader.on('line', (input) => {
    var space = [' ', '\t'];
    var pieces = [];
    var lead = '';
    for (var i = 0; i < input.length; i++) {
        // console.log(i, input.charAt(i), _.indexOf(space, input.charAt(i)), pieces, lead.length);
        if (_.indexOf(space, input.charAt(i)) > -1){
            if (lead.length > 0){
                pieces[pieces.length] = lead;
                lead = '';
            }else{
                //Do nothing
            }
        }else{
            lead = lead + input.charAt(i);
        }
    }
    if (lead.length > 0) pieces[pieces.length] = lead;
    valid(pieces, saveToCache);
    // lead = '';
    // for (var i = 0; i < pieces.length; i++) {
    //     lead = lead + `[${pieces[i]}]`;
    // }
    // console.log(`input: ${input} ${lead}`);
});

var valid = function(dataArray, callback){
    var data = {};
    if (dataArray.length > 2){
        //姓名 、 性别、 职位、 手机号、 小米账号、 MAC
        var funcs = [validName, validGender, validState, validMobile, validMiID, validMAC];
        for (var i = 0; i < dataArray.length; i++){
            for(var j = 0; j < funcs.length; j++){
                if (funcs[j](dataArray[i])){
                    data[funcs[j](dataArray[i])] = dataArray[i];
                    funcs.splice(j, 1);
                }
            }
        }
        callback(data);
            // console.log(dataArray);
            // console.log(data);
    }

}
var saveToCache = function(data){
    table.push(data);
    if (data.mac) cache[data.mac] = data;
}
function validName(name){
    if (name.length > 1) return 'name';
    return false;
}
function validGender(gender){
    if (_.indexOf(['男','女'], gender) > -1) return 'gender';
    return false;
}
function validMobile(mobile){
    if ((mobile.length == 11) && (mobile.charAt(0)=='1'))return 'mobile';
    return false;
}
function validMiID(miid){
    if (miid.length > 10) return false;
    for (var i = 0; i < miid.length; i++) {
        if (_.indexOf(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'], miid.charAt(i)) == -1) return false;
    }
    return 'miid';
}
function validState(state){
    if (_.indexOf(['员工', '离职员工', '管理员'], state) > -1) return 'state';
    return false;
}
function validMAC(mac){
    if (mac.length != 12) return false;
    for (var i = 0; i < mac.length; i++) {
        if (_.indexOf(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'a', 'b', 'c', 'd', 'e', 'f'],
            mac.charAt(i)) == -1) return false;
    }
    return 'mac';
}


var _user = {};
_user.cache = cache;
_user.table = table;
_user.getUserName = getUserName;

exports = module.exports = _user;


}.call(this));
