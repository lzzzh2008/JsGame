var SceneEnd = function(game) {
    var s = {
        game: game,

    }
    game.registerAction('r', function() {
        var s = Scene(game)
        game.score = 0
        game.replaceScene(s)
    })
    s.draw = function() {
        //draw labels
        game.context.fillText('游戏结束，按R重新开始', 100, 200)
    }

    s.update = function() {

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
