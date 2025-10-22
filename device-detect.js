/**
 * Device Detection and Graphics Quality Manager
 * Detects mobile vs desktop and adjusts game settings accordingly
 */

(function() {
    'use strict';
    
    // Device detection function
    function detectDevice() {
        const ua = navigator.userAgent || navigator.vendor || window.opera;
        
        // Check for mobile devices
        const isMobile = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase());
        
        // Check for tablet
        const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(ua.toLowerCase());
        
        // Check touch capability
        const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        // Check screen size
        const isSmallScreen = window.innerWidth < 768 || window.innerHeight < 600;
        
        // Performance detection
        const deviceMemory = navigator.deviceMemory || 4; // GB, defaults to 4
        const hardwareConcurrency = navigator.hardwareConcurrency || 2; // CPU cores
        
        // Determine if mobile or low-end device
        const isMobileDevice = isMobile || (hasTouch && isSmallScreen);
        const isLowEndDevice = deviceMemory < 4 || hardwareConcurrency < 4;
        
        return {
            isMobile: isMobileDevice,
            isTablet: isTablet,
            isDesktop: !isMobileDevice && !isTablet,
            hasTouch: hasTouch,
            isLowEnd: isLowEndDevice,
            screenWidth: window.innerWidth,
            screenHeight: window.innerHeight,
            deviceMemory: deviceMemory,
            cpuCores: hardwareConcurrency,
            pixelRatio: window.devicePixelRatio || 1
        };
    }
    
    // Apply graphics settings based on device
    function applyGraphicsSettings(deviceInfo) {
        const settings = {
            quality: 'high',
            textureResolution: 1.0,
            particleEffects: true,
            shadows: true,
            antialiasing: true,
            maxSprites: 100,
            frameRate: 60
        };
        
        // Adjust for mobile devices
        if (deviceInfo.isMobile) {
            settings.quality = 'medium';
            settings.textureResolution = 0.75;
            settings.particleEffects = false;
            settings.shadows = false;
            settings.antialiasing = false;
            settings.maxSprites = 50;
            settings.frameRate = 30;
            
            console.log('🎮 Mobile device detected - Using optimized settings');
        }
        
        // Further adjust for low-end devices
        if (deviceInfo.isLowEnd) {
            settings.quality = 'low';
            settings.textureResolution = 0.5;
            settings.particleEffects = false;
            settings.shadows = false;
            settings.antialiasing = false;
            settings.maxSprites = 30;
            settings.frameRate = 30;
            
            console.log('⚡ Low-end device detected - Using minimal settings');
        }
        
        // Adjust for desktop/high-end devices
        if (deviceInfo.isDesktop && !deviceInfo.isLowEnd) {
            settings.quality = 'ultra';
            settings.textureResolution = 1.5;
            settings.particleEffects = true;
            settings.shadows = true;
            settings.antialiasing = true;
            settings.maxSprites = 150;
            settings.frameRate = 60;
            
            console.log('💻 Desktop device detected - Using enhanced settings');
        }
        
        // High DPI adjustments
        if (deviceInfo.pixelRatio > 2 && !deviceInfo.isMobile) {
            settings.textureResolution *= 1.5;
            console.log('🖥️ High DPI display detected - Enhanced textures');
        }
        
        return settings;
    }
    
    // Apply visual styles based on device
    function applyVisualStyles(deviceInfo, settings) {
        const root = document.getElementById('root');
        const iframe = document.getElementById('simframe');
        
        if (!root || !iframe) return;
        
        // Add device class to root
        if (deviceInfo.isMobile) {
            root.classList.add('mobile-device');
            root.classList.add('optimized-graphics');
        } else if (deviceInfo.isDesktop) {
            root.classList.add('desktop-device');
            root.classList.add('enhanced-graphics');
        }
        
        // Apply CSS filters and enhancements
        if (settings.quality === 'ultra') {
            iframe.style.filter = 'contrast(1.1) saturate(1.1) brightness(1.05)';
            iframe.style.imageRendering = 'crisp-edges';
        } else if (settings.quality === 'low' || settings.quality === 'medium') {
            iframe.style.filter = 'contrast(1.0) saturate(1.0)';
            iframe.style.imageRendering = 'pixelated';
        }
        
        // Add performance CSS
        if (deviceInfo.isMobile || deviceInfo.isLowEnd) {
            iframe.style.willChange = 'auto';
            iframe.style.transform = 'translateZ(0)';
        }
    }
    
    // Display device info banner
    function showDeviceInfo(deviceInfo, settings) {
        const banner = document.createElement('div');
        banner.id = 'device-info-banner';
        banner.style.cssText = `
            position: fixed;
            top: 10px;
            right: 10px;
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 12px;
            z-index: 10000;
            max-width: 250px;
            opacity: 0;
            transition: opacity 0.3s;
            pointer-events: none;
        `;
        
        let deviceType = deviceInfo.isMobile ? '📱 Mobile' : 
                        deviceInfo.isTablet ? '📱 Tablet' : 
                        '💻 Desktop';
        
        banner.innerHTML = `
            <strong>${deviceType}</strong><br>
            Quality: <span style="color: ${
                settings.quality === 'ultra' ? '#00ff00' :
                settings.quality === 'high' ? '#88ff00' :
                settings.quality === 'medium' ? '#ffaa00' : '#ff4400'
            }">${settings.quality.toUpperCase()}</span><br>
            Resolution: ${settings.textureResolution.toFixed(2)}x<br>
            Max FPS: ${settings.frameRate}<br>
            ${deviceInfo.screenWidth}x${deviceInfo.screenHeight}
        `;
        
        document.body.appendChild(banner);
        
        // Fade in
        setTimeout(() => banner.style.opacity = '1', 100);
        
        // Fade out after 5 seconds
        setTimeout(() => {
            banner.style.opacity = '0';
            setTimeout(() => banner.remove(), 300);
        }, 5000);
    }
    
    // Store settings globally for game to access
    function storeSettings(deviceInfo, settings) {
        window.DONUT_SNATCHER_SETTINGS = {
            device: deviceInfo,
            graphics: settings
        };
        
        // Also store in localStorage for persistence
        try {
            localStorage.setItem('donut-snatcher-device', JSON.stringify(deviceInfo));
            localStorage.setItem('donut-snatcher-settings', JSON.stringify(settings));
        } catch (e) {
            console.warn('Could not save settings to localStorage:', e);
        }
    }
    
    // Initialize on page load
    function initialize() {
        console.log('🍩 Donut Snatcher - Device Detection Initializing...');
        
        const deviceInfo = detectDevice();
        const settings = applyGraphicsSettings(deviceInfo);
        
        console.log('Device Info:', deviceInfo);
        console.log('Graphics Settings:', settings);
        
        applyVisualStyles(deviceInfo, settings);
        storeSettings(deviceInfo, settings);
        showDeviceInfo(deviceInfo, settings);
        
        // Dispatch custom event for game to listen to
        window.dispatchEvent(new CustomEvent('donut-snatcher-ready', {
            detail: { device: deviceInfo, settings: settings }
        }));
        
        console.log('✅ Device detection complete!');
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
    // Re-detect on window resize (orientation change on mobile)
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            console.log('🔄 Window resized - Re-detecting device...');
            initialize();
        }, 500);
    });
    
})();
