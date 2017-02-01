$(window).load(function(){$("#loading").fadeOut("slow")});

var $ = jQuery.noConflict();

$(function() {
    var wall = new freewall('#freewall');
    wall.reset({
        selector: '.brick',
        animate: true,
        cellW: 360,
        cellH: 360,
//        fixSize: 0,
        gutterY:10,
        gutterX: 10,
        onResize: function() {
            wall.fitWidth();
        }
    });
    $('.filter-label').click(function() {
        $('.filter-label').removeClass('active');
        var filter = $(this).addClass('active').data('filter');
        if (filter) {
            wall.filter(filter);
        } else {
            wall.unFilter();
        }
    });
    wall.fitWidth();

    $('#top-nav').slimmenu({
        resizeWidth: '800',
        collapserTitle: '',
        animSpeed:'medium',
        easingEffect: null,
        indentChildren: false,
        childrenIndenter: '&nbsp;'
    });



    $("a.fullscreenExit").hide();
    $("a.fullscreen").on('click', function() {
        var docElement, request;

        docElement = document.documentElement;
        request = docElement.requestFullScreen || docElement.webkitRequestFullScreen || docElement.mozRequestFullScreen || docElement.msRequestFullScreen;

        if(typeof request!="undefined" && request){
            request.call(docElement);
        }
        $(this).hide();
        $('a.fullscreenExit').show();
        return false;
    });

    $("a.fullscreenExit").on('click', function() {
        var docElement, request;

        docElement = document;
        request = docElement.cancelFullScreen|| docElement.webkitCancelFullScreen || docElement.mozCancelFullScreen || docElement.msCancelFullScreen || docElement.exitFullscreen;
        if(typeof request!="undefined" && request){
            request.call(docElement);
        }
        $(this).hide();
        $('a.fullscreen').show();
        return false;
    });

    $('#open-iframe').hide();
    $('a.open-project').click(function(){
        $("body#parent").addClass("noscroll");
        $('#open-iframe').show();
        $("iframe").addClass("iframestyle");
        submitComment();
    });

    $("a.closeframe").click(function() {
        $("body#parent", window.parent.document).removeClass("noscroll");
        $('iframe').attr('src', $('iframe').attr('src'));
        $('#open-iframe', window.parent.document).hide();
    });
        $('.slideshow').cycle({
            speed: 600,
            manualSpeed: 100,
            slides:'>.slide',
            prev :'>.control .prev',
            next :'>.control .next',
            paused  :true,
        });
    $('.move-slideshow').cycle({
        speed: 600,
        manualSpeed: 100,
        slides:'>.slide',
        prev :'>.control .prev',
        next :'>.control .next',
    });
});





