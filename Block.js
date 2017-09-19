var Block = function(position) {
    var p = position
    var image = imageFromPath('block.png')
    var o = {
        image: image,
        x: p[0],
        y: p[1],
        alive: true,
        lifes: p[2] || 1,
    }
    o.kill = function() {
        o.lifes -= 1
        if (o.lifes < 1) {
            o.alive = false
        }
    }
    o.collide = function(ball) {
        return o.alive && (reactAction(o, ball) || reactAction(ball, o))
    }
    return o
}
