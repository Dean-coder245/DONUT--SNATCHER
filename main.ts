namespace SpriteKind {
    export const donuts = SpriteKind.create()
    export const heart = SpriteKind.create()
    export const Player2 = SpriteKind.create()
    export const Player3 = SpriteKind.create()
    export const Player4 = SpriteKind.create()
}

// Player variables
let player1: Sprite = null
let player2: Sprite = null
let player3: Sprite = null
let player4: Sprite = null
let numPlayers: number = 0

// Score tracking for each player
let player1Score = 0
let player2Score = 0
let player3Score = 0
let player4Score = 0

// Life tracking for each player
let player1Lives = 3
let player2Lives = 3
let player3Lives = 3
let player4Lives = 3

// Collision handlers for all players
function handleDonutCollision(player: Sprite, donut: Sprite, playerNum: number) {
    donut.destroy()
    music.bigCrash.play()
    
    // Update score based on player
    if (playerNum == 1) {
        player1Score += 1
    } else if (playerNum == 2) {
        player2Score += 1
    } else if (playerNum == 3) {
        player3Score += 1
    } else if (playerNum == 4) {
        player4Score += 1
    }
    
    updateScoreDisplay()
    
    // Check win condition based on difficulty level
    // Level 1: 50 donuts, Level 2: 100 donuts, Level 3: 200 donuts
    let donutsToWin = 50
    if (userDifficulty == 2) {
        donutsToWin = 100
    } else if (userDifficulty == 3) {
        donutsToWin = 200
    }
    
    let maxScore = Math.max(player1Score, player2Score, player3Score, player4Score)
    if (maxScore >= donutsToWin) {
        let winner = "Player 1"
        if (player2Score == maxScore) winner = "Player 2"
        else if (player3Score == maxScore) winner = "Player 3"
        else if (player4Score == maxScore) winner = "Player 4"
        
        game.splash(winner + " WINS with " + maxScore + " donuts!")
        game.over(true)
    }
}

function handleHeartCollision(player: Sprite, heart: Sprite, playerNum: number) {
    heart.destroy()
    music.baDing.play()
    
    // Add life to specific player
    if (playerNum == 1 && player1Lives < 5) {
        player1Lives += 1
    } else if (playerNum == 2 && player2Lives < 5) {
        player2Lives += 1
    } else if (playerNum == 3 && player3Lives < 5) {
        player3Lives += 1
    } else if (playerNum == 4 && player4Lives < 5) {
        player4Lives += 1
    }
    
    updateScoreDisplay()
}

function handleProjectileCollision(player: Sprite, projectile: Sprite, playerNum: number) {
    projectile.destroy()
    music.buzzer.play()
    
    // Remove life from specific player
    if (playerNum == 1) {
        player1Lives -= 1
        if (player1Lives <= 0) {
            player.destroy()
        }
    } else if (playerNum == 2) {
        player2Lives -= 1
        if (player2Lives <= 0) {
            player.destroy()
        }
    } else if (playerNum == 3) {
        player3Lives -= 1
        if (player3Lives <= 0) {
            player.destroy()
        }
    } else if (playerNum == 4) {
        player4Lives -= 1
        if (player4Lives <= 0) {
            player.destroy()
        }
    }
    
    updateScoreDisplay()
    
    // Check if all players are dead
    let alivePlayers = 0
    if (player1Lives > 0) alivePlayers += 1
    if (player2Lives > 0 && numPlayers >= 2) alivePlayers += 1
    if (player3Lives > 0 && numPlayers >= 3) alivePlayers += 1
    if (player4Lives > 0 && numPlayers >= 4) alivePlayers += 1
    
    if (alivePlayers == 0) {
        game.splash("GAME OVER - All players defeated!")
        game.over(false)
    }
}

