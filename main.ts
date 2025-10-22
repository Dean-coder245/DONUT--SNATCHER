namespace SpriteKind {
    export const donuts = SpriteKind.create()
    export const heart = SpriteKind.create()
    export const Player2 = SpriteKind.create()
    export const Player3 = SpriteKind.create()
    export const Player4 = SpriteKind.create()
    export const PowerUp = SpriteKind.create()
    export const Shield = SpriteKind.create()
    export const SpeedBoost = SpriteKind.create()
    export const DoublePoints = SpriteKind.create()
    export const EnemyBot = SpriteKind.create()
}

// Enhanced Sound System
let soundEnabled = true
let musicEnabled = true
let backgroundMusic: music.Melody = null

function playSoundEffect(sound: music.SoundEffect) {
    if (soundEnabled) {
        sound.play()
    }
}

function playMelody(melody: music.Melody) {
    if (musicEnabled) {
        music.play(melody, music.PlaybackMode.InBackground)
    }
}

// Create epic background music
let gameTheme = music.createSong(hex`
    0078000408020100001c00010a006400f4016400000400000000000000000000056400040000000001000008000000020004001000041001081000020801001800080102040008000800010404001800081004
`)

let winTheme = music.createSong(hex`
    0078000408020100001c00010a006400f4016400000400000000000000000000056400040000000002000018000000020004002000042001002000040801001000080102040001000800020404000800081004
`)

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

// High Score and Statistics System
let highScore = 0
let gamesPlayed = 0
let totalDonutsCollected = 0
let totalWins = 0
let totalLosses = 0
let currentCombo = 0
let maxCombo = 0
let gameStartTime = 0
let playerStats = {
    player1Wins: 0,
    player2Wins: 0,
    player3Wins: 0,
    player4Wins: 0
}

// Load saved data
function loadGameData() {
    highScore = settings.readNumber("highScore") || 0
    gamesPlayed = settings.readNumber("gamesPlayed") || 0
    totalDonutsCollected = settings.readNumber("totalDonuts") || 0
    totalWins = settings.readNumber("totalWins") || 0
    totalLosses = settings.readNumber("totalLosses") || 0
    maxCombo = settings.readNumber("maxCombo") || 0
    playerStats.player1Wins = settings.readNumber("p1Wins") || 0
    playerStats.player2Wins = settings.readNumber("p2Wins") || 0
    playerStats.player3Wins = settings.readNumber("p3Wins") || 0
    playerStats.player4Wins = settings.readNumber("p4Wins") || 0
}

// Save game data
function saveGameData() {
    settings.writeNumber("highScore", highScore)
    settings.writeNumber("gamesPlayed", gamesPlayed)
    settings.writeNumber("totalDonuts", totalDonutsCollected)
    settings.writeNumber("totalWins", totalWins)
    settings.writeNumber("totalLosses", totalLosses)
    settings.writeNumber("maxCombo", maxCombo)
    settings.writeNumber("p1Wins", playerStats.player1Wins)
    settings.writeNumber("p2Wins", playerStats.player2Wins)
    settings.writeNumber("p3Wins", playerStats.player3Wins)
    settings.writeNumber("p4Wins", playerStats.player4Wins)
}

// Power-up effects tracking
let player1HasShield = false
let player2HasShield = false
let player3HasShield = false
let player4HasShield = false
let player1SpeedBoost = 0
let player2SpeedBoost = 0
let player3SpeedBoost = 0
let player4SpeedBoost = 0
let player1DoublePoints = 0
let player2DoublePoints = 0
let player3DoublePoints = 0
let player4DoublePoints = 0

