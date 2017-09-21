var Scene = function(game) {
    var s = {
        game: game,

    }
    var paddle = Paddle(game)
    var ball = Ball(game)

    // var score = 0

    var blocks = loadLevel(1, game)

    var restBlocks = 0

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
                restBlocks += 1
                s.nextScene()
                //变速
                s.speedUp(0.2)
                //计算得分
                game.score += 100
                s.updateScore()


                ball.rebound()
            }
            // if (i == blocks.length - 1) {
            //     var next = new SceneNext(game)
            //     game.replaceScene(next)
            // }
        }
    }
    s.blockLifes = function() {
        var lifes = 0
        for (var i = 0; i < blocks.length; i++) {
            lifes += blocks[i].lifes
        }
        return lifes
    }
    var lifes = s.blockLifes()
    s.nextScene = function() {

        if (restBlocks == lifes) {
            game.level += 1
            var nextS = Scene(game)
            game.replaceScene(nextS)
        }
    }

    s.speedUp = function(speedMultiple) {
        if (ball.speedX > 9 || ball.speedX < -9) {
            return
        }
        ball.speedX = ball.speedX > 0 ? ball.speedX + speedMultiple :  ball.speedX - speedMultiple
        ball.speedY = ball.speedY > 0 ? ball.speedY + speedMultiple :  ball.speedY - speedMultiple
        // log("speed ball",ball.speedX)
    }
    s.updateScore = function() {
        var scoreLabel = e("#id-div-score")
        if (scoreLabel != undefined) {
            scoreLabel.remove()
        }
        var html = `<div class="panel-body" id="id-div-score">
            <p>得分：${game.score}</p>
            <br/>
            <p>第${game.level}关</p>
        </div>`
        e("#id-div-scorePanel").insertAdjacentHTML('beforeend', html)

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
