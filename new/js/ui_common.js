"use strict";

$(document).ready(function() {
    chkAgent()
})
$(window).load(function() {
    menu();

    $('#intro').fadeOut(1000);
//    $('.bottom_quick .bottom_con a').hover(function(){
//
//        TweenMax.to($(this).find('img'),1.5,({opacity:1,transform:'scale(1.05)',filter:'grayscale(0)'}))
//
//    },function(){
//        TweenMax.to($(this).find('img'),1.5,({opacity:0.7,transform:'scale(1)',filter:'grayscale(100%)'}))
//    })
})

function chkAgent(){
    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
        var caution = $('.browserCaution');
        TweenMax.to(caution,0,({display:'block',delay:1, onComplete:function(){
            TweenMax.to(caution,0.5,({bottom:'0px'}))
        }}))
    }
    else {

    }
    $('.browserCaution .close button').on('click',function(){
        TweenMax.to(caution,0.5,({bottom:'-150px',onComplete:function(){
            TweenMax.to(caution,0,({display:'none'}))
        }}))
    })
}

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
        TweenMax.to(menuOpen,1.0,({left:'-200px',ease: Power4.easeInOut}))
        //            TweenMax.to(content,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut}))
        TweenMax.to(menuWrap,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut}))
        TweenMax.to(menuContainer,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.2}))

        TweenMax.to(content,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.4, onComplete:function(){
            TweenMax.to(menuClose,0.3,({transform:'translateX(0)',ease: Power4.easeInOut}))
        }}))
    })
    $('.menuClose button').on('click',function(){
        TweenMax.to(menuClose,0.3,({transform:'translateX(200px)',ease: Power4.easeInOut}))
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
