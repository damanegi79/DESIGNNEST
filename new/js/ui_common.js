"use strict";

(function ($){
    var nest = nest || function (){
    var pageAr = ["home", "service", "portfolio", "developement", "contact"];
    var currentPage = "";
    var oldPage = "";
    var firstFlag = true;
    var currentUrl = "";
    function loadPage() {
        var html = "";
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
                $('.menuOpen .stats').text(url)
            }
            else
            {

                var outPage = $("#ajaxContents");
                var arrow = getMotionArrow(url);
                $("#ajaxContainer").addClass('fixed')
                TweenMax.to(outPage, 0.6, {x:-($(window).width()*0.5), force3D:true,ease:Power2.easeIn, zIndex:1, onComplete:motionEnd});
                $("#ajaxContainer").append(page);

                TweenMax.to($("#ajaxContainer>#ajaxContents").eq(1), 0, {x:($(window).width()),zIndex:10});
                $("body").scrollTop(0)
                $("body").getNiceScroll().resize()
                TweenMax.to($("#ajaxContainer>#ajaxContents").eq(1), 0.6, {x:0, force3D:true,ease:Power2.easeIn});

                $('.menuOpen .stats').text(url)

                function motionEnd()
                {
                    if(url != "home") nest[url].init();
                    var oldUrl = oldPage.replace("#", "");
                    outPage.remove();
                    oldPage = currentPage;
                    if(nest[oldUrl]) nest[oldUrl].dispos();
                    $("#ajaxContainer").removeClass('fixed')

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
                svgDevice()
                mobileZoom()
                scrollbg()
                lateAxis()
            },
            dispos : function ()
            {
                disposeMain();
                console.log('home dispos')
            }
        }
    })();

    nest.service = (function (){
        return {
            init : function (){
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

    nest.developement = (function (){

        return {
            init : function (){
                headerMotion()
                develope()
                console.log('developement class start')
            },
            dispos : function ()
            {
                console.log('developement dispos')
            }
        }
    })();

    nest.contact = (function (){
        //폼 세팅
        function setFormChek ()
        {
            $.validator.addMethod("phone", function(phone_number, element) {
                phone_number = phone_number.replace(/\s+/g, "");
                return this.optional(element) || phone_number.length > 9 &&
                    phone_number.match(/^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})-?[0-9]{3,4}-?[0-9]{4}$/);
            }, "Please specify a valid phone number");

            $.validator.setDefaults(
            {
                onkeyup:false,
                onclick:false,
                onfocusout:false,
                rules: {
                    title : {
                        required:true,
                    },
                    comuser : {
                        required:true,
                    },
                    senduser : {
                        required:true,
                    },
                    phone : {
                        required:true,
                        minlength:10,
                        phone : true,
                    },
                    email : {
                        required: true,
                        email: true
                    },
                    body : {
                        required:true,
                    }
                },
                messages : {
                    title : {
                        required:"제목을 입력하세요."
                    },
                    comuser : {
                        required:"업체명을 입력하세요."
                    },
                    senduser : {
                        required:"성함을 입력하세요."
                    },
                    phone : {
                        required:"연락처를 입력하세요.",
                        minlength:"- 없이 10~11자리 숫자를 입력하세요.",
                        phone:"올바른 연락처 형식을 입력하세요."
                    },
                    email : {
                        required:"이메일을 입력하세요.",
                        email:"올바른 이메일형식을 입력하세요."
                    },
                    body : {
                        required:"내용을 입력하세요."
                    }
                },
                showErrors:function(errorMap, errorList)
                {
                    if(this.numberOfInvalids())
                    {
                        alert(errorList[0].message);
                        $(errorList[0].element).focus();
                    }
                }
            });

            $('#mailForm').validate({
                submitHandler : function (form)
                {
                    if($("#g-recaptcha-response").val() == "")
                    {
                        alert("자동등록방지에 체크해주세요.");
                        $("#recaptcha").focus();
                        return;
                    }
                    $('#mailForm').submit();
                }
            });
        }
        return {
            init : function (){
                $("#ajaxContainer").addClass('fixed')
                copyToClipboard()
                setFormChek();
                console.log('contact class start')
            },
            dispos : function ()
            {
                $("#ajaxContainer").removeClass('fixed');
                $("#sumbBtn").off("click");
                console.log('contact dispos')
            }
        }
    })();

    window.nest = nest;

})(jQuery);

var nest = new nest();

$(window).load(function() {
    menu();
    chkAgent()
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

    TweenMax.to(menuOpen,0.5,({left:'30px',ease: Power4.easeInOut,delay:0,force3D:true}))

    $(".menuOpen button").hover(function(){
        TweenMax.to(logopath,1.0,({fill:'#0099ff',force3D:true}))
    },function(){
        TweenMax.to(logopath,1.0,({fill:'#fff',force3D:true}))
    })
    $('.menuOpen button').on('click',function(){
        TweenMax.to(menuOpen,0.5,({left:'-200px',ease: Power4.easeInOut,force3D:true}))
        TweenMax.to(menuWrap,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,force3D:true}))
        TweenMax.to(menuContainer,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.2,force3D:true}))
        TweenMax.to(content,1.0,({transform:'translateX(0vw)',ease: Power4.easeInOut,delay:0.4,force3D:true, onComplete:function(){
            TweenMax.to(menuClose,0.3,({transform:'translateX(0)',force3D:true,ease: Power4.easeInOut}))
        }}))
    })
    $('.menuClose button, #nav ul li a, .contact .mail a').on('click',function(){
        TweenMax.to(menuClose,0.3,({transform:'translateX(200px)',ease: Power4.easeInOut,force3D:true}))
        TweenMax.to(content,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut,force3D:true}))
        TweenMax.to(menuContainer,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut,delay:0.2,force3D:true}))
        TweenMax.to(menuWrap,1.0,({transform:'translateX(100vw)',ease: Power4.easeInOut,delay:0.4,force3D:true, onComplete:function(){
            TweenMax.to(menuOpen,0.5,({left:'30px',ease: Power4.easeInOut,force3D:true}))
            TweenMax.to(menuWrap,0,({transform:'translateX(-100vw)',force3D:true}))
            TweenMax.to(menuContainer,0,({transform:'translateX(-100vw)',force3D:true}))
            TweenMax.to(content,0,({transform:'translateX(-100vw)',force3D:true}))
        }}))
    })
}