// Set up collision handlers for Player 1
sprites.onOverlap(SpriteKind.Player, SpriteKind.donuts, function (sprite, otherSprite) {
    handleDonutCollision(sprite, otherSprite, 1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.heart, function (sprite, otherSprite) {
    handleHeartCollision(sprite, otherSprite, 1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Projectile, function (sprite, otherSprite) {
    handleProjectileCollision(sprite, otherSprite, 1)
})

// Set up collision handlers for Player 2
sprites.onOverlap(SpriteKind.Player2, SpriteKind.donuts, function (sprite, otherSprite) {
    handleDonutCollision(sprite, otherSprite, 2)
})
sprites.onOverlap(SpriteKind.Player2, SpriteKind.heart, function (sprite, otherSprite) {
    handleHeartCollision(sprite, otherSprite, 2)
})
sprites.onOverlap(SpriteKind.Player2, SpriteKind.Projectile, function (sprite, otherSprite) {
    handleProjectileCollision(sprite, otherSprite, 2)
})

// Set up collision handlers for Player 3
sprites.onOverlap(SpriteKind.Player3, SpriteKind.donuts, function (sprite, otherSprite) {
    handleDonutCollision(sprite, otherSprite, 3)
})
sprites.onOverlap(SpriteKind.Player3, SpriteKind.heart, function (sprite, otherSprite) {
    handleHeartCollision(sprite, otherSprite, 3)
})
sprites.onOverlap(SpriteKind.Player3, SpriteKind.Projectile, function (sprite, otherSprite) {
    handleProjectileCollision(sprite, otherSprite, 3)
})

// Set up collision handlers for Player 4
sprites.onOverlap(SpriteKind.Player4, SpriteKind.donuts, function (sprite, otherSprite) {
    handleDonutCollision(sprite, otherSprite, 4)
})
sprites.onOverlap(SpriteKind.Player4, SpriteKind.heart, function (sprite, otherSprite) {
    handleHeartCollision(sprite, otherSprite, 4)
})
sprites.onOverlap(SpriteKind.Player4, SpriteKind.Projectile, function (sprite, otherSprite) {
    handleProjectileCollision(sprite, otherSprite, 4)
})

function updateScoreDisplay() {
    let scoreText = "P1:" + player1Score + " (♥" + player1Lives + ")"
    if (numPlayers >= 2) scoreText += " P2:" + player2Score + " (♥" + player2Lives + ")"
    if (numPlayers >= 3) scoreText += " P3:" + player3Score + " (♥" + player3Lives + ")"
    if (numPlayers >= 4) scoreText += " P4:" + player4Score + " (♥" + player4Lives + ")"
    
    // Use info.setScore to show combined info (we'll display in a text sprite instead)
    info.setScore(player1Score + player2Score + player3Score + player4Score)
}

// Game setup
game.splash("DONUT SNATCHER MULTIPLAYER!")
numPlayers = game.askForNumber("How many players? (2-4)", 2)
if (numPlayers < 2 || numPlayers > 4) {
    game.splash("Invalid! Choose 2, 3, or 4 players")
    numPlayers = game.askForNumber("How many players? (2-4)", 2)
}

let userDifficulty = game.askForNumber("Type a difficulty from 1 to 3", 1)
if (userDifficulty > 3 || userDifficulty < 1) {
    game.splash("Are you insane????")
    game.splash("Select 1-3, you noob!")
    userDifficulty = game.askForNumber("Type a difficulty from 1 to 3", 1)
}

scene.setBackgroundColor(8)

// Create Player 1 (Blue)
player1 = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . 8 8 8 8 8 . . . . . .
        . . . . . 8 8 8 8 8 . . . . . .
        . . . . . 8 8 8 8 8 . . . . . .
        . . . . . . . 8 . . . . . . . .
        . . . . . 8 8 8 8 8 . . . . . .
        . . . . 8 8 . 8 . 8 8 . . . . .
        . . . . . . . 8 . . 8 . . . . .
        . . . . . . 8 8 8 . . . . . . .
        . . . . 8 8 . . 8 8 . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        `, SpriteKind.Player)
controller.moveSprite(player1, 80, 80)
player1.setStayInScreen(true)

// Create Player 2 (Red)
if (numPlayers >= 2) {
    player2 = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . 2 2 2 2 2 . . . . . .
            . . . . . 2 2 2 2 2 . . . . . .
            . . . . . 2 2 2 2 2 . . . . . .
            . . . . . . . 2 . . . . . . . .
            . . . . . 2 2 2 2 2 . . . . . .
            . . . . 2 2 . 2 . 2 2 . . . . .
            . . . . . . . 2 . . 2 . . . . .
            . . . . . . 2 2 2 . . . . . . .
            . . . . 2 2 . . 2 2 . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            `, SpriteKind.Player2)
    controller.player2.moveSprite(player2, 80, 80)
    player2.setStayInScreen(true)
}

// Create Player 3 (Green)
if (numPlayers >= 3) {
    player3 = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . 7 7 7 7 7 . . . . . .
            . . . . . 7 7 7 7 7 . . . . . .
            . . . . . 7 7 7 7 7 . . . . . .
            . . . . . . . 7 . . . . . . . .
            . . . . . 7 7 7 7 7 . . . . . .
            . . . . 7 7 . 7 . 7 7 . . . . .
            . . . . . . . 7 . . 7 . . . . .
            . . . . . . 7 7 7 . . . . . . .
            . . . . 7 7 . . 7 7 . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            `, SpriteKind.Player3)
    controller.player3.moveSprite(player3, 80, 80)
    player3.setStayInScreen(true)
}

// Create Player 4 (Yellow)
if (numPlayers >= 4) {
    player4 = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . 5 5 5 5 5 . . . . . .
            . . . . . 5 5 5 5 5 . . . . . .
            . . . . . 5 5 5 5 5 . . . . . .
            . . . . . . . 5 . . . . . . . .
            . . . . . 5 5 5 5 5 . . . . . .
            . . . . 5 5 . 5 . 5 5 . . . . .
            . . . . . . . 5 . . 5 . . . . .
            . . . . . . 5 5 5 . . . . . . .
            . . . . 5 5 . . 5 5 . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            `, SpriteKind.Player4)
    controller.player4.moveSprite(player4, 80, 80)
    player4.setStayInScreen(true)
}

// Manual controls for players (backup in case controller.playerX doesn't work)
game.onUpdate(function () {
    // Player 2 controls (WASD)
    if (numPlayers >= 2 && player2) {
        if (controller.left.isPressed()) {
            player2.setVelocity(-80, player2.vy)
        } else if (controller.right.isPressed()) {
            player2.setVelocity(80, player2.vy)
        } else {
            player2.setVelocity(0, player2.vy)
        }
        
        if (controller.up.isPressed()) {
            player2.setVelocity(player2.vx, -80)
        } else if (controller.down.isPressed()) {
            player2.setVelocity(player2.vx, 80)
        } else {
            player2.setVelocity(player2.vx, 0)
        }
    }
})

// Display initial scores
updateScoreDisplay()
// Spawn hearts based on difficulty level
// Level 1: 2500ms, Level 2: 4000ms, Level 3: 8000ms
let heartSpawnInterval = 2500
if (userDifficulty == 2) {
    heartSpawnInterval = 4000
} else if (userDifficulty == 3) {
    heartSpawnInterval = 8000
}

game.onUpdateInterval(heartSpawnInterval, function () {
    let heart = sprites.create(img`
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
    heart.setPosition(randint(10, 150), randint(10, 110))
})

// Spawn projectiles based on difficulty
game.onUpdateInterval(500, function () {
    let projectile = sprites.createProjectileFromSide(img`
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

// Spawn donuts based on difficulty level
// Level 1: 1500ms, Level 2: 2500ms, Level 3: 3500ms
let donutSpawnInterval = 1500
if (userDifficulty == 2) {
    donutSpawnInterval = 2500
} else if (userDifficulty == 3) {
    donutSpawnInterval = 3500
}

game.onUpdateInterval(donutSpawnInterval, function () {
    let donut = sprites.create(img`
            . . . b b a . .
            . . d d 3 3 3 a
            . 3 3 3 3 3 3 a
            b 3 3 a 3 3 d 4
            a 3 3 3 3 d 4 4
            a 3 3 d a 4 4 e
            . e b 4 4 b e .
            . . . . . . . .
            `, SpriteKind.donuts)
    donut.setPosition(randint(10, 150), randint(10, 110))
})

// Show control instructions and win condition
let donutsNeeded = 50
if (userDifficulty == 2) {
    donutsNeeded = 100
} else if (userDifficulty == 3) {
    donutsNeeded = 200
}

game.splash("CONTROLS:")
game.splash("Player 1 (Blue): Arrow Keys")
if (numPlayers >= 2) game.splash("Player 2 (Red): Player 2 Controller")
if (numPlayers >= 3) game.splash("Player 3 (Green): Player 3 Controller")
if (numPlayers >= 4) game.splash("Player 4 (Yellow): Player 4 Controller")
game.splash("First to " + donutsNeeded + " donuts WINS!")

