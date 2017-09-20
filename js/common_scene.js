class Common_Scene {
    constructor(game) {
        this.game = game
    }
    draw() {

    }
    update() {

    }
}

class SceneTitle extends Common_Scene {
    constructor(game) {
        super(game)
        game.registerAction('k', function() {
            var s = new Scene(game)
            game.replaceScene(s)
        })
    }
    static new(game) {
        var i = new this(game)
        return i
    }
    draw() {
        this.game.context.fillText('按K开始游戏', 100, 200)
    }
}