function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();
}


$(document).ready(function(){
    scroll()
})

function scroll(){
    $("html").niceScroll({
        cursorcolor: "rgba(0,0,0,0.3)", // change cursor color in hex
        cursoropacitymin: 1, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
        cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
        cursorwidth: "8px", // cursor width in pixel (you can also write "5px")
        cursorborder: "none", // css definition for cursor border
        cursorborderradius: "8px", // border radius in pixel for cursor
        scrollspeed: 100,
        mousescrollstep:100,
        autohidemode: false,
    });
}

var timer1;
var timer2;
var introFlag = true;
function introText(){
    if(introFlag == true){
        introFlag = false;
        $('.intro_wrap').one('inview', function(event, isInView) {
            var logo = new TimelineLite();
            var tit = $(".intro_contents");
            var logoCon = $(".intro_contents .logo_content");
            var sub_tit = $(".sub_title");
            logo.from(logoCon, 1.0,{opacity:1,force3D:true,transform:'perspective(1000px) rotateX(0deg) translateY(-200px)',onComplete:function(){
                text_ani()
            }})
            logo.to(tit, 2.5,{transform:'perspective(1000px) rotateX(20deg) rotateY(-20deg)',force3D:true},1)
            logo.to(tit, 2.5,{transform:'perspective(1000px) rotateX(20deg) rotateY(20deg)',force3D:true},3.5)
            logo.to( tit, 1.0, {transform:'perspective(1000px) rotateX(0deg) rotateY(0deg) ',force3D:true,onComplete:function(){
                mob_gyro()
                axis()
                scrollfn()
            }})
            logo.to(sub_tit, 0.5, {opacity:1,transform:'perspective(1000px) rotateX(0deg) translateY(0px)',force3D:true})

            var shadow_tween = new TimelineLite();
            var shadow = $(".intro_wrap .shadow");
            shadow_tween.from(shadow, 1.0,{transform:'perspective( 1000px ) rotateX(0deg) rotateY(0deg) translateY(-200px) scale(0.9)',force3D:true})
            shadow_tween.to(shadow, 2.5,{transform:'perspective(1000px) rotateX(20deg) rotateY(-30deg) translateY(100px)  translateX(150px) scale(0.9)',force3D:true},1)
            shadow_tween.to(shadow, 2.5,{transform:'perspective(1000px) rotateX(20deg) rotateY(30deg) translateY(100px)  translateX(-150px) scale(0.9)',force3D:true},3.5)
            shadow_tween.to(shadow, 1.0, {transform:'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(0.9)',force3D:true})
        })
    }else{
        var svg = $('#svg_logo').getSVG();
        var logopath = svg.find('path');
        var textsvg = $('#svg_text').getSVG();
        var textpath = textsvg.find("path");
        logopath.css({strokeDashoffset:0})
        logopath.eq(4).css({fill:'#0099ff'})
        textpath.css({strokeDashoffset:0})
        textpath.eq(6).css({fill:'#0099ff'})
        mob_gyro()
        axis()
        scrollfn()
    }
}
function axis(){
    if($('.intro_wrap').mouseenter()){
        $(".intro_wrap").bind("mousemove", moveLogo);
    }
}
function scrollfn(){
    var scrollDown = $(".scrollDown")
    var wheel = $(".scrollDown .ico_scroll");
    TweenMax.to( scrollDown, 1, {opacity:1,onComplete:function(){
        TweenMax.to( wheel, 1.5, {transform: 'perspective(1000px) translateY(20px)',repeat:-1, yoyo:true,force3D:true,opacity:0.5} );
    }} );
}

