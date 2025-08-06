// Home Banner Slider JavaScript
$(document).ready(function() {
    // Initialize Slick Slider
    // $('.banner-slider').slick({
    //     dots: true,
    //     infinite: true,
    //     speed: 800,
    //     fade: true,
    //     cssEase: 'linear',
    //     autoplay: true,
    //     autoplaySpeed: 5000,
    //     pauseOnHover: true,
    //     arrows: true,
    //     responsive: [
    //         {
    //             breakpoint: 768,
    //             settings: {
    //                 arrows: false,
    //                 dots: true
    //             }
    //         }
    //     ]
    // });

    // Video Modal Functionality
    const videoModal = $('#videoModal');
    const videoFrame = $('#videoFrame');
    const playButton = $('.play-button');
    const closeModal = $('.video-modal-close');

    console.log('hehe, ', playButton);
    
    // Sample video URL - replace with actual video URL
    const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0';
    
    // Open video modal
    playButton.on('click', function() {
        videoFrame.attr('src', videoUrl);
        videoModal.fadeIn(300);
        $('body').addClass('modal-open');
        
        // Pause slider when video modal is open
        // $('.banner-slider').slick('slickPause');
    });
    
    // Close video modal
    function closeVideoModal() {
        videoModal.fadeOut(300);
        videoFrame.attr('src', '');
        $('body').removeClass('modal-open');
        
        // Resume slider when video modal is closed
        // $('.banner-slider').slick('slickPlay');
    }
    
    closeModal.on('click', closeVideoModal);
    
    // Close modal when clicking outside
    videoModal.on('click', function(e) {
        if (e.target === this) {
            closeVideoModal();
        }
    });
    
    // Close modal with Escape key
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && videoModal.is(':visible')) {
            closeVideoModal();
        }
    });
    
    // Pause slider on video slide when autoplay is active
    $('.banner-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        // If moving to video slide (first slide), you might want to pause longer
        if (nextSlide === 0) {
            // Optional: extend autoplay time for video slide
        }
    });
    
    // Handle window resize
    $(window).on('resize', function() {
        $('.banner-slider').slick('refresh');
    });
    
    // Smooth scroll for CTA buttons (if needed)
    $('.cta-button').on('click', function(e) {
        const href = $(this).attr('href');
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const target = $(href);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80 // Adjust for header height
                }, 800);
            }
        }
    });
});

// Additional utility functions
function updateSliderHeight() {
    const headerHeight = $('header').outerHeight() || 80;
    const windowHeight = $(window).height();
    const bannerHeight = windowHeight - headerHeight;
    
    // $('.home-banner').css('height', bannerHeight + 'px');
}

// Update slider height on window resize
$(window).on('resize', updateSliderHeight);

// Initialize height on load
$(window).on('load', updateSliderHeight);

$(document).ready(function () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    const animatedSections = [
        '.about-us',
        '.leading-section',
        '.products-section',
        '.partners-section',
        '.testimonials-section',
        '.news-section',
        '.relations-section'
    ];

    animatedSections.forEach((sectionSelector) => {
        gsap.from(sectionSelector, {
            opacity: 0,
            y: 60,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: sectionSelector,
                start: 'top 80%', // when section top enters 80% of viewport height
                end: 'top 30%',   // when section top reaches 30% of viewport
                toggleActions: 'play none none reverse'
            }
        });
    });

    function animatePrice(priceEl, trigger) {
        if (priceEl) {
            const raw = priceEl.textContent.replace(/[^0-9]/g, '');
            const targetVal = parseInt(raw, 10) || 0;

            const counterObj = { val: 0 };
            gsap.to(counterObj, {
                val: targetVal,
                duration: 2,
                ease: 'power1.out',
                scrollTrigger: {
                    trigger,
                    start: 'top 80%',
                    once: true
                },
                onUpdate: () => {
                    priceEl.textContent = 'IDR' + Math.floor(counterObj.val).toLocaleString();
                }
            });
        }
    }

    const statistics = document.querySelectorAll('.stat-number');
    statistics.forEach((stat) => {
        animatePrice(stat, '.leading-section');
    });

    const priceEl = document.querySelector('.current-price h2');
    animatePrice(priceEl, '.relations-section');

    const priceEl2 = document.querySelectorAll('.history h3');
    priceEl2.forEach((priceEl) => {
        animatePrice(priceEl, '.relations-section');
    });
});