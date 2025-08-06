// Capital Market Professionals JavaScript

$(document).ready(function() {
    // Add smooth hover animations for market cards
    $('.market-card').hover(
        function() {
            $(this).addClass('card-hover');
        },
        function() {
            $(this).removeClass('card-hover');
        }
    );
    
    // Add click functionality to contact items
    $('.contact-item').click(function(e) {
        const contactText = $(this).find('span').text();
        const contactType = $(this).find('i').attr('class');
        
        if (contactType.includes('fa-phone')) {
            // Handle phone click
            window.location.href = 'tel:' + contactText.replace(/[^0-9+]/g, '');
        } else if (contactType.includes('fa-envelope')) {
            // Handle email click
            window.location.href = 'mailto:' + contactText;
        } else if (contactType.includes('fa-globe')) {
            // Handle website click
            let url = contactText;
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            window.open(url, '_blank');
        }
    });
    
    // Add cursor pointer for clickable contact items
    $('.contact-item').css('cursor', 'pointer');
    
    // Animate cards on scroll
    function animateCardsOnScroll() {
        $('.market-card').each(function() {
            const cardTop = $(this).offset().top;
            const cardBottom = cardTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();
            
            if (cardBottom > viewportTop && cardTop < viewportBottom) {
                $(this).addClass('animate-in');
            }
        });
    }
    
    // Run animation on scroll
    $(window).scroll(animateCardsOnScroll);
    
    // Run animation on page load
    animateCardsOnScroll();
    
    // Add staggered animation delay for cards
    $('.market-card').each(function(index) {
        $(this).css('animation-delay', (index * 0.1) + 's');
    });
});

// Add CSS animation class
const style = document.createElement('style');
style.textContent = `
    .market-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .market-card.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .market-card.card-hover {
        transform: translateY(-8px) !important;
    }
    
    .contact-item:hover {
        color: #71E3DC !important;
        transform: translateX(5px);
        transition: all 0.3s ease;
    }
    
    .contact-item:hover i {
        color: #5CC7C1 !important;
    }
`;
document.head.appendChild(style);