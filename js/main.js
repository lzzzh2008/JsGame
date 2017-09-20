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
var enableDebugMode = function(enable, game) {
    if (!enable) {
        return
    }
    window.paused = false
    window.addEventListener('keydown', function(event) {
        log(event)
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


    var game = GuaGame(images, function(g) {
        var s = Scene(g)
        g.runWithScene(s)
    })
    enableDebugMode(true, game)


}
__main()
