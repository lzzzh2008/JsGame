// var levels = [
//     [
//         [0, 0,],
//         [100, 100,2],
//         [80, 50,3],
//         [150, 100],
//         [80, 90],
//         [100, 160],
//         [200, 150],
//         [300, 90],
//         [320, 80],
//     ]
// ]
var levels = function() {
    var ary = []
    var blockNum = randNum(5, 15)
    for (var i = 0; i < blockNum; i++) {
        var lives = randNum(1, 3)
        var ranX = randNum(0, 350)
        var ranY = randNum(0, 180)
        var temp = [ranX, ranY, lives]
        ary.push(temp)
    }
    return ary
}
//min-max之间的随机整数，包含自身
var randNum = function(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min
}
