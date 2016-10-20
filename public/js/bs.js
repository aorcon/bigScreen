(function(){
    var sheight = 0;
    function toggleFullscreen(elem) {
        elem = elem || document.documentElement;
        if (!document.fullscreenElement && !document.mozFullScreenElement &&
            !document.webkitFullscreenElement && !document.msFullscreenElement) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
        // elem.
    }
    document.getElementById('A01').addEventListener('click', function() {
      toggleFullscreen(document.getElementById('A01'));
    });

    function draw(){
        var canvas = document.getElementById("A02");
        console.log(canvas.height);
        console.log(canvas.width);
        if (canvas.getContext) {
            var ctx = canvas.getContext("2d");

            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 2;
            ctx.shadowColor = "rgba(0, 0, 0, 0.5)";

            ctx.font = 'italic 40pt Calibri, sans-serif';
            ctx.fillText('Hello World!', 50, 50);
        }

    }

    // document.getElementById('A01').addEventListener('click', function() {
    //   toggleFullscreen(this);
    // });

}());
