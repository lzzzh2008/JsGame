var loadLevel = function(n, game) {
    n = n - 1
    var level = levels[n]
    var blocks = []
    for (var i = 0; i < level.length; i++) {
        var p = level[i]
        var b = Block(p, game)
        blocks.push(b)
    }
    return blocks
}
var blocks = []
var enableDebugMode = function(enable, game) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        var k = event.key
        if (k == 'p') {
            paused = !paused
            log("暂停")
        }else if ('123456789'.includes(k)) {
            blocks = loadLevel(Number(k), game)
        }
    })
    //控制滑条
    e('#id-input-speed').addEventListener('input', function(event) {
        var input = event.target
        window.fps = Number(input.value)
        // log(window.fps)
    })
}
var __main = function () {

    var images = {
        ball: 'img/ball.png',
        block: 'img/block.png',
        paddle: 'img/paddle.png',
    }

    var game = GuaGame(images, function(g){
        // console.log(g.images)
        var paddle = Paddle(game)
        var ball = Ball(game)

        var score = 0

        blocks = loadLevel(1, game)

        game.registerAction('a', function(){
            paddle.moveLeft()
        })
        game.registerAction('d', function(){
            paddle.moveRight()
        })
        game.registerAction('f', function(){
            ball.fire()
        })


        game.update = function() {
            if (paused) {
                return
            }
            ball.move()
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

        game.draw = function() {
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
    })
    enableDebugMode(true, game)


}
__main()
