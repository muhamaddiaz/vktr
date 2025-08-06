// Milestones Timeline JavaScript

$(document).ready(function() {
    // Initialize timeline animations
    initTimelineAnimations();
    
    // Add hover effects to timeline items
    $('.timeline-content').hover(
        function() {
            $(this).addClass('timeline-hover');
        },
        function() {
            $(this).removeClass('timeline-hover');
        }
    );
    
    // Add click functionality to milestone images for lightbox effect
    $('.milestone-image').click(function() {
        const imageSrc = $(this).attr('src');
        const imageAlt = $(this).attr('alt');
        showImageLightbox(imageSrc, imageAlt);
    });
    
    // Smooth scroll to timeline items when clicking year badges
    $('.timeline-year').click(function() {
        const timelineItem = $(this).closest('.timeline-item');
        $('html, body').animate({
            scrollTop: timelineItem.offset().top - 100
        }, 500);
    });
});

// Initialize timeline scroll animations
function initTimelineAnimations() {
    function animateTimelineOnScroll() {
        $('.timeline-item').each(function(index) {
            const itemTop = $(this).offset().top;
            const itemBottom = itemTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            // Check if item is in viewport
            if (itemBottom > viewportTop && itemTop < viewportBottom - 100) {
                // Add staggered delay for animation
                setTimeout(() => {
                    $(this).addClass('animate-in');
                }, index * 200);
            }
        });
    }
    
    // Run animation on scroll
    $(window).scroll(animateTimelineOnScroll);
    
    // Run animation on page load
    animateTimelineOnScroll();
}

// Simple lightbox function for milestone images
function showImageLightbox(imageSrc, imageAlt) {
    // Create lightbox overlay
    const lightboxHTML = `
        <div class="milestone-lightbox" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
        ">
            <div style="
                max-width: 90%;
                max-height: 90%;
                position: relative;
            ">
                <img src="${imageSrc}" alt="${imageAlt}" style="
                    max-width: 100%;
                    max-height: 100%;
                    border-radius: 8px;
                    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
                ">
                <button style="
                    position: absolute;
                    top: -15px;
                    right: -15px;
                    background: white;
                    border: none;
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    font-size: 20px;
                    cursor: pointer;
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                " onclick="closeLightbox()">&times;</button>
            </div>
        </div>
    `;
    
    // Add lightbox to body
    $('body').append(lightboxHTML);
    
    // Close lightbox when clicking outside image
    $('.milestone-lightbox').click(function(e) {
        if (e.target === this) {
            closeLightbox();
        }
    });
    
    // Close lightbox with ESC key
    $(document).keyup(function(e) {
        if (e.keyCode === 27) {
            closeLightbox();
        }
    });
}

// Close lightbox function
function closeLightbox() {
    $('.milestone-lightbox').fadeOut(300, function() {
        $(this).remove();
    });
    $(document).off('keyup');
}

// Add dynamic CSS for enhanced interactions
const milestonesStyle = document.createElement('style');
milestonesStyle.textContent = `
    .timeline-content.timeline-hover {
        transform: translateY(-8px) !important;
        box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15) !important;
    }
    
    .milestone-image {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .milestone-image:hover {
        transform: scale(1.02);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .timeline-year {
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .timeline-year:hover {
        transform: translateX(-50%) scale(1.1);
        box-shadow: 0 6px 20px rgba(113, 227, 220, 0.4);
    }
    
    .timeline-content {
        position: relative;
        overflow: visible;
    }
    
    .timeline-content::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(113, 227, 220, 0.1), transparent);
        transition: left 0.5s ease;
    }
    
    .timeline-content:hover::before {
        left: 100%;
    }
    
    @media (max-width: 767.98px) {
        .timeline-year:hover {
            transform: scale(1.1);
        }
    }
`;
document.head.appendChild(milestonesStyle);

// Intersection Observer for better performance (alternative to scroll event)
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const timelineObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry, index) {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 200);
                timelineObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all timeline items when DOM is ready
    $(document).ready(function() {
        $('.timeline-item').each(function() {
            timelineObserver.observe(this);
        });
    });
}