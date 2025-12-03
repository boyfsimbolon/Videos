/* ========================================
   FILM PREMIERE CUSTOM JAVASCRIPT
   Professional Movie Website Interactions
   ======================================== */

(function($) {
    'use strict';

    // Countdown Timer Function
    function initCountdown() {
        // Set the premiere date (December 15, 2025 at 8:00 PM)
        const premiereDate = new Date('December 15, 2025 20:00:00').getTime();
        
        // Update countdown every second
        const countdownInterval = setInterval(function() {
            const now = new Date().getTime();
            const distance = premiereDate - now;
            
            // Calculate time units
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            // Display countdown
            $('#countdown-days').text(days);
            $('#countdown-hours').text(hours);
            $('#countdown-minutes').text(minutes);
            $('#countdown-seconds').text(seconds);
            
            // If countdown is finished
            if (distance < 0) {
                clearInterval(countdownInterval);
                $('#countdown-timer').html('<h2 class="text-glow">NOW SHOWING!</h2>');
            }
        }, 1000);
    }

    // Video Player Controls
    function initVideoPlayer() {
        const video = $('#trailer-video');
        
        if (video.length) {
            // Play video on click
            $('#play-trailer-btn').on('click', function(e) {
                e.preventDefault();
                video[0].play();
                $(this).fadeOut();
            });
            
            // Show play button when video pauses
            video.on('pause', function() {
                $('#play-trailer-btn').fadeIn();
            });
            
            // Hide play button when video plays
            video.on('play', function() {
                $('#play-trailer-btn').fadeOut();
            });
        }
    }

    // Gallery Lightbox Enhancement
    function initGalleryLightbox() {
        if ($.fn.magnificPopup) {
            $('.popup-gallery').magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true,
                    navigateByImgClick: true,
                    preload: [0, 1]
                },
                image: {
                    titleSrc: 'title',
                    verticalFit: true
                },
                callbacks: {
                    beforeOpen: function() {
                        // Add animation class
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                    }
                }
            });
        }
    }

    // Smooth Scroll with Offset
    function initSmoothScroll() {
        $('a.scrool[href*="#"]:not([href="#"])').on('click', function(e) {
            if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && 
                location.hostname === this.hostname) {
                
                let target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                
                if (target.length) {
                    e.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 1000, 'easeInOutExpo');
                    return false;
                }
            }
        });
    }

    // Parallax Effect
    function initParallax() {
        $(window).on('scroll', function() {
            const scrolled = $(window).scrollTop();
            $('.parallax-section').css('background-position-y', -(scrolled * 0.5) + 'px');
        });
    }

    // Cast Member Hover Effect
    function initCastHover() {
        $('.cast-card').hover(
            function() {
                $(this).find('.cast-info').slideDown(300);
            },
            function() {
                // Keep info visible
            }
        );
    }

    // Ticket Selection
    function initTicketSelection() {
        $('.ticket-card').on('click', function() {
            $('.ticket-card').removeClass('selected');
            $(this).addClass('selected');
            
            const ticketType = $(this).find('.ticket-type').text();
            const ticketPrice = $(this).find('.ticket-price').text();
            
            // Store selection (can be used for checkout)
            sessionStorage.setItem('selectedTicket', JSON.stringify({
                type: ticketType,
                price: ticketPrice
            }));
        });
    }

    // Social Share Functionality
    function initSocialShare() {
        $('.share-facebook').on('click', function(e) {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, 'facebook-share', 'width=580,height=296');
        });
        
        $('.share-twitter').on('click', function(e) {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Check out this amazing film premiere!');
            window.open('https://twitter.com/intent/tweet?url=' + url + '&text=' + text, 'twitter-share', 'width=550,height=235');
        });
        
        $('.share-whatsapp').on('click', function(e) {
            e.preventDefault();
            const url = encodeURIComponent(window.location.href);
            const text = encodeURIComponent('Check out this amazing film premiere! ');
            window.open('https://wa.me/?text=' + text + url, 'whatsapp-share');
        });
    }

    // Scroll Animations
    function initScrollAnimations() {
        if (typeof WOW !== 'undefined') {
            new WOW({
                boxClass: 'wow',
                animateClass: 'animated',
                offset: 100,
                mobile: true,
                live: true
            }).init();
        }
    }

    // Navigation Active State
    function initNavigation() {
        $(window).on('scroll', function() {
            const scrollPos = $(window).scrollTop();
            
            $('section[id]').each(function() {
                const sectionTop = $(this).offset().top - 100;
                const sectionBottom = sectionTop + $(this).outerHeight();
                const sectionId = $(this).attr('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    $('nav a').removeClass('active');
                    $('nav a[href="#' + sectionId + '"]').addClass('active');
                }
            });
        });
    }

    // Loading Screen
    function initLoadingScreen() {
        $(window).on('load', function() {
            $('#loader').fadeOut(500);
        });
    }

    // Video Background
    function initVideoBackground() {
        const videoBg = $('#video-background');
        if (videoBg.length) {
            videoBg.on('loadeddata', function() {
                $(this).fadeIn(1000);
            });
        }
    }

    // Cast Filter
    function initCastFilter() {
        $('.cast-filter-btn').on('click', function() {
            $('.cast-filter-btn').removeClass('active');
            $(this).addClass('active');
            
            const filter = $(this).data('filter');
            
            if (filter === 'all') {
                $('.cast-card').fadeIn(400);
            } else {
                $('.cast-card').hide();
                $('.cast-card[data-role="' + filter + '"]').fadeIn(400);
            }
        });
    }

    // Newsletter Subscription
    function initNewsletterForm() {
        $('#newsletter-form').on('submit', function(e) {
            e.preventDefault();
            
            const email = $('#newsletter-email').val();
            
            // Simple validation
            if (email && validateEmail(email)) {
                // Show success message
                $('#newsletter-message').html('<p class="success">Thank you for subscribing!</p>').fadeIn();
                $('#newsletter-email').val('');
                
                // Hide message after 3 seconds
                setTimeout(function() {
                    $('#newsletter-message').fadeOut();
                }, 3000);
            } else {
                $('#newsletter-message').html('<p class="error">Please enter a valid email address.</p>').fadeIn();
            }
        });
    }

    // Email Validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Back to Top Button
    function initBackToTop() {
        $(window).on('scroll', function() {
            if ($(this).scrollTop() > 300) {
                $('.top-scroll').fadeIn();
            } else {
                $('.top-scroll').fadeOut();
            }
        });
    }

    // Trailer Auto-play on Scroll
    function initTrailerAutoplay() {
        const trailer = $('#trailer-video')[0];
        
        if (trailer) {
            $(window).on('scroll', function() {
                const trailerSection = $('#trailer');
                if (trailerSection.length) {
                    const sectionTop = trailerSection.offset().top;
                    const sectionBottom = sectionTop + trailerSection.outerHeight();
                    const scrollPos = $(window).scrollTop() + $(window).height() / 2;
                    
                    if (scrollPos > sectionTop && scrollPos < sectionBottom) {
                        // In view - can auto-play if desired
                        // trailer.play();
                    } else {
                        // Out of view - pause
                        if (!trailer.paused) {
                            trailer.pause();
                        }
                    }
                }
            });
        }
    }

    // Image Lazy Loading
    function initLazyLoading() {
        $('img[data-src]').each(function() {
            const img = $(this);
            const src = img.attr('data-src');
            
            img.attr('src', src).removeAttr('data-src');
        });
    }

    // Initialize All Functions
    $(document).ready(function() {
        initLoadingScreen();
        initCountdown();
        initVideoPlayer();
        initGalleryLightbox();
        initSmoothScroll();
        initParallax();
        initCastHover();
        initTicketSelection();
        initSocialShare();
        initScrollAnimations();
        initNavigation();
        initVideoBackground();
        initCastFilter();
        initNewsletterForm();
        initBackToTop();
        initTrailerAutoplay();
        initLazyLoading();
        
        // Add smooth reveal on page load
        $('body').css('opacity', '0').animate({ opacity: 1 }, 500);
    });

    // Window Resize Handler
    $(window).on('resize', function() {
        // Adjust layouts on resize if needed
    });

    // Prevent Context Menu on Images (Optional - for production images)
    $('img').on('contextmenu', function(e) {
        // Uncomment to prevent right-click on images
        // e.preventDefault();
        // return false;
    });

})(jQuery);

// Countdown Timer HTML Generator (if not in HTML)
function generateCountdownHTML() {
    return `
        <div id="countdown-timer" class="countdown-timer">
            <div class="countdown-item">
                <span id="countdown-days" class="countdown-number">0</span>
                <span class="countdown-label">Days</span>
            </div>
            <div class="countdown-item">
                <span id="countdown-hours" class="countdown-number">0</span>
                <span class="countdown-label">Hours</span>
            </div>
            <div class="countdown-item">
                <span id="countdown-minutes" class="countdown-number">0</span>
                <span class="countdown-label">Minutes</span>
            </div>
            <div class="countdown-item">
                <span id="countdown-seconds" class="countdown-number">0</span>
                <span class="countdown-label">Seconds</span>
            </div>
        </div>
    `;
}
