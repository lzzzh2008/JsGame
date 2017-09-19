var Paddle = function() {
    var image = imageFromPath('paddle.png')

    var o = {
        image: image,
        x: 100,
        y: 250,
        // width: 163,
        // height: 23,
        speed: 5,
    }
    var paddle = o
    o.moveLeft = function() {
        if (o.x > 0) {
            paddle.x -= paddle.speed
        }
    }
    o.moveRight = function() {
        if (o.x + o.image.width < 400) {
            paddle.x += paddle.speed
        }
    }
    o.collide = function(ball) {
        if (ball.y + ball.image.height > o.y) {
            if ((ball.x > o.x && ball.x < o.x + o.image.width)||(ball.x < o.x && ball.x + ball.image.width > o.x)) {
                log('bingo')
                return true
            }
        }
        return false
    }
    return o
}
