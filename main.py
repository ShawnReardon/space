def on_a_pressed():
    global projectile
    projectile = sprites.create_projectile_from_sprite(assets.image("""
        Missle
    """), ship, 0, -100)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def on_on_overlap(sprite, otherSprite):
    pass
sprites.on_overlap(SpriteKind.player, SpriteKind.player, on_on_overlap)

def on_on_destroyed(sprite):
    print("BANG")
sprites.on_destroyed(SpriteKind.enemy, on_on_destroyed)

def on_on_overlap2(sprite, otherSprite):
    music.big_crash.play()
    otherSprite.destroy(effects.fire, 500)
sprites.on_overlap(SpriteKind.projectile, SpriteKind.enemy, on_on_overlap2)

def on_on_overlap3(sprite, otherSprite):
    music.knock.play()
    info.change_life_by(-1)
    if info.life() == 0:
        game.over(False)
    pause(2000)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap3)

projectile: Sprite = None
ship: Sprite = None
info.set_life(3)
scene.set_background_color(8)
tiles.set_tilemap(tilemap("""
    level1
"""))
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

def on_forever():
    for value in sprites.all_of_kind(SpriteKind.enemy):
        value.set_velocity(0, 50)
        value.set_flag(SpriteFlag.AUTO_DESTROY, True)
    for value2 in sprites.all_of_kind(SpriteKind.projectile):
        value2.set_flag(SpriteFlag.AUTO_DESTROY, True)
forever(on_forever)

def on_update_interval():
    list2: List[Sprite] = []
    list2.append(sprites.create(img("""
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
            SpriteKind.enemy))
    for value3 in list2:
        value3.set_position(randint(0, 900), 0)
game.on_update_interval(200, on_update_interval)
