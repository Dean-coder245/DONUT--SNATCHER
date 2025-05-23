namespace SpriteKind {
    export const donuts = SpriteKind.create()
    export const heart = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.heart, function (sprite, otherSprite) {
    info.changeLifeBy(1)
    otherSprite.destroy()
    music.baDing.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
    music.buzzer.play()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.donuts, function (sprite, otherSprite) {
    info.changeScoreBy(1)
    otherSprite.destroy()
    music.bigCrash.play()
    if (info.score() == 50) {
        game.over(true)
    }
})
let projectile: Sprite = null
let mySprite2: Sprite = null
game.splash("PRESS A TO PLAY")
let userDifficulty = game.askForNumber("Type a difficulty from 1 to 3", 1)
if (userDifficulty > 3 || userDifficulty < 1) {
    game.splash("Are you insane????")
    game.splash("Select 1-3, you noob!")
    userDifficulty = game.askForNumber("Type a difficulty from 1 to 3", 1)
}
scene.setBackgroundColor(8)
info.setScore(0)
let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . . . . 9 . . . . . . . . 
    . . . . . 9 9 9 9 9 . . . . . . 
    . . . . 9 9 . 9 . 9 9 . . . . . 
    . . . . . . . 9 . . 9 . . . . . 
    . . . . . . 9 9 9 . . . . . . . 
    . . . . 9 9 . . 9 9 . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 80, 80)
mySprite.setStayInScreen(true)
info.setLife(3)
game.onUpdateInterval(2000, function () {
    mySprite2 = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f . f f f . . . . 
        . . . . f 3 3 3 f 3 3 3 f . . . 
        . . . . f 3 3 3 3 3 1 3 f . . . 
        . . . . f 3 3 3 3 3 3 3 f . . . 
        . . . . . f 3 b b b 3 f . . . . 
        . . . . . f f b b b f f . . . . 
        . . . . . . f f b f f . . . . . 
        . . . . . . . f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.heart)
    mySprite2.setPosition(randint(0, 160), randint(0, 120))
})
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . e . . . . . . . . 
        . . . . . . e e e . . . . . . . 
        . . . . . . e e e . . . . . . . 
        . . . . . . 5 5 5 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . . 
        . . . . . . 5 5 5 . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, randint(-1 * (userDifficulty * 33), userDifficulty * 33), randint(-1 * (userDifficulty * 33), userDifficulty * 33))
})
game.onUpdateInterval(500, function () {
    mySprite2 = sprites.create(img`
        . . . b b a . . 
        . . d d 3 3 3 a 
        . 3 3 3 3 3 3 a 
        b 3 3 a 3 3 d 4 
        a 3 3 3 3 d 4 4 
        a 3 3 d a 4 4 e 
        . e b 4 4 b e . 
        . . . . . . . . 
        `, SpriteKind.donuts)
    mySprite2.setPosition(randint(0, 160), randint(0, 120))
})