function moveLogo(e){
    var pageX = e.pageX - $(".intro_wrap").offset().left;
    var pageY = e.pageY - $(".intro_wrap").offset().top;
    pageX = pageX - ($(".intro_wrap").width()/2);
    pageY = pageY - ($(".intro_wrap").height()/2); //-scrollY
    var percentX = pageX / ($(".intro_wrap").width()/2);
    var percentY = pageY / ($(".intro_wrap").height()/2);
    var xx = 20*percentX;
    var yy = 20*percentY;
    TweenMax.to($(".intro_contents"), 0.6, {rotationY:xx, rotationX:-yy, force3D:true});
    TweenMax.to($(".intro_wrap .shadow"), 0.6, {rotationY:xx*1.2, rotationX:-yy*1.2, y:-yy*5, x:-xx*10, force3D:true});
}
function mob_gyro(){
    window.addEventListener('deviceorientation', handleOrientation);
    function handleOrientation(event) {
        var x = event.beta // In degree in the range [-180,180]
        var y = event.gamma // In degree in the range [-90,90]
        if (x >  30) { x =  30};
        if (x < -30) { x = -30};
        if (y >  30) { y =  30};
        if (y < -30) { y = -30};
        var rotationX = x
        var rotationY = y
        var moveY = rotationX;
        var moveX = rotationY;
        TweenMax.to($(".intro_contents"), 0.6, {rotationY:-moveX, x:moveX ,y:-moveY*1.5,force3D:true}); //rotationX:(moveY-30)*0.8,
    }
}



