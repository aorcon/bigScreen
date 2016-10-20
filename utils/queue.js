(function() {

var queue = function(){
    this.remove = function (data) {return false};
    this.first = data.createData(null, null, null);
    this.last = data.createData(null, this.first, null);
    this.first.next = this.last;
};

queue.prototype.length = function(){
    var count = 0;
    var pointer = this.first;
    while (pointer.next !== this.last){
        pointer = pointer.next;
        count ++;
    }
    return count;
}
queue.prototype.append = function(adata){
    var d = data.createData(adata, this.last.previous, this.last);
    this.last.previous.next = d;
    this.last.previous = d;
}
queue.prototype.pop = function(){
    if (this.empty()) return null;
    var d = this.first.next;
    this.first.next = d.next;
    this.first.next.previous = this.first;
    var d1 = d.data;
    delete d;
    return d.data;
}
queue.prototype.empty = function () {
    if (this.first.next === this.last) return true;
    return false;
};
queue.prototype.print = function(){
    var d = this.first;
    // console.log(d.next.data);
    while((d = d.next) != this.last) console.log(`==>${d.data}`);
}


var data = function(){
    this.previous = null;
    this.next = null;
    this.data = null;
    // if (data === undefined) this.data = null;
}
data.createData = function(adata, pre, next){
    var d = new data();
    d.previous = pre;
    d.next = next;
    d.data = adata;
    return d;
}

exports = module.exports = queue;

// var q = new queue();
// q.append('a');
// q.append('b');
// q.print();
// console.log(q.pop());
// console.log(q.pop());
// console.log(q.pop());
// q.print();


}.call(this));
