jQuery(document).ready(function ($) {
    // Sticky Nav Bar
    $('#fade').fadeOut(500)
    $(window).scroll(function () {
        if ($(this).scrollTop() > 20) {
            $('.sticky').addClass("fixed");
        } else {
            $('.sticky').removeClass("fixed");
        }
    });
    $(window).resize(function(){
        resposiveNav()
    })
    resposiveNav()
    function resposiveNav(){
        var winWidth = $(window).width();
        console.log(winWidth)
        if (winWidth>768){
            $('.gnb').show()
            nav()
        } else if(winWidth<=768){
            $('.gnb').hide()
            $('.mobile_menu a').removeClass('active')
            navMobile()
        }
    }

    function nav(){
        $('.gnb li.submenu a').on("mouseover",function(){
            $(this).parent().siblings().find('ul').hide()
            $(this).next().show();
        })
        $('.gnb').on("mouseleave",function(){
            $(this).find('li>ul').hide()
        })
    }
    function navMobile(){
        $('.mobile_menu a').on("click",function(){
            $(this).toggleClass('active')
            $('.gnb').toggle()
        })
        $('.gnb li.submenu>a').on("click",function(){
            $(this).parent().siblings().find('ul').hide()
            $(this).next().toggle();
            return false;
        })
        $('.gnb li.sub-submenu>a').on("click",function(){
            $(this).parent().siblings().find('ul').hide()
            $(this).next().toggle();
            return false;
        })
    }
//    function nav(){
//        var winWidth = $(window).width();
//        if (winWidth>768){
//            $('.gnb li.submenu a').on("mouseover",function(){
//                $(this).parent().siblings().find('ul').hide()
//                $(this).next().show();
//            })
//            $('.gnb').on("mouseleave",function(){
//                $(this).find('li>ul').hide()
//            })
//        } else if(winWidth<=768){
//            $('.mobile_menu a').on("click",function(){
//                $(this).toggleClass('active')
//                $('nav.gnb').toggle()
//            })
//            $('.gnb li.submenu>a').on("click",function(){
//                $(this).parent().siblings().find('ul').hide()
//                $(this).next().toggle();
//                return false;
//            })
//            $('.gnb li.sub-submenu>a').on("click",function(){
//                $(this).parent().siblings().find('ul').hide()
//                $(this).next().toggle();
//                return false;
//            })
//        }
//    }
});
