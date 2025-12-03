/* ========================================
   MULTI-PAGE NAVIGATION HANDLER
   Smooth navigation between pages
   ======================================== */

(function($) {
    'use strict';

    // Handle navigation with hash (anchor links)
    function handleHashNavigation() {
        // Check if URL has hash on page load
        if (window.location.hash) {
            setTimeout(function() {
                var hash = window.location.hash;
                var target = $(hash);
                
                if (target.length) {
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 800, 'easeInOutExpo');
                }
            }, 300); // Wait for page to load
        }
    }

    // Smooth scroll for same-page links
    function initSmoothScroll() {
        $(document).on('click', 'a.scroll-link, a.scrool', function(e) {
            var href = $(this).attr('href');
            
            // Check if it's a same-page anchor link
            if (href && href.indexOf('#') === 0) {
                e.preventDefault();
                
                var target = $(href);
                if (target.length) {
                    // Close mobile menu if open
                    $('.navbar-collapse').collapse('hide');
                    
                    // Smooth scroll
                    $('html, body').animate({
                        scrollTop: target.offset().top - 80
                    }, 800, 'easeInOutExpo');
                }
            }
            // If it's a link to another page with hash, let it navigate normally
            // Browser will handle the page load and hash scroll
        });
    }

    // Update active menu item based on scroll position (for index.html)
    function updateActiveMenuItem() {
        if ($('body').hasClass('home-page')) {
            var scrollPos = $(window).scrollTop() + 100;
            
            $('section[id]').each(function() {
                var section = $(this);
                var sectionTop = section.offset().top;
                var sectionBottom = sectionTop + section.outerHeight();
                var sectionId = section.attr('id');
                
                if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
                    $('.nav li').removeClass('selected');
                    $('.nav li a[href="#' + sectionId + '"]').parent().addClass('selected');
                }
            });
        }
    }

    // Page transition effect
    function initPageTransition() {
        // Fade in on page load
        $('body').css('opacity', '0');
        $(window).on('load', function() {
            $('body').animate({ opacity: 1 }, 300);
        });

        // Fade out on page leave (optional - can be removed if too slow)
        // Uncomment if you want fade out effect
        /*
        $('a:not([target="_blank"]):not([href^="#"]):not(.no-transition)').on('click', function(e) {
            var href = $(this).attr('href');
            
            if (href && href !== '#' && !href.match(/^mailto:/) && !href.match(/^tel:/)) {
                e.preventDefault();
                
                $('body').animate({ opacity: 0 }, 200, function() {
                    window.location.href = href;
                });
            }
        });
        */
    }

    // Mobile menu auto-close on link click
    function initMobileMenuClose() {
        $('.navbar-nav a').on('click', function() {
            if ($(window).width() < 768) {
                $('.navbar-collapse').collapse('hide');
            }
        });
    }

    // Add active class to current page menu item
    function setActiveMenuPage() {
        var currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        $('.navbar-nav li').removeClass('selected');
        
        $('.navbar-nav a').each(function() {
            var href = $(this).attr('href');
            
            if (href) {
                // Extract filename from href
                var linkPage = href.split('/').pop().split('#')[0] || 'index.html';
                
                if (linkPage === currentPage) {
                    $(this).parent().addClass('selected');
                }
            }
        });
    }

    // Initialize all functions
    $(document).ready(function() {
        // Mark homepage
        if (window.location.pathname.endsWith('index.html') || 
            window.location.pathname.endsWith('/') ||
            window.location.pathname === '') {
            $('body').addClass('home-page');
        }

        setActiveMenuPage();
        initSmoothScroll();
        handleHashNavigation();
        initPageTransition();
        initMobileMenuClose();
        
        // Update active menu on scroll (only for homepage)
        if ($('body').hasClass('home-page')) {
            $(window).on('scroll', updateActiveMenuItem);
        }
    });

    // Handle browser back/forward with hash
    $(window).on('hashchange', function() {
        handleHashNavigation();
    });

})(jQuery);

