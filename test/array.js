
var arr = [1, 2, 3, 4, 5, 6, 7];
for (var item in arr) {
    if (arr[item] % 2 == 0) arr.splice(item, 1);
}
for (var item in arr) {
    console.log(`${item} ${arr[item]}`);
}
