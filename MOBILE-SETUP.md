# 📱 Donut Snatcher - Mobile Setup Guide

Your game is now configured as a **Progressive Web App (PWA)** that works on iOS and Android!

## 🚀 How to Make It Accessible on Mobile

To use Donut Snatcher on mobile devices, you need to host it online with HTTPS. Here are your options:

### Option 1: GitHub Pages (FREE & Recommended)

1. **Create a GitHub repository** (if you haven't already):
   ```bash
   cd "donut-snatcher/Donut Snatcher"
   git init
   git add .
   git commit -m "Initial commit - Mobile-ready PWA"
   ```

2. **Push to GitHub**:
   ```bash
   # Create a new repo on GitHub first, then:
   git remote add origin https://github.com/YOUR-USERNAME/donut-snatcher.git
   git branch -M main
   git push -u origin main
   ```

3. **Enable GitHub Pages**:
   - Go to your repo settings → Pages
   - Select "Deploy from branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

4. **Access your game**:
   - Your game will be live at: `https://YOUR-USERNAME.github.io/donut-snatcher/`
   - Share this URL with anyone!

### Option 2: Netlify (FREE & Easy)

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Deploy**:
   ```bash
   cd "donut-snatcher/Donut Snatcher"
   netlify deploy
   # Follow prompts, then run:
   netlify deploy --prod
   ```

3. You'll get a permanent URL like `https://donut-snatcher-xyz.netlify.app`

### Option 3: Vercel (FREE & Fast)

1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Deploy**:
   ```bash
   cd "donut-snatcher/Donut Snatcher"
   vercel
   ```

3. You'll get a URL like `https://donut-snatcher.vercel.app`

### Option 4: Local Network Testing

For testing on your local network (same WiFi):

1. **Find your local IP**:
   ```bash
   hostname -I | awk '{print $1}'
   ```

2. **Start a server**:
   ```bash
   cd "donut-snatcher/Donut Snatcher"
   python3 -m http.server 8000
   ```

3. **Access from mobile**:
   - Open browser on your phone
   - Go to `http://YOUR-LOCAL-IP:8000`
   - Example: `http://192.168.1.100:8000`

⚠️ **Note**: PWA installation only works with HTTPS, so local network testing won't allow "Add to Home Screen".

## 📲 Installing on Mobile (After Hosting)

### iOS (Safari):
1. Open the hosted URL in Safari
2. Tap the Share button (📤)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"
5. The game icon will appear on your home screen!

### Android (Chrome):
1. Open the hosted URL in Chrome
2. Tap the menu (⋮)
3. Tap "Add to Home screen" or "Install app"
4. Tap "Install"
5. The game icon will appear on your home screen!

## ✅ What's Been Added for Mobile

- ✅ **Service Worker** - Enables offline play and faster loading
- ✅ **Web App Manifest** - Allows installation as an app
- ✅ **App Icons** - Custom donut icons in SVG format
- ✅ **Mobile Meta Tags** - Optimized for iOS and Android
- ✅ **Touch Support** - Already had touch controls
- ✅ **Fullscreen Mode** - Immersive gaming experience

## 🎮 Playing the Game

Once installed, the game works like a native app:
- Launch from your home screen
- Plays in fullscreen
- Works offline after first load
- Touch controls for mobile gameplay

## 🐛 Troubleshooting

**Can't install on mobile?**
- Make sure you're accessing via HTTPS (not HTTP)
- GitHub Pages, Netlify, and Vercel all provide HTTPS automatically

**Icons not showing?**
- Clear browser cache
- The icons will appear after the first visit

**Game not loading?**
- Check browser console for errors
- Ensure all files are uploaded correctly
- Try clearing the service worker cache

## 🌐 Share Your Game

Once hosted, share your game URL:
- Post on social media
- Send to friends
- Anyone can play in their browser
- iOS/Android users can install it as an app!

---

**Need help?** Check the main README.md for more information about the game itself.
