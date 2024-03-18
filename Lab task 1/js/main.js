$("#categorySec").each(function (key, item) {
    var id = $(this).attr("id");
    var sliderID = "#" + id;
    var appendArrowsClassName = "#" + id + "-arrows";

    $(sliderID).slick({
        dots: false,
        infinite: true,
        speed: 1000,
        arrows: true,
        autoplay: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        loop: true,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 993,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 530,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            }
        ],
        prevArrow: '<span class="slider-btn slider-prev"><i class="fi-rs-arrow-small-left"></i></span>',
        nextArrow: '<span class="slider-btn slider-next"><i class="fi-rs-arrow-small-right"></i></span>',
        appendArrows: appendArrowsClassName
    });
});
