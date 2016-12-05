"use strict";

//$(document).ready(function() {
//    $(".pp-scrollable").niceScroll({
//        cursorcolor: "#424242", // change cursor color in hex
//        cursoropacitymin: 1, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
//        cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
//        cursorwidth: "5px", // cursor width in pixel (you can also write "5px")
//        cursorborder: "1px solid #fff", // css definition for cursor border
//        cursorborderradius: "5px", // border radius in pixel for cursor
//        scrollspeed: 60,
//    });
//})
$(window).load(function() {
    menu();
    $('#intro').fadeOut(1000);
})

function menu(){
    console.log('asdasd')
    var content = $('#wrapper')
    var menuWrap = $('#menu_wrap')
    var menuOpen = $('.menuOpen')
    var menuClose = $('.menuClose')
    var menuLogo = $("#menuLogo")
    var svg = menuLogo.getSVG();
    var logopath = svg.find('path');
    var menuContainer = $('.menu_container')
    var content = $('.menu_contents');

    TweenMax.to(menuOpen,1.0,({left:'30px',ease: Power4.easeInOut,delay:0}))

    $(".menuOpen button").hover(function(){
        TweenMax.to(logopath,1.0,({fill:'#128dd4'}))
    },function(){
        TweenMax.to(logopath,1.0,({fill:'#fff'}))
    })
    $('.menuOpen button').on('click',function(){
        TweenMax.to(menuOpen,1.0,({left:'-100px',ease: Power4.easeInOut}))
        //            TweenMax.to(content,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut}))
        TweenMax.to(menuWrap,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut, onComplete:function(){
            TweenMax.to(menuClose,0.5,({right:'10px',ease: Power4.easeInOut}))
        }}))
        TweenMax.to(menuContainer,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.2}))

        TweenMax.to(content,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.4}))
    })
    $('.menuClose button').on('click',function(){
        TweenMax.to(menuClose,1.0,({right:'-100px',ease: Power4.easeInOut}))
        //            TweenMax.to(content,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut}))
        TweenMax.to(content,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut}))
        TweenMax.to(menuContainer,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut,delay:0.2}))
        TweenMax.to(menuWrap,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut,delay:0.4, onComplete:function(){
            TweenMax.to(menuOpen,0.5,({left:'30px',ease: Power4.easeInOut}))
            TweenMax.to(menuWrap,0,({transform:'translateX(-100vw)'}))
            TweenMax.to(menuContainer,0,({transform:'translateX(-100vw)'}))
            TweenMax.to(content,0,({transform:'translateX(-100vw)'}))
        }}))
    })
}


/* Scroll Magic Test */
//var scrollFunction = true;
//function scrollTest(){
//    scrollFunction = false;
//    var controller = new ScrollMagic.Controller();
//    var tween = TweenMax.to(".test_block", 2, {left: 200,backgroundColor:"rgba(0,0,0,0.5)",ease:Linear.easeNone,rotationZ: 360, marginTop:100})
//    new ScrollMagic.Scene({triggerElement: ".test_block",offset:0}) //,duration:100
//        .setTween(tween)
//        .addIndicators()
//        .addTo(controller)
//}