function text_ani(){
    var svg = $('#svg_logo').getSVG();
    var logopath = svg.find('path');
    var textsvg = $('#svg_text').getSVG();
    var textpath = textsvg.find("path");
    new Vivus('svg_logo',{duration: 200,type:'delayed'}, function (obj) {

    });
    new Vivus('svg_text', {duration: 300,type:'delayed', forceRender: false}, function (obj) {

    })
    timer1 = setTimeout(function(){
        logopath.each(function(i){
            var self = this
            setTimeout(function(){
                var logo = new TimelineLite();
                logo.to(self, 1.0,{fill:'#0099ff'})
                logo.to(self, 1.0,{fill:'#fff',onComplete:function(){
                    TweenMax.to(logopath.eq(4), 1, {fill:'#0099ff',delay:1});
                }})
            },i*200)
        })
    },5000)
    timer2 = setTimeout(function(){
        textpath.each(function(i){
            var self = this
            setTimeout(function(){
                var textlogo = new TimelineLite();
                textlogo.to(self, 0.5,{fill:'#0099ff'})
                textlogo.to(self, 0.5,{fill:'#fff',onComplete:function(){
                    TweenMax.to(textpath.eq(5), 0.5, {fill:'#0099ff',x:'136%',delay:1.5});
                    TweenMax.to(textpath.eq(6), 0.5, {x:'-136%',delay:1.5});
                }})
            },i*200)
        })

    },3200)

}
function svgDevice(){
    new Vivus('svg_device',{duration:200,type:'oneByOne', forceRender: false},function(){ //,start: 'autostart'
        TweenMax.to($('#img_device3,.img3'), 0.5, {opacity:1,force3D:true});
        TweenMax.to($('#svg_device'), 0.5, {opacity:0,force3D:true});
        TweenMax.to($('.device-pos-2'), 0.3, {marginTop:'-10px',marginLeft:'-80%',opacity:1,delay:0.5,force3D:true});
        TweenMax.to($('.device-pos-1'), 0.3, {marginTop:'-30px',marginLeft:'85%',opacity:1, delay:0.5,force3D:true, onComplete:function(){
        }
                                             });

    })
}



function mobileZoom(){
    var zoom = false;
    $(".img_zoom").on('click',function(){
        var target = $(this).parent().parent()
        if(zoom==false){
            TweenMax.to(target,0.6,{scale:1.5,force3D:true})
            $(this).addClass('active')
            zoom=true;
            return false;
        }else if(zoom==true){
            TweenMax.to(target,0.6,{scale:1,force3D:true})
            $(this).removeClass('active')
            zoom=false;
            return false;
        }
    })
}
function scrollbg(){
    var controller = new ScrollMagic.Controller();
    $('.work_content').each(function(){
        var thisList = this;
        var itemBg = $(thisList).find('.bg')
        var info = $(thisList).find('.work_info')

        var bgTween = TweenMax.to(itemBg, 2, {transform:'translateY(15vh)',force3D:'true',filter: 'blur(25px)'})
        var bgTweenOut = TweenMax.to(itemBg, 2, {transform:'translateY(25vh)',force3D:'true',filter: 'blur(25px)'})
        var infoTween = TweenMax.from(info, 2, {transform:'translateY(300px)',force3D:'true'})


        var bg_scene = new ScrollMagic.Scene({triggerElement:this, offset:'300', duration:350}).setTween(bgTween)
        var bg_sceneOut = new ScrollMagic.Scene({triggerElement:this, offset:'300', triggerHook: 'onLeave',duration:450}).setTween(bgTweenOut)
        var info_scene = new ScrollMagic.Scene({triggerElement:this, offset:'100', duration:350}).setTween(infoTween)
        controller.addScene([
            bg_scene,
            info_scene,
            bg_sceneOut
        ]);
    })
}

function lateAxis(){
    $(".work_content_wrap").each(function(){
        $(this).bind("mouseenter", function (){
            $(this).bind("mousemove", lateMoveAxis);
        });
        $(this).bind("mouseleave", function (){
            TweenMax.to($(this).find('[data-role="move-desktop"]'), 1.0, {transform: "translateZ(0)",x:0, y:0,force3D:true});
            TweenMax.to($(this).find('[data-role="move-notebook"]'), 1.0, {transform: "translateZ(0)",x:0, y:0,force3D:true});
            TweenMax.to($(this).find('[data-role="move-tablet"]'), 1.0, {transform: "translateZ(0)",x:0, y:0,force3D:true});
            TweenMax.to($(this).find('[data-role="move-mobile"]'), 1.0, {transform: "translateZ(0)",x:0, y:0,force3D:true});
            $(this).unbind("mousemove", lateMoveAxis);
        });
        function lateMoveAxis(e){
            var pageX = e.pageX - $(this).offset().left;
            var pageY = e.pageY - $(this).offset().top;
            pageX = pageX - ($(this).width()/2);
            pageY = pageY - ($(this).height()/2);
            var percentX = pageX / ($(".work_img_area").width()/2);
            var percentY = pageY / ($(".work_img_area").height()/2);
            var xx = -10*percentX;
            var yy = -10*percentY;
            TweenMax.to($(this).find('[data-role="move-desktop"]'), 1, {x:xx*2,y:yy*1,force3D:true});
            TweenMax.to($(this).find('[data-role="move-notebook"]'), 1, {x:xx*4,y:yy*2,force3D:true});
            TweenMax.to($(this).find('[data-role="move-tablet"]'), 1, {x:xx*6,y:yy*3,force3D:true});
            TweenMax.to($(this).find('[data-role="move-mobile"]'), 1, {x:xx*8,y:yy*4,force3D:true});
        }
    })

}

