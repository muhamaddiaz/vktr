$(document).ready(function() {
    // Burger menu toggle
    $('#burgerMenu').on('click', function() {
        $('#fullscreenMenu').addClass('active');
        $('body').addClass('menu-open'); // Prevent body scrolling
    });
    
    // Close menu
    $('#closeMenu').on('click', function() {
        $('#fullscreenMenu').removeClass('active');
        $('body').removeClass('menu-open'); // Restore body scrolling
    });
    
    // Close menu when clicking outside
    $('#fullscreenMenu').on('click', function(e) {
        if (e.target === this) {
            $('#fullscreenMenu').removeClass('active');
            $('body').removeClass('menu-open');
        }
    });
    
    // Close menu with ESC key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('#fullscreenMenu').removeClass('active');
            $('body').removeClass('menu-open');
        }
    });
    
    // Language selector functionality
    $('.language-selector .dropdown-item').on('click', function(e) {
        e.preventDefault();
        
        // Remove active class from all items
        $('.language-selector .dropdown-item').removeClass('active');
        
        // Add active class to clicked item
        $(this).addClass('active');
        
        // Update button text
        $('.language-selector .dropdown-toggle span').text($(this).text());
        
        // Get selected language
        const selectedLang = $(this).attr('data-lang');
        console.log('Selected language:', selectedLang);

    });
    
    // Submenu toggle
    $('.menu-item').on('click', function(e) {
        e.preventDefault();
        
        // Toggle active class
        $(this).toggleClass('active');
        
        // Close other submenus
        $('.menu-item').not(this).removeClass('active');
    });
    
    // Third-level submenu toggle
    $('.submenu-link').on('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        // Get the parent submenu-item
        const parentItem = $(this).closest('.submenu-item');
        
        // Toggle active class for third-level menu
        parentItem.toggleClass('active');
        
        // Close other third-level submenus
        $('.submenu-item').not(parentItem).removeClass('active');
    });
    
    // Prevent submenu links from closing the submenu
    $('.submenu a').on('click', function(e) {
        e.stopPropagation();
    });
    
    // Prevent third-level menu links from closing the menu
    $('.third-level-menu a').on('click', function(e) {
        e.stopPropagation();
    });
        
    // Sticky header functionality
    let lastScrollTop = 0;
    let isHeaderSticky = false;
    const header = $('header');
    const headerHeight = 80;

    
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();

        // Show sticky header when scrolling down after passing header height
        if (scrollTop > headerHeight && scrollTop > lastScrollTop && !isHeaderSticky) {
            // Scrolling down
            header.addClass('sticky');
            $('body').addClass('header-sticky');
            isHeaderSticky = true;
        } else if (scrollTop <= headerHeight || scrollTop < lastScrollTop - 0) {
            // Scrolling up or near top
            header.removeClass('sticky');
            $('body').removeClass('header-sticky');
            isHeaderSticky = false;
        }
        
        lastScrollTop = scrollTop;
    });

    /* --------------------------------------------------
       Navbar scroll effect: make background transparent
       when at top, add .scrolled class after the user
       scrolls past the navbar height
    -------------------------------------------------- */
    const $navbar = $('.navbar');
    const NAVBAR_HEIGHT = $navbar.outerHeight();

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > NAVBAR_HEIGHT) {
            $navbar.addClass('scrolled');
        } else {
            $navbar.removeClass('scrolled');
        }
    });

    // Splide trucks section
    const splideOptions = {
        perPage: 4,
        gap: 0,
        pagination: true,
        arrows: false,
        classes: {
            pagination: 'splide__pagination splide__pagination-products',
            page: 'splide__pagination__page',
        },
        breakpoints: {
            992: { perPage: 2, gap: 0 },
            576: { perPage: 1, gap: 0 }
        }
    };

    const sliderIds = [
        'headerSlider',
        'busSlider',
        'trucksSlider',
        'specialVehicleSlider',
        'partnersSlider',
        'testimonialsSlider'
    ];
    const sliders = {};

    $.each(sliderIds, function(index, id) {
        const $sliderEl = $('#' + id);
        if (!$sliderEl.length) return;

        let sliderOptions = {
            perPage: 1,
            pagination: true,
            classes: {
                pagination: 'splide__pagination',
                page: 'splide__pagination__page',
            },
            arrows: false,
        };

        switch (id) {
            case 'headerSlider':
                sliderOptions = {
                    perPage: 1,
                    pagination: true,
                    classes: {
                        pagination: 'splide__pagination splide__pagination-header',
                        page: 'splide__pagination__page',
                    },
                    arrows: false,
                    type: 'loop',
                    autoplay: true,
                };
                break;
            case 'partnersSlider':
                sliderOptions = {
                    perPage: 1,
                    pagination: true,
                    classes: {
                        pagination: 'splide__pagination',
                        page: 'splide__pagination__page',
                    },
                    arrows: false,
                };
                break;
            case 'testimonialsSlider':
                sliderOptions = {
                    perPage: 2,
                    pagination: true,
                    classes: {
                        pagination: 'splide__pagination',
                        page: 'splide__pagination__page',
                    },
                    arrows: false,
                    breakpoints: {
                        576: { perPage: 1, gap: 0 }
                    }
                };
                break;
            default:
                sliderOptions = splideOptions;
                break;
        }
        
        const slider = new Splide('#' + id, sliderOptions);
        
        slider.on('pagination:mounted', function(data) {
            $(data.list).addClass('splide__pagination--custom');
            
            $.each(data.items, function(_, item) {
                const $button = $(item.button);
                $button.attr('aria-label', 'Go to slide ' + (item.page + 1));
                
                $button.on('click', function() {
                    $button.addClass('clicked');
                    setTimeout(function() {
                        $button.removeClass('clicked');
                    }, 300);
                });
            });
        });

        slider.mount();
        sliders[id] = slider;
    });
});