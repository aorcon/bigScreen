(function(){
    var canvas = null;
    var context = null;
    // render Squad List
    var squadlist = [];

    //cache time Last render
    var timeLastSecond = new Date().getTime();
    var count = 0;

    //background user name list
    var namelist = [];
    //user detect in 5 minutes
    var newbie = [];

    //initial && start render thread
    var init = function(){
        canvas = document.getElementById('A02');
        // canvasBackground = document.getElementById('background');
        // panels = document.getElementById('panels');
        // status = document.getElementById('status');
        // message = document.getElementById('message');
        // title = document.getElementById('title');
        // startButton = document.getElementById('startButton');
        var squad = new Squad();
        squad.x = 100;
        squad.y = 200;
        squad.fontsize = 50;
        squad.fontfamily = '40px STKaiti';
        squadlist[0] = squad;
        getData();
        if (canvas && canvas.getContext) {
            context = canvas.getContext('2d');
            animate();
        }
    }
    //Squad object
    function Squad(){
        this.position = {x:0, y:100};
        this.velocity = {x: -5, y:0.0};
        this.mac = null;
        this.name = null;
        this.fontsize = 0;
        this.fontfamily = null;
        this.bounds = false;
    }

    function draw(tick){
        context.clearRect(0,0,canvas.width,canvas.height);
        for (var prop in squadlist) {
            var squad = squadlist[prop];
            if ((squad.position.x > 0 - canvas.width / 2)
                && (squad.position.x < canvas.width * 3 / 2)
                && (squad.position.y > 0 - canvas.height / 2)
                && (squad.position.y < canvas.width * 3 / 2)){

                    squad.position.x += squad.velocity.x * (tick - timeLastSecond) / 50;
                    squad.position.y += squad.velocity.y * (tick - timeLastSecond) / 50;

                    context.font = squad.fontfamily;
                    context.fillStyle = "#FFFFFF";
                    context.fillText('刘剑', Math.round(squad.position.x), Math.round(squad.position.y));

                }
            else {
                squadlist.splice(prop, 1);
            }
        }
    }

    function animate(){
        var tick = new Date().getTime();
        count++;
        if (count > 1000){
            getData();
            count = 0;
        }
        if (count % 10 == 1){
            
        }
        draw(tick);
        timeLastSecond = tick;
        requestAnimFrame( animate );
    }
    window.requestAnimFrame = (function(){
        return function(callback, element){
                window.setTimeout(callback, 1000 / 60);
            };
    })();

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
    }
    $(document).ready(function () {
        // toggleFullscreen(document.getElementById('A01'));
        sheight = screen.height * 0.8;
        console.log("screen.height", sheight);
        $("#A01").height(sheight);
        $("#A02").width(screen.width);
        $("#A02").height(sheight);
        $("#fullscreen").click(function(){
            $("#fullscreen").text("ww");
            toggleFullscreen(document.getElementById('A01'));
            init();
        });
    });
    function getData(){
        $.ajax({
            url: '/users',
            dataType: 'json',
            success: function( resp ) {
                namelist = [];
                for (var mac in resp) {
                    namelist.push(resp[mac]);
                }
                console.log(namelist);
            },
            error: function( req, status, err ) {
                console.log( 'something went wrong', status, err );
            }
        });
    }

}());