function disposeMain(){
    clearInterval(timer1);
    clearInterval(timer2);
    $('.intro_wrap').off('inview');
}

function headerMotion(){
    var controller = new ScrollMagic.Controller();
    var header = $('#transition_wrapper .header .contents')
    var headerTween = TweenMax.to(header, 2, {transform:'translateY(200px) scale(0.8)',force3D:true,opacity:0.5})
    var header_scene = new ScrollMagic.Scene({triggerElement:this, offset:0, triggerHook: 'onLeave', duration:'100%'}).setTween(headerTween)
    controller.addScene([
        header_scene
    ]);
}

function scroll3d(){
    var controller = new ScrollMagic.Controller();
    $('.itemList').each(function(){
        var thisList = this;
        var itemInfo = $(thisList).find('.item_info')
        var itemMobile = $(thisList).find('.mobile')
        var itemPc = $(thisList).find('.pc')
        var itemTab = $(thisList).find('.tablet')

        var listTween = TweenMax.from(thisList, 2, {transform:'rotateX(-40deg) scale(0.8)', force3D:true,filter:'blur(3px) grayscale(1)'})
        var infoTween = TweenMax.to(itemInfo, 2, {transform:'translateY(0px)', force3D:true})
        var mobileTween = TweenMax.to(itemMobile, 2, {transform:'translateY(0px)', force3D:true})
        var pcTween = TweenMax.to(itemPc, 2, {transform:'translateY(0px)', force3D:true,onComplete:function(){
            $(thisList).addClass('active')
        }})
        var tabTween = TweenMax.from(itemTab, 2, {transform:'translateY(200px)',force3D:true})

        var list_scene = new ScrollMagic.Scene({triggerElement:this, offset:50, triggerHook: 'onEnter',duration:450}).setTween(listTween)
        var info_scene = new ScrollMagic.Scene({triggerElement:this, offset:50, triggerHook: 'onEnter',duration:450}).setTween(infoTween)
        var mobile_scene = new ScrollMagic.Scene({triggerElement:this, offset:50, triggerHook: 'onEnter',duration:450}).setTween(mobileTween)
        var pc_scene = new ScrollMagic.Scene({triggerElement:this, offset:50, triggerHook: 'onEnter',duration:450}).setTween(pcTween)
        var tab_scene = new ScrollMagic.Scene({triggerElement:this, offset:50, triggerHook: 'onEnter',duration:450}).setTween(tabTween)

        controller.addScene([
            list_scene,info_scene,mobile_scene,pc_scene,tab_scene
        ]);

    })
    $('.itemList').each(function(){
        var thisList = this;
        var itemInfo = $(thisList).find('.item_info')
        var itemMobile = $(thisList).find('.mobile')
        var itemPc = $(thisList).find('.pc')
        var itemTab = $(thisList).find('.tablet')

        var listTween = TweenMax.to(this, 2, {transform:'rotateX(40deg) scale(0.7)',force3D:true,filter:'blur(3px) grayscale(1)'})
        var infoTween = TweenMax.to(itemInfo, 2, {transform:'translateY(-100px)',force3D:true})

        var mobileTween = TweenMax.to(itemMobile, 2, {transform:'translateY(-300px)',force3D:true})
        var pcTween = TweenMax.to(itemPc, 2, {transform:'translateY(-100px)',force3D:true,onStart:function(){
            $(thisList).removeClass('active')
        }})
        var tabTween = TweenMax.to(itemTab, 2, {transform:'translateY(-200px)',force3D:true})

        var list_scene = new ScrollMagic.Scene({triggerElement:this, offset:-50, triggerHook: 'onLeave',duration:350}).setTween(listTween)
        var info_scene = new ScrollMagic.Scene({triggerElement:this, offset:-50, triggerHook: 'onLeave',duration:350}).setTween(infoTween)
        var mobile_scene = new ScrollMagic.Scene({triggerElement:this, offset:-90, triggerHook: 'onLeave',duration:350}).setTween(mobileTween)
        var pc_scene = new ScrollMagic.Scene({triggerElement:this, offset:-30, triggerHook: 'onLeave',duration:350}).setTween(pcTween)
        var tab_scene = new ScrollMagic.Scene({triggerElement:this, offset:-60, triggerHook: 'onLeave',duration:350}).setTween(tabTween)

        controller.addScene([
            list_scene,info_scene,mobile_scene,pc_scene,tab_scene
        ]);
    })
}
function axisCard(){
    $('.cardArea').each(function(){
        var thisList = this;
        $(this).bind("mouseenter",function(){
            $(this).bind("mousemove",moveFolio)
            TweenMax.to($(this).find('.card'), 0.5, {transform: "scale(1.2) translateY(0px)",force3D:true,x:0, y:0});
            TweenMax.to($(this).find('.shadow'), 0.5, {transform: "scale(1) translateY(30px)",force3D:true,x:0, y:0, marginTop:'-70px', boxShadow:'0 0 20px rgba(0,0,0,1)'});
            TweenMax.to($(this).find('.txtArea'), 0.5, {transform: "scale(1) translateY(0px)",force3D:true,x:0, y:0});
            TweenMax.to($(this).find('.shadowTxt'), 0.5, {transform: "scale(1) translateY(20px) translateX(20px)",force3D:true,x:0, y:0,opacity:0.4,filter: 'blur(1px)'});
        })
        $(this).bind("mouseleave",function(){
            TweenMax.to($(this).find('.card'), 0.5, {transform: "scale(1) translateY(0px)",force3D:true,x:0, y:0});
            TweenMax.to($(this).find('.shadow'), 0.5, {transform: "scale(1) translateY(0px)",force3D:true,x:0, y:0, marginTop:'-100px', boxShadow:'0 0 0 rgba(0,0,0,0.5)'});
            TweenMax.to($(this).find('.txtArea'), 0.5, {transform: "scale(1) translateY(0px)",force3D:true,x:0, y:0});
            TweenMax.to($(this).find('.shadowTxt'), 0.5, {transform: "scale(1) translateY(0px) translateX(0px)",force3D:true,x:0, y:0,opacity:0,filter: 'blur(0px)'});
            TweenMax.to($(this).find(".shine"), 1, {"background":"linear-gradient(315deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%)",force3D:true})
            $(this).unbind("mousemove",moveFolio)
        })
    })
}
function moveFolio(e){
    var pageX = e.pageX - $(this).offset().left;
    var pageY = e.pageY - $(this).offset().top;
    pageX = pageX - ($(this).width()/2);
    pageY = pageY - ($(this).height()/2);
    var percentX = pageX / ($(this).width()/2);
    var percentY = pageY / ($(this).height()/2);
    var xx = 5*percentX;
    var yy = 20*percentY;
    var rotationY = -5*percentX;
    var rotationX = 5*percentY;
    var angle = -getAngle(0, 0, pageX, pageY);
    TweenMax.to($(this).find(".shine"), 0, {"background":"linear-gradient("+angle+"deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 100%)",force3D:true})
    TweenMax.to($(this).find('.card'), 0.6, {rotationY:-rotationY*5, rotationX:-rotationX*5,force3D:true});
    TweenMax.to($(this).find('.shadow'), 0.6, {rotationY:-rotationY*5, rotationX:-rotationX*5, x:xx, y:-yy,force3D:true});
    TweenMax.to($(this).find('.txtArea'), 0.6, {x:-xx*2, y:yy,force3D:true});
    TweenMax.to($(this).find('.shadowTxt'), 0.6, {x:-xx/2, y:yy/2,force3D:true});
}

