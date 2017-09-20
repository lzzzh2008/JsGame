var Scene = function(game) {
    var s = {
        game: game,

    }
    var paddle = Paddle(game)
    var ball = Ball(game)

    var score = 0

    var blocks = loadLevel(1, game)

    game.registerAction('a', function(){
        paddle.moveLeft()
    })
    game.registerAction('d', function(){
        paddle.moveRight()
    })
    game.registerAction('f', function(){
        ball.fire()
    })

    s.draw = function() {
        //画背景
        game.context.fillStyle = "lightblue"
        game.context.fillRect(0, 0, 400, 300)
        //draw
        game.drawImage(paddle)
        game.drawImage(ball)
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.alive) {
                game.drawImage(block)

            }
        }
        //draw labels
        game.context.fillText('分数:' + score, 320, 20)
    }

    s.update = function() {
        if (paused) {
            return
        }
        ball.move()
        if (ball.y > paddle.y + 20) {
            var end = SceneEnd(game)
            game.replaceScene(end)
        }

        if (paddle.collide(ball)) {
            ball.rebound ()
        }
        //判断ball和block相撞
        for (var i = 0; i < blocks.length; i++) {
            var block = blocks[i]
            if (block.collide(ball)) {
                block.kill()
                score += 100
                ball.rebound()
            }
        }
    }
    //mouse  event
    var  enableDrag = false
    game.canvas.addEventListener('mousedown', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        //判断是否点中ball
        if (ball.hasPoint(x, y)) {
            //设置拖拽状态
            enableDrag = true
        }
    })
    game.canvas.addEventListener('mousemove', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        if (enableDrag) {
            ball.x = x
            ball.y = y
        }
    })
    game.canvas.addEventListener('mouseup', function(event) {
        var x = event.offsetX
        var y = event.offsetY
        enableDrag = false
    })
    return s
}
