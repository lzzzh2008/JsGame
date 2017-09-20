var Block = function(position, game) {
    var p = position
    var o = game.imageByName('block')
        // o.image = image
        o.x =  p[0]
        o.y =  p[1]
        o.alive = true
        o.lifes = p[2] || 1

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
