var Block = function() {
    var image = imageFromPath('block.png')
    var o = {
        image: image,
        x: 0,
        y: 0,
        alive: true,
    }
    o.kill = function() {
        o.alive = false
    }
    o.collide = function(ball) {
        return o.alive && (reactAction(o, ball) || reactAction(ball, o))
    }
    return o
}
