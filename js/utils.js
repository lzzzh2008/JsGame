var e = (selector) => document.querySelector(selector)
// var log = function(s) {
//     e('#id-text-log').value += '\n' + s
// }
var log = console.log.bind()

var imageFromPath = function(path) {
    var img = new Image()
    img.src = path
    return img
}

var reactAction = function(a, b) {
    if (b.y > a.y && b.y < a.y + a.image.height) {
        if (b.x > a.x && b.x < a.x + a.image.width) {
            return true
        }
    }
    return false
}
