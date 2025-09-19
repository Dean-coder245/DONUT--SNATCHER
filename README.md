 


# 🍩 DONUT SNATCHER MULTIPLAYER 🍩

**A competitive 2-4 player arcade game where players race to collect 25 donuts first!**

> Play now at [https://donutsnatcher.com](https://donutsnatcher.com) (or the temporary tunnel URL below if not yet published)

## Run Locally

To run this MakeCode Arcade project locally on **Debian Linux** or **Windows 10/11**:

### Quick Start

**Linux (Debian/Mint):**
```bash
make serve                 # Requires Python 3 or Node.js (npx)
# Or directly:
bash scripts/serve.sh
```

**Windows 10/11:**
```cmd
scripts\serve.bat          # Requires Python or Node.js (npx)
# Or PowerShell:
powershell scripts/serve.ps1
```

This will start a local HTTP server at http://localhost:8000 and open your browser.

### Manual Commands

If you prefer to run the server manually:
```bash
# With Python 3 (Linux/Windows)
python3 -m http.server 8000 --directory .
# or on Windows:
py -m http.server 8000 -d .

# With Node.js (Linux/Windows)
npx --yes serve -n -l 8000 .
```

Then visit http://localhost:8000 in your browser.

## Game Features

🎮 **Multiplayer Support**: 2-4 players can compete simultaneously
🍩 **Objective**: First player to collect the target donuts wins!
  - **Level 1**: 50 donuts to win
  - **Level 2**: 100 donuts to win  
  - **Level 3**: 200 donuts to win
♥️ **Power-ups**: Collect hearts to gain extra lives (max 5)
💥 **Obstacles**: Avoid flying projectiles that steal your lives
🎆 **Difficulty Levels**: Choose from 1-3 difficulty settings with scaling spawn rates

### Player Characters
- **Player 1 (Blue)**: Arrow Keys
- **Player 2 (Red)**: Player 2 Controller
- **Player 3 (Green)**: Player 3 Controller  
- **Player 4 (Yellow)**: Player 4 Controller

### Custom Port

```bash
# Linux:
PORT=9000 bash scripts/serve.sh

# Windows (cmd):
set PORT=9000 && scripts\serve.bat

# Windows (PowerShell):
.\scripts\serve.ps1 -Port 9000
```

### Optional: Build from Source

To build this project using the PXT (MakeCode) CLI:
```bash
npm install -g pxt
pxt build
```

## Use as Extension

This repository can be added as an **extension** in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **New Project**
* click on **Extensions** under the gearwheel menu
* search for **https://github.com/dean-coder245/game-building-session-tutorials** and import

## Edit this project

To edit this repository in MakeCode.

* open [https://arcade.makecode.com/](https://arcade.makecode.com/)
* click on **Import** then click on **Import URL**
* paste **https://github.com/dean-coder245/game-building-session-tutorials** and click import

#### Metadata (used for search, rendering)

* for PXT/arcade
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>
