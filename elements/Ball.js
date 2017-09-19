var Ball = function() {
    var image = imageFromPath('./img/ball.png')
    var o = {
        image: image,
        x: 100,
        y: 150,
        // height: 63,
        // width: 87,
        speedX: 8,
        speedY: 8,
        fired: false,
    }
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

    return o
}
