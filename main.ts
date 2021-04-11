controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Missle`, ship, 0, -100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Player, function (sprite, otherSprite) {
	
})
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    console.log("BANG")
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy(effects.fire, 500)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    if (info.life() == 0) {
        game.over(false)
    }
    pause(2000)
})
let projectile: Sprite = null
let ship: Sprite = null
info.setLife(3)
scene.setBackgroundColor(8)
tiles.setTilemap(tilemap`level1`)
ship = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 5 5 5 5 5 5 . . . . . 
    . . . . . 5 2 2 2 2 5 . . . . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . 5 5 5 2 2 2 2 2 2 5 5 5 . . 
    . . 5 5 5 5 5 5 5 5 5 5 5 5 . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
ship.setPosition(0, 100)
controller.moveSprite(ship, 100, 0)
forever(function () {
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.setVelocity(0, 50)
        value.setFlag(SpriteFlag.AutoDestroy, true)
    }
    for (let value of sprites.allOfKind(SpriteKind.Projectile)) {
        value.setFlag(SpriteFlag.AutoDestroy, true)
    }
})
game.onUpdateInterval(200, function () {
    let list: Sprite[] = []
    list.push(sprites.create(img`
        . . . . . . . . f f . . . . . . 
        . . . f f . . f f f . . . . . . 
        . . . f f f f f f f f f . . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        f f f f f f f f f f f f f f . . 
        f f f f f f f f f f f f f f . . 
        . f f f f f f f f f f f f . . . 
        . . f f f f f f f f f f . . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . f f f f f f f f f f f . . . 
        . . . f f f f f f f f f f f . . 
        . . . f f f f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . f f . . . . . . . 
        `, SpriteKind.Enemy))
    for (let value of list) {
        value.setPosition(randint(0, 900), 0)
    }
})
