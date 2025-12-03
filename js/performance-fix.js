/* ========================================
   PERFORMANCE OPTIMIZATION FIXES
   Handles passive event listeners and loading
   ======================================== */

(function() {
    'use strict';

    // Fix passive event listener warnings
    // Override addEventListener to make touch/wheel events passive by default
    var supportsPassive = false;
    try {
        var opts = Object.defineProperty({}, 'passive', {
            get: function() {
                supportsPassive = true;
            }
        });
        window.addEventListener('testPassive', null, opts);
        window.removeEventListener('testPassive', null, opts);
    } catch (e) {}

    // Store the original addEventListener
    var originalAddEventListener = EventTarget.prototype.addEventListener;

    // Override addEventListener
    EventTarget.prototype.addEventListener = function(type, listener, options) {
        var usesListenerOptions = typeof options === 'object' && options !== null;
        var useCapture = usesListenerOptions ? options.capture : options;

        options = usesListenerOptions ? options : {};
        options.passive = options.passive !== undefined ? options.passive : (type === 'touchstart' || type === 'touchmove' || type === 'wheel' || type === 'mousewheel');
        options.capture = useCapture !== undefined ? useCapture : false;

        originalAddEventListener.call(this, type, listener, supportsPassive ? options : options.capture);
    };

    // Optimize page load
    window.addEventListener('load', function() {
        // Remove loader after everything is loaded
        var loader = document.getElementById('loader');
        if (loader) {
            setTimeout(function() {
                loader.style.display = 'none';
            }, 300);
        }
    });

    // Handle Revolution Slider gracefully if not loaded
    window.addEventListener('DOMContentLoaded', function() {
        var revSlider = document.getElementById('rev_slider_2_1');
        if (revSlider && typeof jQuery !== 'undefined') {
            // Check if Revolution Slider is loaded
            setTimeout(function() {
                if (!jQuery.fn.revolution) {
                    console.warn('Revolution Slider not loaded - hiding slider container');
                    if (revSlider.parentElement) {
                        revSlider.parentElement.style.display = 'none';
                    }
                }
            }, 1000);
        }
    });

    // Prevent console errors from breaking the page
    var originalError = console.error;
    console.error = function() {
        // Log the error but don't let it break the page
        originalError.apply(console, arguments);
    };

})();
