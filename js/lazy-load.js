/* ========================================
   LAZY LOADING OPTIMIZATION
   Improve page load performance
   ======================================== */

(function() {
    'use strict';

    // Lazy load images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver(function(entries, observer) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(function(img) {
                imageObserver.observe(img);
            });
        } else {
            // Fallback for older browsers
            images.forEach(function(img) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', lazyLoadImages);
    } else {
        lazyLoadImages();
    }

    // Preload critical images
    function preloadCriticalImages() {
        const criticalImages = [
            'images/logo.png'
            // Add more critical images here
        ];

        criticalImages.forEach(function(src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    preloadCriticalImages();

})();

