var GuaGame = function(images, runCallback) {
    var g = {
        scene: null,
        actions: {},
        keydowns: {},
        images: {},
    }
    var canvas = e('#id-canvas')
    var context = canvas.getContext('2d')
    g.canvas = canvas
    g.context = context
    //draw
    g.drawImage = function(guaImage) {
        g.context.drawImage(guaImage.image, guaImage.x, guaImage.y)

    }
    //events
    window.addEventListener('keydown', function(event){
        g.keydowns[event.key] = true
    })
    window.addEventListener('keyup', function(event){
        g.keydowns[event.key] = false
    })
    //update
    g.update = function() {
        g.scene.update()
    }
    //draw
    g.draw = function() {
        g.scene.draw()
    }
    g.registerAction = function(key,callback) {
        g.actions[key] = callback
    }
    //timer
    window.fps = 30
    var runloop = function() {
        var actions = Object.keys(g.actions)
        for (var i = 0; i < actions.length; i++) {
            var key = actions[i]
            if(g.keydowns[key]){
                g.actions[key]()
            }
        }
        //update
        g.update()
        //clear
        context.clearRect(0, 0, canvas.width, canvas.height)

        //draw
        g.draw()
        setTimeout(function (){
            //events
            runloop()
        }, 1000/fps)
    }
    var loads = []
    var names = Object.keys(images)
    for (var i = 0; i < names.length; i++) {
        let name = names[i]
        var path = images[name]
        let img = new Image()
        img.src = path
        img.onload = function() {
            g.images[name] = img
            loads.push(1)
            if (loads.length == names.length) {
                g.run()
            }
        }
    }
    g.imageByName = function(name) {
        var img = g.images[name]
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.runWithScene = function(scene) {
        g.scene = scene
        setTimeout(function (){
            //events
            runloop()
        }, 1000/fps)
    }
    g.replaceScene = function(scene) {
        g.scene = scene
    }
    g.run = function(scene) {
        runCallback(g)

    }

    return g
}