function getAngle  (x1, y1, x2, y2){
    var dx = x2 - x1;
    var dy = y2 - y1;
    var rad = Math.atan2(dx, dy);
    return (rad*180)/Math.PI;
}

function service(){
    var controller = new ScrollMagic.Controller();
    $('.service_container').each(function(){
        var thisList = this;
        var itemTxt = $(thisList).find('.text_area b')
        var itemTxtarea = $(thisList).find('.text_area')
        var itemListarea = $(thisList).find('.templateImg .list')
        var itemListareaBG = $(thisList).find('.templateImg .list .back')

        var txtTween = TweenMax.to(itemTxt, 2, {color:'#0099ff',force3D:true})
        var areaTween = TweenMax.to(itemTxtarea, 2, {transform:"translateX(0%)",opacity:1,force3D:true})
        var itemListTween = TweenMax.to(itemListarea, 2, {transform:"perspective( 1000px ) rotateX(10deg) rotateZ(-40deg) translateY(-500px)  translateX(200px) scale(1.2)",force3D:true})
        var itemListTweenBG = TweenMax.to(itemListareaBG, 2, {transform:"perspective(1000px) translateX(-30px) translateY(-30px) translateZ(-0px) rotateZ(-10deg)scale(0.8)",force3D:true,opacity: 0.2,filter:"blur(10px)"})
        var txt_scene = new ScrollMagic.Scene({triggerElement:this, offset:250, duration:100}).setTween(txtTween)
        var area_scene = new ScrollMagic.Scene({triggerElement:this, offset:100, triggerHook: 'onEnter', duration:400}).setTween(areaTween)
        var template_scene = new ScrollMagic.Scene({triggerElement:this, offset:400, triggerHook: 'onEnter', duration:800}).setTween(itemListTween)
        var template_sceneBG = new ScrollMagic.Scene({triggerElement:this, offset:400, triggerHook: 'onEnter', duration:800}).setTween(itemListTweenBG)

        var responsive01 = $(thisList).find('.device01')
        var responsive02 = $(thisList).find('.device02')
        var responsive03 = $(thisList).find('.device03')
        var responsive04 = $(thisList).find('.device04')
        var responsive05 = $(thisList).find('.device05')

        var responsiveTween01 = TweenMax.from(responsive01, 2, {transform:"translateY(-350px)",opacity:1,force3D:true})
        var responsiveTween02 = TweenMax.from(responsive02, 2, {transform:"translateY(-450px) translateX(-100px)",opacity:1,force3D:true})
        var responsiveTween03 = TweenMax.from(responsive03, 2, {transform:"rotateZ(30deg) scale(1.5) translateY(250px) translateX(-50px)",opacity:1,force3D:true})
        var responsiveTween04 = TweenMax.from(responsive04, 2, {transform:"translateY(300px) translateX(100px)",opacity:1,force3D:true})
        var responsiveTween05 = TweenMax.from(responsive05, 2, {transform:"translateX(450px)",force3D:true,opacity:1,onComplete:function(){
        }})

        var resoposive_scene01 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'400', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween01)
        var resoposive_scene02 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'400', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween02)
        var resoposive_scene03 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'400', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween03)
        var resoposive_scene04 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'400', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween04)
        var resoposive_scene05 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'400', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween05)

        var mobileTween = new TimelineMax();
        mobileTween
            .to(responsive03, 2, {transform:"rotateZ(0deg) translateY(450px) translateX(300px) scale(5)",force3D:true,opacity:1,onStart:function(){
                $('.service_container.overWrap').addClass('over-view')
            }})
            .to(responsive03.find('.mobile02'), 1, {transform:"rotateZ(0deg)  translateY(5px) translateX(-40px) scale(0.9)",force3D:true})
            .to(responsive03.find('.mobile01'), 1, {transform:"rotateZ(10deg) translateY(23px) translateX(-85px) scale(0.8)",force3D:true})


        var mobile_scene = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'0', triggerHook: 'onLeave', duration:450}).setTween(mobileTween)


        var ui_img = $(thisList).find('.ui_img .ui');
        var ui_text = $(thisList).find('.ui_img .text');
        var uiTween = TweenMax.to(ui_img, 2, {transform:"scale(1.2) translateY(-10px) translateX(0px)", opacity:1,force3D:true})
        var uiTextTween = TweenMax.to(ui_text, 2, {transform:"scale(1)", opacity:1,force3D:true})
        var ui_scene = new ScrollMagic.Scene({triggerElement:this, offset:'400', triggerHook: 'onEnter', duration:400}).setTween(uiTween)
        var uiText_scene = new ScrollMagic.Scene({triggerElement:this, offset:'500', triggerHook: 'onEnter', duration:200}).setTween(uiTextTween)


        var pc_img01 = $(thisList).find('.pc_img .img_con.con01');
        var pc_img02 = $(thisList).find('.pc_img .img_con.con02');
        var pc_img03 = $(thisList).find('.pc_img .img_con.con03');

        var pcTween01 = TweenMax.to(pc_img03, 2, {transform:"scale(1) translateY(-100px) translateX(-200px) scale(1)", opacity:1,force3D:true})
        var pcTween02 = TweenMax.to(pc_img02, 2, {transform:"scale(1) translateY(-50px) translateX(-100px) scale(1)", opacity:1,force3D:true})
        var pcTween03 = TweenMax.to(pc_img01, 2, {transform:"scale(1) translateY(-20px) translateX(-50px)", opacity:1,force3D:true})

        var pc_scene01 = new ScrollMagic.Scene({triggerElement:this, offset:'400', triggerHook: 'onEnter', duration:300}).setTween(pcTween01)
        var pc_scene02 = new ScrollMagic.Scene({triggerElement:this, offset:'500', triggerHook: 'onEnter', duration:300}).setTween(pcTween02)
        var pc_scene03 = new ScrollMagic.Scene({triggerElement:this, offset:'400', triggerHook: 'onEnter', duration:300}).setTween(pcTween03)


        controller.addScene([
            txt_scene,
            template_scene,
            template_sceneBG,
            resoposive_scene01,
            resoposive_scene02,
            resoposive_scene03,
            resoposive_scene04,
            resoposive_scene05,
            mobile_scene,
            ui_scene,
            uiText_scene,
            pc_scene01,
            pc_scene02,
        ]);

    })
}

