$(document).ready(function(){

    $(".navbar a").on('click', function(event) {
        event.preventDefault();
        var element = $(event.target).attr('data-target');

        $('html, body').animate({
            scrollTop: $(element).offset().top -20
        }, 1000);
    });

    $(window).on("resize", function(){
        if ($(window).width() < 1160) {
            $(".navbar").addClass("navbar2");
            $(".navbar br").remove();
        } else {
            $(".navbar").removeClass("navbar2");
        }
    });

    $(".btnscrl").on('click', function(event) {
        event.preventDefault();
        var nav = $(event.target).attr('data-target');

        $('html, body').animate({
            scrollTop: $(nav).offset().top
        }, 400);
    });

    $("#video1").bootstrapVideo();

    $("#video2").bootstrapVideo({
        playpauseonclick: false
    });

    $("#video3").bootstrapVideo({
        volume: 0.5
    });

    $("#video4").bootstrapVideo({
        muted: true
    });

    $("#video5").bootstrapVideo({
        autoplay: true
    });

    $("#video6").bootstrapVideo({
        controls: false
    });

    $("#video7").bootstrapVideo({
        draggableseekbar: false
    });

    $("#video8").bootstrapVideo({
        width: "300px"
    });

    $("#video9").bootstrapVideo({
        repeatonstop: true
    });

    $("#video10").bootstrapVideo({
        pauseclass: "happy"
    });

    $("#video11").bootstrapVideo({
        playpausebutton: false
    });

    $("#video12").bootstrapVideo({
        mutebutton: false
    });

    $("#video13").bootstrapVideo({
        seekbar: false
    });

    $("#video14").bootstrapVideo({
        volumebutton: false
    });

});
