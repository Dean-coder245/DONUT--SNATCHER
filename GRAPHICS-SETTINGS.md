# 🎨 Graphics Settings & Device Detection

## Automatic Device Detection

Donut Snatcher now automatically detects whether you're playing on **mobile** or **PC/desktop** and adjusts graphics settings accordingly for optimal performance!

## 📊 Quality Levels

### 💻 Desktop / PC (Ultra Quality)
When playing on a desktop or high-end PC, the game automatically enables:

- ✨ **Enhanced Textures**: 1.5x resolution textures
- 🎭 **Visual Effects**: Improved contrast, saturation, and brightness
- 🌟 **Particle Effects**: Full particle systems enabled
- 🎯 **Anti-aliasing**: Smooth edges and crisp rendering
- 👥 **Max Sprites**: Up to 150 sprites on screen
- 🎬 **Frame Rate**: Smooth 60 FPS gameplay
- 🖼️ **Image Quality**: Crisp-edge rendering for sharp graphics

### 📱 Mobile (Optimized Quality)
When playing on mobile devices (phones/tablets), the game optimizes:

- 📦 **Texture Resolution**: 0.75x (reduced for performance)
- ⚡ **Particle Effects**: Disabled to save battery/performance
- 🎨 **Rendering**: Pixelated style for better mobile performance
- 👥 **Max Sprites**: Up to 50 sprites (balanced)
- 🔋 **Frame Rate**: 30 FPS (battery-friendly)
- 🚀 **Performance**: Hardware acceleration enabled

### ⚙️ Low-End Devices (Minimal Quality)
For older devices with limited RAM/CPU:

- 📦 **Texture Resolution**: 0.5x (maximum optimization)
- ❌ **Effects**: All visual effects disabled
- 👥 **Max Sprites**: Limited to 30 sprites
- 🔋 **Frame Rate**: 30 FPS stable
- 💾 **Memory**: Minimal memory footprint

## 🔍 Detection Criteria

The game detects your device based on:

1. **User Agent**: Identifies mobile OS (Android, iOS, etc.)
2. **Touch Support**: Checks for touchscreen capability
3. **Screen Size**: Analyzes viewport dimensions
4. **Device Memory**: Detects available RAM
5. **CPU Cores**: Checks processor capability
6. **Pixel Ratio**: Identifies high-DPI displays

## 📱 Detected Platforms

### Mobile (Optimized Mode)
- 📱 iPhone / iPad
- 🤖 Android phones & tablets
- 🌐 Mobile browsers (all)
- 📲 PWA installations

### Desktop (Enhanced Mode)
- 💻 Windows PC
- 🖥️ macOS
- 🐧 Linux
- 🌐 Desktop browsers

## 🎮 Visual Differences

### Desktop Players See:
```
✨ Vivid colors with 110% saturation
✨ Enhanced contrast (1.1x)
✨ Brighter visuals (105% brightness)
✨ Smooth, crisp sprite rendering
✨ Full particle effects and animations
✨ High-resolution textures
```

### Mobile Players See:
```
📱 Battery-optimized rendering
📱 Pixelated retro aesthetic
📱 Standard color/contrast
📱 Simplified sprites
📱 Performance-focused graphics
📱 Touch-optimized controls
```

## 🛠️ Technical Implementation

The device detection runs automatically when you load the game:

1. **Instant Detection**: Analyzes device in <100ms
2. **Smart Caching**: Settings saved to localStorage
3. **Dynamic Switching**: Re-detects on screen rotation/resize
4. **Visual Feedback**: Shows device type on game load
5. **CSS Optimization**: Applies hardware acceleration where needed

## 📊 Performance Comparisons

| Feature | Desktop | Mobile | Low-End |
|---------|---------|--------|---------|
| Texture Quality | 1.5x | 0.75x | 0.5x |
| Frame Rate | 60 FPS | 30 FPS | 30 FPS |
| Max Sprites | 150 | 50 | 30 |
| Particles | ✅ | ❌ | ❌ |
| Shadows | ✅ | ❌ | ❌ |
| Anti-alias | ✅ | ❌ | ❌ |

## 🎯 Benefits

### For Desktop Players:
- 🎨 Beautiful, enhanced graphics
- 🌟 Smooth 60 FPS gameplay
- ✨ Full visual effects
- 🖥️ Takes advantage of powerful hardware

### For Mobile Players:
- 🔋 Extended battery life
- ⚡ Smooth, lag-free gameplay
- 📱 Optimized for touchscreen
- 🚀 Fast loading times

## 🔧 Advanced Info

### Accessing Settings Programmatically

The device info is stored globally:

```javascript
// Access device info
const device = window.DONUT_SNATCHER_SETTINGS.device;
console.log(device.isMobile); // true/false
console.log(device.isDesktop); // true/false

// Access graphics settings
const graphics = window.DONUT_SNATCHER_SETTINGS.graphics;
console.log(graphics.quality); // 'ultra', 'high', 'medium', or 'low'
console.log(graphics.frameRate); // 30 or 60
```

### Checking Browser Console

Open your browser's developer console (F12) to see:
```
🍩 Donut Snatcher - Device Detection Initializing...
💻 Desktop device detected - Using enhanced settings
Device Info: { isMobile: false, isDesktop: true, ... }
Graphics Settings: { quality: 'ultra', ... }
✅ Device detection complete!
```

## 🎊 Info Banner

When you first load the game, you'll see a banner showing:
- 📱/💻 Device type icon
- 🎨 Quality level (color-coded)
- 📐 Texture resolution multiplier
- 🎬 Maximum frame rate
- 📏 Screen dimensions

The banner automatically fades after 5 seconds.

## 🔄 Responsive Design

The game automatically re-detects your device if you:
- 🔄 Rotate your mobile device
- 📏 Resize your browser window
- 🖥️ Switch monitors
- 📱 Change device orientation

## ⚡ Zero Configuration

Everything is automatic! No settings to configure, no options to choose. The game:
- ✅ Automatically detects your device
- ✅ Applies optimal settings
- ✅ Adjusts in real-time
- ✅ Saves your preferences
- ✅ Works offline (PWA)

---

**Enjoy playing Donut Snatcher with optimized graphics for YOUR device!** 🍩🎮