function develope(){
    var controller = new ScrollMagic.Controller();
    var introIco = $('.text_dev_service .block')
    var introTween = TweenMax.from(introIco, 1, {transform: 'rotateZ(45deg)',marginLeft:'19px', border:'1px solid #0099ff', boxShadow:'none',ease: Power4.easeInOut}) // translateX(13px) translateY(-14px)
    var intro_scene = new ScrollMagic.Scene({triggerElement:'.text_dev_service', offset:0}).setTween(introTween)
    var client = $('.txt_client li:even .ico')
    var client1 = $('.txt_client li:odd .ico')
    var clientTween = TweenMax.from(client, 1.5, {transform: 'rotateZ(45deg)',marginTop:'-30px', border:'1px solid #0099ff', boxShadow:'none',ease: Power4.easeInOut})
    var clientTween1 = TweenMax.from(client1, 1.5, {transform: 'rotateZ(45deg)',marginTop:'28px', border:'1px solid #0099ff', boxShadow:'none',ease: Power4.easeInOut})
    var client_scene = new ScrollMagic.Scene({triggerElement:'.txt_client .bottom', offset:0}).setTween(clientTween)
    var client_scene1 = new ScrollMagic.Scene({triggerElement:'.txt_client .bottom', offset:0}).setTween(clientTween1)
    controller.addScene([
        intro_scene,
        client_scene,
        client_scene1
    ]);
}
