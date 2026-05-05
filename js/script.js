/* ================================================
   NIPRO AGENCY - main.js
   jQuery-powered interactions & plugins
   ================================================ */

$(document).ready(function () {

    /* ------------------------------------------------
       1. NAVBAR – Sticky + Active Link on Scroll
    ------------------------------------------------ */
    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 80) {
            $('#mainNav').addClass('scrolled');
        } else {
            $('#mainNav').removeClass('scrolled');
        }

        // Back to top
        if ($(this).scrollTop() > 300) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }

        // Active nav highlight
        var scrollPos = $(this).scrollTop() + 80;
        $('section[id]').each(function () {
            var top = $(this).offset().top;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');
            if (scrollPos >= top && scrollPos < bottom) {
                $('.nav-link').removeClass('active');
                $('.nav-link[href="#' + id + '"]').addClass('active');
            }
        });
    });

    /* ------------------------------------------------
       2. SMOOTH SCROLL for nav links
    ------------------------------------------------ */
    $('a[href^="#"]').on('click', function (e) {
        var target = $(this.hash);
        if (target.length) {
            e.preventDefault();
            var offset = target.offset().top - 68;
            $('html, body').animate({ scrollTop: offset }, 700, 'swing');
            // Close mobile nav
            $('#navbarNav').collapse('hide');
        }
    });

    /* ------------------------------------------------
       3. SEARCH BAR TOGGLE
    ------------------------------------------------ */
    $('#searchToggle').on('click', function (e) {
        e.preventDefault();
        $('#searchBar').toggleClass('open');
        if ($('#searchBar').hasClass('open')) {
            setTimeout(function () { $('#searchInput').focus(); }, 100);
        }
    });
    $('#searchClose').on('click', function () {
        $('#searchBar').removeClass('open');
        $('#searchInput').val('');
    });
    // Close on Escape
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            $('#searchBar').removeClass('open');
        }
    });

    /* ------------------------------------------------
       4. HERO SLIDER (Slick)
    ------------------------------------------------ */
    $('.hero-slider').slick({
        autoplay: true,
        autoplaySpeed: 5000,
        speed: 900,
        fade: true,
        cssEase: 'ease',
        dots: false,
        arrows: false,
        pauseOnHover: false
    });

    // Custom hero nav
    $('.hero-prev').on('click', function () {
        $('.hero-slider').slick('slickPrev');
    });
    $('.hero-next').on('click', function () {
        $('.hero-slider').slick('slickNext');
    });

    /* ------------------------------------------------
       5. PORTFOLIO FILTER (Isotope)
    ------------------------------------------------ */
    var $grid = $('#portfolioGrid').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows',
        animationOptions: {
            duration: 500,
            easing: 'linear'
        }
    });

    $('.filter-btn').on('click', function () {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        var filterValue = $(this).data('filter');
        $grid.isotope({ filter: filterValue });
    });

    /* ------------------------------------------------
       6. TESTIMONIALS SLIDER (Slick)
    ------------------------------------------------ */
    $('#testimonialSlider').slick({
        autoplay: false,
        speed: 600,
        fade: false,
        dots: false,
        arrows: false,
        adaptiveHeight: true
    });

    $('#testiPrev').on('click', function () {
        $('#testimonialSlider').slick('slickPrev');
    });
    $('#testiNext').on('click', function () {
        $('#testimonialSlider').slick('slickNext');
    });

    /* ------------------------------------------------
       7. CONTACT FORM
    ------------------------------------------------ */
    $('#sendBtn').on('click', function (e) {
        e.preventDefault();
        var firstName = $('[placeholder="First Name"]').val().trim();
        var lastName  = $('[placeholder="Last Name"]').val().trim();
        var email     = $('[placeholder="Your Email"]').val().trim();
        var message   = $('[placeholder="Your Message..."]').val().trim();
        var emailReg  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Simple validation
        if (!firstName || !lastName) {
            showAlert('Please enter your full name.', 'warning'); return;
        }
        if (!email || !emailReg.test(email)) {
            showAlert('Please enter a valid email address.', 'warning'); return;
        }
        if (!message) {
            showAlert('Please enter your message.', 'warning'); return;
        }

        // Success
        showAlert('Thank you! Your message has been sent.', 'success');
        $('input.contact-input, textarea.contact-input').val('');
    });

    function showAlert(msg, type) {
        var cls = type === 'success' ? 'alert-success' : 'alert-warning';
        var $alert = $('<div class="alert ' + cls + ' alert-dismissible fade show" role="alert" style="position:fixed;top:80px;left:50%;transform:translateX(-50%);z-index:9999;min-width:320px;text-align:center;">' +
            msg +
            '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>' +
            '</div>');
        $('body').append($alert);
        setTimeout(function () { $alert.alert('close'); }, 3500);
    }

    /* ------------------------------------------------
       8. SCROLL REVEAL ANIMATIONS
    ------------------------------------------------ */
    // Add fade-up class to key elements
    var revealItems = [
        '.service-card',
        '.pricing-card',
        '.team-card',
        '.feature-item',
        '.portfolio-item'
    ];

    $(revealItems.join(',')).addClass('fade-up');
    // Stagger service cards
    $('.service-card').each(function (i) {
        $(this).addClass('delay-' + (i + 1));
    });
    $('.pricing-card').each(function (i) {
        $(this).addClass('delay-' + (i + 1));
    });

    function revealOnScroll() {
        var windowBottom = $(window).scrollTop() + $(window).height();
        $('.fade-up:not(.visible)').each(function () {
            var elemTop = $(this).offset().top;
            if (windowBottom > elemTop + 50) {
                $(this).addClass('visible');
            }
        });
    }

    $(window).on('scroll', revealOnScroll);
    revealOnScroll(); // trigger on load

    /* ------------------------------------------------
       9. BACK TO TOP
    ------------------------------------------------ */
    $('#backToTop').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 600);
    });

    /* ------------------------------------------------
       10. TEAM CARD HOVER (show social on hover)
    ------------------------------------------------ */
    $('.team-card').not('.active-team').each(function () {
        $(this).on('mouseenter', function () {
            var $social = $(this).find('.team-social');
            if (!$social.length) {
                // Dynamically inject social icons on hover for non-active cards
                $(this).find('.team-img-wrap').prepend(
                    '<div class="team-social">' +
                    '<a href="#"><i class="fab fa-facebook-f"></i></a>' +
                    '<a href="#"><i class="fab fa-twitter"></i></a>' +
                    '<a href="#"><i class="fab fa-dribbble"></i></a>' +
                    '<a href="#"><i class="fab fa-instagram"></i></a>' +
                    '</div>'
                );
            }
        });
    });

    /* ------------------------------------------------
       11. PRICING CARD HOVER ACTIVE STATE
    ------------------------------------------------ */
    $('.pricing-card:not(.featured)').on('mouseenter', function () {
        $(this).css('border-color', '#aaa');
    }).on('mouseleave', function () {
        $(this).css('border-color', '#ddd');
    });

    /* ------------------------------------------------
       12. SERVICE CARD CLICK ACTIVE
    ------------------------------------------------ */
    $('.service-card').on('click', function () {
        $('.service-card').removeClass('active');
        $(this).addClass('active');
    });

});