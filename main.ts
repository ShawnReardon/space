controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(assets.image`Missle`, ship, 0, -100)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    if (info.life() == 0) {
        game.over(false)
    }
})
let projectile: Sprite = null
let ship: Sprite = null
info.setLife(3)
scene.setBackgroundColor(8)
let astroid = sprites.create(img`
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
    `, SpriteKind.Enemy)
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
for (let index = 0; index < 5; index++) {
    astroid.setVelocity(0, 50)
}
game.onUpdateInterval(500, function () {
    astroid.setFlag(SpriteFlag.DestroyOnWall, true)
    astroid.setVelocity(0, 50)
    for (let index = 0; index <= 4; index++) {
        sprites.create(img`
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
            `, SpriteKind.Enemy).setPosition(randint(0, 900), 0)
    }
    for (let value of sprites.allOfKind(SpriteKind.Enemy)) {
        value.setVelocity(0, 50)
    }
})
