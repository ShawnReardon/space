def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(assets.image("""
        Missle
    """), ship, 0, -100)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    info.change_life_by(-1)
    if info.life() == 0:
        game.over(False)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

projectile: Sprite = None
ship: Sprite = None
info.set_life(3)
scene.set_background_color(8)
astroid = sprites.create(img("""
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
    """),
    SpriteKind.enemy)
ship = sprites.create(img("""
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
    """),
    SpriteKind.player)
ship.set_position(0, 100)
controller.move_sprite(ship, 100, 0)
for index in range(5):
    astroid.set_velocity(0, 50)

def on_update_interval():
    astroid.set_flag(SpriteFlag.DESTROY_ON_WALL, True)
    astroid.set_velocity(0, 50)
game.on_update_interval(500, on_update_interval)
