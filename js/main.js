$(document).ready(function() {

    $('#menu').click(function() {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load', function() {

        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if ($(window).scrollTop() > 68) {
            $('header .header-2').addClass('header-active');
        } else {
            $('header .header-2').removeClass('header-active');
        }

        $('section').each(function() {

            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top >= offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }

        });

    });

    $('.home-slider').owlCarousel({
        items: 1,
        nav: true,
        dots: false,
        autoplay: true,
        autoplayTimeout: 8000,
        loop: true
    });

    $('.small-image img').click(function() {

        $(this).addClass('image-active').siblings().removeClass('image-active');
        let image = $(this).attr('src');
        $('.big-image img').attr('src', image);

    });

    $('.gallery .btn').click(function() {

        let filter = $(this).attr('data-filter');
        if (filter == 'all') {
            $('.gallery .box').show(400);
        } else {
            $('.gallery .box').not('.' + filter).hide(200);
            $('.gallery .box').filter('.' + filter).show(400);
        }

        $(this).addClass('button-active').siblings().removeClass('button-active');

    });

    var addToCartButtons = document.querySelectorAll(".addToCart");
    for (var i = 0; i < addToCartButtons.length; i++) {
        console.log('hi')
        addToCartButtons[i].addEventListener('click', addProduct)
    }
    var myStorage = window.localStorage;

    function addProduct(event) {
        event.preventDefault();
        const id = event.target.getAttribute('data-id');
        const price = event.target.getAttribute('data-price') || 10;
        const quantity = event.target.getAttribute('data-qty') || 1;
        const image = event.target.getAttribute('data-img');

        let products = [];
        if (localStorage.getItem('currentCart')) {
            products = JSON.parse(localStorage.getItem('currentCart'));
        }
        console.log(products)
        if (id) {
            var index = products.findIndex(elt => elt.productId == id)
            if (index > -1) {
                products[1].qty += 1;
            } else {
                products.push({ productId: id, image: image, price: price, quantity: quantity });
            }
        }
        localStorage.setItem('currentCart', JSON.stringify(products));
    }
});