$(document).ready(function () {
    // Sticky Nav Bar
    $('#fadeLayer').fadeOut(500)

        /* initialize the slider based on the Slider's ID attribute */
        $('#rev_slider_1').show().revolution({
//            dottedOverlay: 'twoxtwo',
//            shadow: 1,
            /* options are 'auto', 'fullwidth' or 'fullscreen' */
            sliderLayout: 'fullscreen',
            delay: 5000,
            autoHeight:"on",
            responsiveLevels:[1199,991,767,480],
            parallax: {
                type: 'mouse+scroll',
                origo: 'slidercenter',
                speed: 500,
                levels: [5,10,15,20,25,30,35,40,
                         45,46,47,48,49,50,51,55],
                disable_onmobile: 'on'
            },
            /* basic navigation arrows and bullets */
            navigation: {
                onHoverStop: "off",
                arrows: {
                    enable:false,
                    style: 'hesperiden',
                    hide_onleave: false
                },

                bullets: {
                    enable: true,
                    style: 'hesperiden',
                    hide_onleave: false,
                    h_align: 'center',
                    v_align: 'bottom',
                    h_offset: 0,
                    v_offset: 20,
                    space: 5
                }
            }
        });


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

});
