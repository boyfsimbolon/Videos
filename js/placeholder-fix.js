/* ========================================
   PLACEHOLDER IMAGE FIX
   Replace broken placehold.it with working alternatives
   ======================================== */

(function() {
    'use strict';

    // Alternative placeholder services (in order of preference)
    const PLACEHOLDER_SERVICES = [
        'https://via.placeholder.com/',           // Most reliable
        'https://dummyimage.com/',                // Backup 1
        'https://fakeimg.pl/'                     // Backup 2
    ];

    // Use via.placeholder.com as default
    const DEFAULT_SERVICE = PLACEHOLDER_SERVICES[0];

    // Function to generate placeholder URL
    function generatePlaceholderURL(width, height, text) {
        text = text || `${width}x${height}`;
        
        // via.placeholder.com format: https://via.placeholder.com/WIDTHxHEIGHT/BGCOLOR/TEXTCOLOR?text=TEXT
        return `${DEFAULT_SERVICE}${width}x${height}/333333/FFFFFF?text=${encodeURIComponent(text)}`;
    }

    // Function to fix all placeholder images
    function fixPlaceholderImages() {
        // Find all images with placehold.it
        const images = document.querySelectorAll('img[src*="placehold.it"], img[data-src*="placehold.it"]');
        
        images.forEach(function(img) {
            const oldSrc = img.src || img.getAttribute('data-src');
            
            if (oldSrc && oldSrc.includes('placehold.it')) {
                // Extract dimensions from URL
                // Format: http://placehold.it/WIDTHxHEIGHT
                const match = oldSrc.match(/placehold\.it\/(\d+)x(\d+)/);
                
                if (match) {
                    const width = match[1];
                    const height = match[2];
                    const newSrc = generatePlaceholderURL(width, height, 'Image');
                    
                    // Replace the source
                    if (img.hasAttribute('data-src')) {
                        img.setAttribute('data-src', newSrc);
                    } else {
                        img.src = newSrc;
                    }
                    
                    console.log(`Fixed placeholder: ${width}x${height}`);
                }
            }
        });
    }

    // Function to fix background images in CSS
    function fixBackgroundImages() {
        const elements = document.querySelectorAll('[style*="placehold.it"]');
        
        elements.forEach(function(el) {
            const style = el.getAttribute('style');
            if (style && style.includes('placehold.it')) {
                const match = style.match(/placehold\.it\/(\d+)x(\d+)/);
                if (match) {
                    const width = match[1];
                    const height = match[2];
                    const newSrc = generatePlaceholderURL(width, height, 'Background');
                    const newStyle = style.replace(/http:\/\/placehold\.it\/\d+x\d+/, newSrc);
                    el.setAttribute('style', newStyle);
                }
            }
        });
    }

    // Function to fix anchor links with placehold.it
    function fixPlaceholderLinks() {
        const links = document.querySelectorAll('a[href*="placehold.it"]');
        
        links.forEach(function(link) {
            const oldHref = link.href;
            
            if (oldHref && oldHref.includes('placehold.it')) {
                const match = oldHref.match(/placehold\.it\/(\d+)x(\d+)/);
                
                if (match) {
                    const width = match[1];
                    const height = match[2];
                    const newHref = generatePlaceholderURL(width, height, 'Gallery');
                    link.href = newHref;
                }
            }
        });
    }

    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            fixPlaceholderImages();
            fixBackgroundImages();
            fixPlaceholderLinks();
        });
    } else {
        fixPlaceholderImages();
        fixBackgroundImages();
        fixPlaceholderLinks();
    }

    // Also run after a short delay to catch dynamically loaded content
    setTimeout(function() {
        fixPlaceholderImages();
        fixBackgroundImages();
        fixPlaceholderLinks();
    }, 1000);

    // Expose function globally for manual fixing if needed
    window.fixPlaceholders = function() {
        fixPlaceholderImages();
        fixBackgroundImages();
        fixPlaceholderLinks();
        console.log('Placeholders fixed!');
    };

})();

