"use strict";


(function ($){
    var nest = nest || function (){
    var pageAr = ["home", "service", "portfolio", "developement", "contact"];
    var currentPage = "";
    var oldPage = "";
    var firstFlag = true;
    var currentUrl = "";

    function loadPage() {
        chkAgent()

        var html = "";
//        console.log(currentPage)
        var url = currentPage.replace("#", "");
        console.log('url is = '+url)
        $.get("/pages/"+url+".html?"+(Math.random()*999999999), function ( data ){
            var page = $(data);
            if(firstFlag)
            {
                $("#ajaxContainer").append(page);
                if(nest[url]) nest[url].init();
                firstFlag = false;
                oldPage = currentPage;
//                TweenMax.to($('#ajaxContents'), 0.8, {transform:'translateX(0)', force3D:true, ease:Cubic.easeInOut});
            }
            else
            {

                var outPage = $("#ajaxContents");
                var arrow = getMotionArrow(url);
                TweenMax.to(outPage, 0.6, {x:-($(window).width()*0.5), force3D:true,ease:Power4.easeIn, zIndex:1, onComplete:motionEnd});

                $("#ajaxContainer").append(page);

                TweenMax.to($("#ajaxContainer>#ajaxContents").eq(1), 0, {x:($(window).width()),zIndex:10});
                TweenMax.to($("#ajaxContainer>#ajaxContents").eq(1), 0.6, {x:0, force3D:true,ease:Power4.easeIn,onComplete:function(){
                    $(window).scrollTop(0)
                }});

//                if(url != "home")
//                {
//                    page.append(footer.clone());
//                }
//
                function motionEnd()
                {
                    console.log('motion end'+ url)

                    if(url != "home") nest[url].init();
                    var oldUrl = oldPage.replace("#", "");
                    outPage.remove();
                    oldPage = currentPage;
                    if(nest[oldUrl]) nest[oldUrl].dispos();

                }
                if(url=="home") setTimeout(function (){nest[url].init();}, 100);

            }
            currentUrl = url;

        });

    function getMotionArrow( url )
    {
        var prevIdx = pageAr.indexOf(currentUrl);
        var nextIdx = pageAr.indexOf(url);
        if(prevIdx < nextIdx) return 1;
        else                  return -1;
    }
}

    $(function (){
        currentPage = location.hash;
        if(currentPage == "") currentPage = "#home";
        console.log('currentpage = '+currentPage)
        $(window).on("hashchange", function ( e ){
            currentPage = location.hash;
            if(currentPage == "") currentPage = "#home";
            loadPage();
        });
        loadPage();
    });

}

    nest.home = (function (){
        return {
            init : function (){
                console.log('home class start')
                introText()
//                motionFlag = true;
                svgDevice()
                mobileZoom()
                scrollbg()
            },
            dispos : function ()
            {
                console.log('home dispos')
            }
        }
    })();

    nest.service = (function (){

        return {
            init : function (){
//                scroll()
//                scroll3d()
                headerMotion()
                service()
                axisCard()
                console.log('service class start')
            },
            dispos : function ()
            {
                console.log('service dispos')
            }
        }
    })();

    nest.portfolio = (function (){

        return {
            init : function (){
                headerMotion()
                scroll3d()
                console.log('portfolio class start')
            },
            dispos : function ()
            {
                console.log('portfolio dispos')
            }
        }
    })();

    nest.contact = (function (){

        return {
            init : function (){
                capcha()
                console.log('contact class start')
            },
            dispos : function ()
            {
                console.log('contact dispos')
            }
        }
    })();

    window.nest = nest;

})(jQuery);

var nest = new nest();





//$(window).on('hashchange', function() {
//    var pagelocation = location.hash.substring(1)
////    console.log(pagelocation)
//    $("#ajaxContainer").load('/pages/'+pagelocation+'.html #ajaxContents',function(){
//        setTimeout(function(){
////            init();
//        },1000)
//    });
//});

//$(document).ready(function() {
//    var pagelocation = location.hash.substring(1)
//    //    console.log(pagelocation)
//    if(pagelocation==''){
//        $("#ajaxContainer").load('/pages/home.html #ajaxContents',function(){
//            setTimeout(function(){
//                //            init();
//            },1000)
//        });
//    } else {
//        $("#ajaxContainer").load('/pages/'+pagelocation+'.html #ajaxContents',function(){
//            setTimeout(function(){
//                //            init();
//            },1000)
//        });
//    }
//});

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
