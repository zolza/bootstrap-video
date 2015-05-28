$(document).ready(function(){
  $(".navbar a").on('click', function(event) {
    event.preventDefault();
    var element = $(event.target).attr('data-target');

    $('html, body').animate({
        scrollTop: $(element).offset().top -20
    }, 1000);
  });
});


$(document).ready(function(){
    $(window).on("resize", function(){
        if ($(window).width() < 1160) {
            $(".navbar").addClass("navbar2");
            $(".navbar br").remove();
        } else {
            $(".navbar").removeClass("navbar2");
        }
    });
});

$(document).ready(function(){
  $(".btnscrl").on('click', function(event) {
    event.preventDefault();
    var nav = $(event.target).attr('data-target');

    $('html, body').animate({
        scrollTop: $(nav).offset().top
    }, 400);
});
});
