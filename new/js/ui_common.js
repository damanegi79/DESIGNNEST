"use strict";

$(document).ready(function() {
    chkAgent()
    $('#nav ul li a').on('click',function(){
        var pagelocation = $(this).attr('href').substring(1)
        console.log(pagelocation)
        $("#ajaxContainer").load('/pages/'+pagelocation+'.html #ajaxContents',function(){
            setTimeout(function(){
                init();
            },1000)
        });
        $('.menuOpen .stats').text(pagelocation)
        location.hash = pagelocation ;
        return false;
    })

})

$(window).on('hashchange', function() {
    var pagelocation = location.hash.substring(1)
    console.log(pagelocation)
    $("#ajaxContainer").load('/pages/'+pagelocation+'.html #ajaxContents',function(){
        setTimeout(function(){
            init();
        },1000)
    });
});

$(window).load(function() {
    menu();
    $('#intro').fadeOut(1000);
})

function chkAgent(){
    var agent = navigator.userAgent.toLowerCase();
    if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1) ) {
        var caution = $('.browserCaution');
        TweenMax.to(caution,0,({display:'block',delay:1, onComplete:function(){
            TweenMax.to(caution,0.5,({bottom:'0px'}))
        }}))
    }
    $('.browserCaution .close button').on('click',function(){
        TweenMax.to(caution,0.5,({bottom:'-150px',onComplete:function(){
            TweenMax.to(caution,0,({display:'none'}))
        }}))
    })
}
function menu(){
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
        TweenMax.to(menuWrap,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut}))
        TweenMax.to(menuContainer,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.2}))
        TweenMax.to(content,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.4, onComplete:function(){
            TweenMax.to(menuClose,0.3,({transform:'translateX(0)',ease: Power4.easeInOut}))
        }}))
    })
    $('.menuClose button, #nav ul li a').on('click',function(){
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
