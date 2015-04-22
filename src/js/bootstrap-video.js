(function(){

    function Player ($video, options) {

        var that = this;

        options = options || {}

        that.options = {
            playpauseonclick: (options.hasOwnProperty('playpauseonclick')) ? options.playpauseonclick : true,
            volume: (options.volume <= 1 || options.volume >= 0 ) ? options.volume : false || 0.5,
            muted: options.muted || false,
            autoplay: options.autoplay || false,
            controls: (options.hasOwnProperty('controls')) ? options.controls : true,
            draggableseekbar: (options.hasOwnProperty('draggableseekbar')) ? options.draggableseekbar : true,
            width: options.width || "100%",
            height: options.height || "auto",
            repeatonstop: options.repeatonstop || false,
            pauseclass: options.pauseclass || "bootstrap-video-paused",
            playpausebutton: (options.hasOwnProperty('playpausebutton')) ? options.playpausebutton : true,
            mutebutton: (options.hasOwnProperty('mutebutton')) ? options.mutebutton : true,
            volumebutton: (options.hasOwnProperty('volumebutton')) ? options.volumebutton : true,
            seekbar: (options.hasOwnProperty('seekbar')) ? options.seekbar : true
        }

        that.video = $video[0];
        that.video.controls = false;
        that.video.volume = that.options.volume;
        that.video.muted = that.options.muted;
        if (that.options.playpauseonclick) {
            $video.addClass("bootstrap-video-clickable");
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
            that.currentTimeButton = $('<button type="button" class="btn disabled current-time-bar">0:00</button>')[0];
            that.durationTimeButton = $('<button type="button" class="btn disabled duration-time-bar">0:00</button>')[0];

            that.muteButton = $([
                '<button type="button" class="btn btn-mute">',
                    '<span class="glyphicon glyphicon-volume-' + ((that.options.muted) ? 'off' : 'up') + '" aria-hidden="true"></span>',
                '</button>'].join(''))[0];

            that.volumeButton = $('<span class="bootstrap-volume-group"><button type="button" class="btn bootstrap-volume-button">' + (that.options.volume * 10) + '</button></span>')[0];

            that.volumeBar = $('<div class="slider bootstrap-volume-bar"></div>')[0];

            that.controls = $('<div class="bootstrap-video-controls text-center"></div>')[0];

            $(that.body).append($(that.controls));

            if (that.options.seekbar){
                $(that.controls).append($(that.seekBar));
            }
            if (that.options.playpausebutton){
                $(that.controls).append($(that.playpauseButton));
            }
            $(that.controls).append($(that.currentTimeButton));
            $(that.controls).append($(that.durationTimeButton));

            if (that.options.mutebutton){
                $(that.controls).append($(that.muteButton));
            }

            if (that.options.volumebutton){
                $(that.controls).append($(that.volumeButton).append($(that.volumeBar)))
                $(that.volumeBar).attr("min", 0).attr("max", 1).attr("step", 0.1).val(that.options.volume);
            }

            $(that.playpauseButton).on("click", function () {
                (that.video.paused) ? that.video.play() : that.video.pause();
            });

            $(that.muteButton).on("click", function () {
                $(".glyphicon", $(that.muteButton)).toggleClass("glyphicon-volume-off");
                $(".glyphicon", $(that.muteButton)).toggleClass("glyphicon-volume-up");
                that.video.muted = !that.video.muted;
            });

            $(that.volumeButton).on("click", function(){
                $(that.volumeButton).toggleClass("active");
            });

            $(that.seekBar).on("slidestart", function () {
                that.video.pause();
            });

            $(that.seekBar).on("slide", function () {
                that.video.currentTime = $(that.seekBar).slider("value");
                var time = Math.floor(that.video.currentTime);
                var seconds = time % 60;
                var minutes = Math.floor((time % 3600) / 60);
                $(that.currentTimeButton).text(minutes + ":" + ((seconds > 9) ? "" : "0") + seconds);
            });

            $(that.seekBar).on("slidestop", function () {
                that.video.currentTime = $(that.seekBar).slider("value");
                that.video.play();
            });

            $(that.volumeBar).on("slidestart slide slidestop", function () {
                that.video.volume = $(that.volumeBar).slider("value");
                $(".bootstrap-volume-button", $(that.volumeButton)).text(that.video.volume * 10);
            });

        }

        $(that.video).on("loadeddata", function(){
            var time = Math.floor(that.video.duration);
            var seconds = time % 60;
            var minutes = Math.floor((time % 3600) / 60);
            $(that.durationTimeButton).text(minutes + ":" + ((seconds > 9) ? "" : "0") + seconds);

            $(that.video).addClass(that.options.pauseclass);

            $(".slider.bootstrap-seek-bar", $(that.controls)).slider({
                min: 0,
                max: that.video.duration,
                step: 0.1,
                value: 0
            });

            $(".slider.bootstrap-volume-bar", $(that.controls)).slider({
                min: 0,
                max: 1,
                step: 0.1,
                value: that.options.volume,
                orientation: "vertical"
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
            $(that.video).removeClass(that.options.pauseclass);
        });

        $(that.video).on("pause", function(){
            $(".glyphicon", $(that.playpauseButton)).addClass("glyphicon-play");
            $(".glyphicon", $(that.playpauseButton)).removeClass("glyphicon-pause");
            $(that.video).addClass(that.options.pauseclass);
        });

        $(that.video).on("timeupdate", function(){
            var time = Math.floor(that.video.currentTime);
            var seconds = time % 60;
            var minutes = Math.floor((time % 3600) / 60);
            $(that.seekBar).slider("value", that.video.currentTime);
            $(that.currentTimeButton).text(minutes + ":" + ((seconds > 9) ? "" : "0") + seconds);
        });

        $(that.video).on("ended", function(){
            if (that.options.repeatonstop){
                window.setTimeout(function(){
                    that.video.play();
                }, 1000);
            }
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
        });
    }

})($);
