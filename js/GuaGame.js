var GuaGame = function(images, runCallback) {
    var g = {
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
    //
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
        log(name, g)
        var img = g.images[name]
        log(img)
        var image = {
            w: img.width,
            h: img.height,
            image: img,
        }
        return image
    }
    g.run = function() {
        runCallback(g)
        setTimeout(function (){
            //events
            runloop()
        }, 1000/fps)
    }

    return g
}
