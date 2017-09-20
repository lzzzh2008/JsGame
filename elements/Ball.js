var Ball = function(game) {
    var o = game.imageByName('ball')

        o.x =  130
        o.y = 240
        // height: 63,
        // width: 87,
        o.speedX = 6
        o.speedY = -8
        o.fired = false
    o.move = function() {
        if (o.fired) {
            // log('move')
            if (o.x < 0 || o.x + o.image.width > 400) {
                o.speedX *= -1
            }
            if (o.y < 0 || o.y + o.image.height > 300) {
                o.speedY *= -1
            }
            //move
            o.x += o.speedX
            o.y += o.speedY
        }
    }
    o.fire = function() {
        o.fired = true
    }
    o.rebound = function() {
        o.speedY *= -1
    }
    o.hasPoint = function(x, y) {
        var xIn = x >= o.x && x <= o.x + o.w
        var yIn = y >= o.y && y <= o.y + o.h
        return xIn && yIn
    }

    return o
}
