function Player ($video, options) {
    var that = this;

    that.options = {
        playpauseonclick: (options.hasOwnProperty('playpauseonclick')) ? options.playpauseonclick : true,
        volume: (options.volume <= 1 || options.volume >= 0 ) ? options.volume : false || 0.5,
        muted: (options.hasOwnProperty('muted')) ? options.muted : false,
        autoplay: (options.hasOwnProperty('autoplay')) ? options.autoplay : false,
        controls: (options.hasOwnProperty('controls')) ? options.controls : true,
        draggableseekbar: (options.hasOwnProperty('draggableseekbar')) ? options.draggableseekbar : true,
        width: options.width || "100%",
        height: options.height || "auto"
    }

    that.video = $video[0];
    that.video.controls = false;
    that.video.volume = that.options.volume;
    that.video.muted = that.options.muted;
    if (that.options.playpauseonclick) {
        $video.addClass("clickable");
    }
    $video.addClass("bootstrap-video");
    that.parent = $video.parent()[0];

    that.container = $('<div class="panel panel-default bootstrap-video-container"></div>')[0];

    $(that.container).css({
        width: that.options.width
    });

    that.body = $('<div class="panel-body bootstrap-video-body"></div>')[0];

    $(that.parent).append($(that.container));
    $(that.container).append($(that.body));
    $(that.body).append($(that.video));

    if (that.options.controls) {

        that.playpauseButton = $([
            '<button type="button" class="btn btn-playpause">',
                '<span class="glyphicon glyphicon-play" aria-hidden="true"></span>',
            '</button>'].join(''))[0];

        that.seekBar = $('<div class="slider bootstrap-seek-bar"></div>')[0];
        that.currentTimeBar = $('<button type="button" class="btn disabled current-time-bar">0:00</button>')[0];
        that.durationTimeBar = $('<button type="button" class="btn disabled duration-time-bar">0:00</button>')[0];

        that.muteButton = $([
            '<button type="button" class="btn btn-mute">',
                '<span class="glyphicon glyphicon-volume-' + ((that.options.muted) ? 'off' : 'up') + '" aria-hidden="true"></span>',
            '</button>'].join(''))[0];

        that.volumeBar = $('<input type="range" class="volume-bar" />')[0];


        that.controls = $('<div class="bootstrap-video-controls text-center"></div>')[0];


        $(that.body).append($(that.controls));

        //$(that.controls).append($('<div class="col-sm-1"></div>').append($(that.playpauseButton)));
        //$(that.controls).append($('<div class="col-sm-1"></div>').append($(that.currentTimeBar)));
        //$(that.controls).append($('<div class="col-sm-5"></div>').append($(that.seekBar)));
        //$(that.controls).append($('<div class="col-sm-1"></div>').append($(that.durationTimeBar)));
        //$(that.controls).append($('<div class="col-sm-1"></div>').append($(that.muteButton)));
        //$(that.controls).append($('<div class="col-sm-3"></div>').append($(that.volumeBar)));

        $(that.controls).append($(that.seekBar));
        $(that.controls).append($(that.playpauseButton));
        $(that.controls).append($(that.currentTimeBar));
        $(that.controls).append($(that.durationTimeBar));
        $(that.controls).append($(that.muteButton));
        //$(that.controls).append($(that.volumeBar));

        $(that.volumeBar).attr("min", 0).attr("max", 1).attr("step", 0.1).val(that.options.volume);

        $(that.playpauseButton).on("click", function () {
            (that.video.paused) ? that.video.play() : that.video.pause();
        });

        $(that.muteButton).on("click", function () {
            $(".glyphicon", $(that.muteButton)).toggleClass("glyphicon-volume-off");
            $(".glyphicon", $(that.muteButton)).toggleClass("glyphicon-volume-up");
            that.video.muted = !that.video.muted;
        });

        $(that.seekBar).on("slidestart", function (event, ui) {
            that.video.pause();
        });

        $(that.seekBar).on("slide", function (event, ui) {
            that.video.currentTime = $(that.seekBar).slider("value");
            var time = Math.floor(that.video.currentTime);
            var seconds = time % 60;
            var minutes = Math.floor((time % 3600) / 60);
            $(that.currentTimeBar).text(minutes + ":" + ((seconds > 9) ? "" : "0") + seconds);
        });

        $(that.seekBar).on("slidestop", function (event, ui) {
            that.video.currentTime = $(that.seekBar).slider("value");
            that.video.play();
        });

        $(that.volumeBar).on("change", function () {
            that.video.volume = $(that.volumeBar).val();
        });

    }

    $(that.video).on("loadeddata", function(){
        var time = Math.floor(that.video.duration);
        var seconds = time % 60;
        var minutes = Math.floor((time % 3600) / 60);
        $(that.durationTimeBar).text(minutes + ":" + ((seconds > 9) ? "" : "0") + seconds);

        $(".slider.bootstrap-seek-bar", $(that.controls)).slider({
            min: 0,
            max: that.video.duration,
            step: 0.1,
            value: 0
        });

        if (!that.options.draggableseekbar){
            $(".slider.bootstrap-seek-bar", $(that.controls)).slider("disable");
        }

        $(that.video).css({
            width: $(that.body).width(),
            height: that.options.height
        });

        if (that.options.autoplay){
            that.video.play();
        }
    });

    $(that.video).on("play", function(){
        $(".glyphicon", $(that.playpauseButton)).addClass("glyphicon-pause");
        $(".glyphicon", $(that.playpauseButton)).removeClass("glyphicon-play");
        $(that.video).removeClass("paused");
    });

    $(that.video).on("pause", function(){
        $(".glyphicon", $(that.playpauseButton)).addClass("glyphicon-play");
        $(".glyphicon", $(that.playpauseButton)).removeClass("glyphicon-pause");
        $(that.video).addClass("paused");
    });

    $(that.video).on("timeupdate", function(){
        var time = Math.floor(that.video.currentTime);
        var seconds = time % 60;
        var minutes = Math.floor((time % 3600) / 60);
        $(that.seekBar).slider("value", that.video.currentTime);
        $(that.currentTimeBar).text(minutes + ":" + ((seconds > 9) ? "" : "0") + seconds);
    });

    $(that.video).on("ended", function(){
        $(".glyphicon", that.playpauseButton).removeClass("glyphicon-play").removeClass("glyphicon-pause").addClass("glyphicon-repeat");
        $(that.video).addClass("paused");
    });

    $(that.video).on("click", function(){
        if (that.options.playpauseonclick) {
            (that.video.paused) ? that.video.play() : that.video.pause();
        }
    });

    $(window).on("resize", function(){
        $(that.video).css({
            width: $(that.body).width()
        })
    });

}

$.prototype.bootstrapVideo = function (options){
    $(this).each(function(){
        new Player($(this), options);
        console.log(this);
    });
}