// Collision handlers for all players
function handleDonutCollision(player: Sprite, donut: Sprite, playerNum: number) {
    donut.destroy()
    playSoundEffect(music.powerUp)
    
    // Combo system
    currentCombo += 1
    if (currentCombo > maxCombo) {
        maxCombo = currentCombo
    }
    
    // Calculate points (with double points power-up)
    let points = 1
    if (playerNum == 1 && player1DoublePoints > 0) points = 2
    else if (playerNum == 2 && player2DoublePoints > 0) points = 2
    else if (playerNum == 3 && player3DoublePoints > 0) points = 2
    else if (playerNum == 4 && player4DoublePoints > 0) points = 2
    
    // Combo bonus
    if (currentCombo >= 5) points += 1
    if (currentCombo >= 10) points += 2
    
    // Update score based on player
    if (playerNum == 1) {
        player1Score += points
        totalDonutsCollected += 1
    } else if (playerNum == 2) {
        player2Score += points
        totalDonutsCollected += 1
    } else if (playerNum == 3) {
        player3Score += points
        totalDonutsCollected += 1
    } else if (playerNum == 4) {
        player4Score += points
        totalDonutsCollected += 1
    }
    
    // Show combo effects
    if (currentCombo >= 5) {
        player.sayText("COMBO x" + currentCombo + "!", 500)
    }
    if (points > 1) {
        player.sayText("+" + points + " points!", 800)
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
        if (numPlayers == 1) {
            // Single player mode
            game.splash("YOU WIN with " + player1Score + " donuts!")
        } else {
            // Multiplayer mode
            let winner = "Player 1"
            if (player2Score == maxScore) winner = "Player 2"
            else if (player3Score == maxScore) winner = "Player 3"
            else if (player4Score == maxScore) winner = "Player 4"
            
            game.splash(winner + " WINS with " + maxScore + " donuts!")
        }
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
    
    // Check for shield protection
    let hasShield = false
    if (playerNum == 1 && player1HasShield) {
        hasShield = true
        player1HasShield = false
    } else if (playerNum == 2 && player2HasShield) {
        hasShield = true
        player2HasShield = false
    } else if (playerNum == 3 && player3HasShield) {
        hasShield = true
        player3HasShield = false
    } else if (playerNum == 4 && player4HasShield) {
        hasShield = true
        player4HasShield = false
    }
    
    if (hasShield) {
        playSoundEffect(music.magicWand)
        player.sayText("SHIELD!", 1000)
        return // No damage taken
    }
    
    playSoundEffect(music.buzzer)
    currentCombo = 0 // Reset combo on hit
    
    // Remove life from specific player
    if (playerNum == 1) {
        player1Lives -= 1
        if (player1Lives <= 0) {
            player.destroy()
            player.sayText("DEFEATED!", 1500)
        }
    } else if (playerNum == 2) {
        player2Lives -= 1
        if (player2Lives <= 0) {
            player.destroy()
            player.sayText("DEFEATED!", 1500)
        }
    } else if (playerNum == 3) {
        player3Lives -= 1
        if (player3Lives <= 0) {
            player.destroy()
            player.sayText("DEFEATED!", 1500)
        }
    } else if (playerNum == 4) {
        player4Lives -= 1
        if (player4Lives <= 0) {
            player.destroy()
            player.sayText("DEFEATED!", 1500)
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
        if (numPlayers == 1) {
            game.splash("GAME OVER - You were defeated!")
        } else {
            game.splash("GAME OVER - All players defeated!")
        }
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
    if (numPlayers == 1) {
        // Single player - show individual score and lives
        info.setScore(player1Score)
        info.setLife(player1Lives)
    } else {
        // Multiplayer - show all players
        let scoreText = "P1:" + player1Score + " (♥" + player1Lives + ")"
        if (numPlayers >= 2) scoreText += " P2:" + player2Score + " (♥" + player2Lives + ")"
        if (numPlayers >= 3) scoreText += " P3:" + player3Score + " (♥" + player3Lives + ")"
        if (numPlayers >= 4) scoreText += " P4:" + player4Score + " (♥" + player4Lives + ")"
        
        // Use info.setScore to show combined info
        info.setScore(player1Score + player2Score + player3Score + player4Score)
    }
}

// Load saved game data first
loadGameData()

// Background theme system
let selectedTheme = 0
function setBackgroundTheme(theme: number) {
    if (theme == 0) {
        scene.setBackgroundColor(8) // Original blue
    } else if (theme == 1) {
        scene.setBackgroundColor(7) // Orange sunset
    } else if (theme == 2) {
        scene.setBackgroundColor(11) // Purple night
    } else if (theme == 3) {
        scene.setBackgroundColor(6) // Green forest
    } else if (theme == 4) {
        scene.setBackgroundColor(2) // Red danger zone
    }
}

// Show game statistics
function showGameStats() {
    game.splash("🏆 DONUT SNATCHER STATS 🏆")
    game.splash("High Score: " + highScore)
    game.splash("Games Played: " + gamesPlayed)
    game.splash("Total Donuts: " + totalDonutsCollected)
    game.splash("Win Rate: " + Math.round((totalWins / Math.max(gamesPlayed, 1)) * 100) + "%")
    game.splash("Max Combo: " + maxCombo)
    if (numPlayers > 1) {
        game.splash("P1 Wins: " + playerStats.player1Wins + " P2 Wins: " + playerStats.player2Wins)
        if (numPlayers >= 3) game.splash("P3 Wins: " + playerStats.player3Wins)
        if (numPlayers >= 4) game.splash("P4 Wins: " + playerStats.player4Wins)
    }
}

// Game setup
game.splash("🍩 DONUT SNATCHER ULTIMATE! 🍩")

// Ask if player wants to see stats
let showStats = game.askForNumber("View stats first? 1=Yes, 2=No", 2)
if (showStats == 1) {
    showGameStats()
}

// Ask if player wants single or multiplayer
let gameMode = game.askForNumber("Choose mode: 1=Single Player, 2=Multiplayer", 1)
if (gameMode != 1 && gameMode != 2) {
    game.splash("Invalid choice!")
    gameMode = game.askForNumber("Choose mode: 1=Single Player, 2=Multiplayer", 1)
}

if (gameMode == 1) {
    // Single player mode
    numPlayers = 1
    game.splash("SINGLE PLAYER MODE!")
    
    // Fake loading screen
    game.splash("Loading single player...")
    pause(1000)
    game.splash("Initializing player...")
    pause(1000)
    game.splash("Setting up donuts...")
    pause(1000)
    game.splash("Loading projectiles...")
    pause(1000)
    game.splash("Almost ready...")
    pause(1000)
    game.splash("JK I ain't gonna make you wait!")
    pause(1000)
    
} else {
    // Multiplayer mode
    game.splash("MULTIPLAYER MODE!")
    
    // Fake loading screen
    game.splash("Loading multiplayer...")
    pause(1000)
    game.splash("Connecting players...")
    pause(1000)
    game.splash("Syncing controllers...")
    pause(1000)
    game.splash("Preparing battle arena...")
    pause(1000)
    game.splash("Ready for competition...")
    pause(1000)
    game.splash("JK I ain't gonna make you wait!")
    pause(1000)
    
    numPlayers = game.askForNumber("How many players? (2-4)", 2)
    if (numPlayers < 2 || numPlayers > 4) {
        game.splash("Invalid! Choose 2, 3, or 4 players")
        numPlayers = game.askForNumber("How many players? (2-4)", 2)
    }
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
if (numPlayers == 1) {
    // Single player instructions
    game.splash("Use Arrow Keys to move")
    game.splash("Collect " + donutsNeeded + " donuts to WIN!")
} else {
    // Multiplayer instructions
    game.splash("Player 1 (Blue): Arrow Keys")
    if (numPlayers >= 2) game.splash("Player 2 (Red): Player 2 Controller")
    if (numPlayers >= 3) game.splash("Player 3 (Green): Player 3 Controller")
    if (numPlayers >= 4) game.splash("Player 4 (Yellow): Player 4 Controller")
    game.splash("First to " + donutsNeeded + " donuts WINS!")
}

