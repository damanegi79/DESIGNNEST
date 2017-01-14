"use strict";

var timer1;
var timer2;
var introFlag = true;
function introText(){
    if(introFlag == true){
        introFlag = false;
    $('.intro_wrap').one('inview', function(event, isInView) {
        text_ani()
        var logo = new TimelineLite();
        var tit = $(".intro_contents");
        var logoCon = $(".intro_contents .logo_content");
        var sub_tit = $(".sub_title");
        logo.from(logoCon, 1.0,{opacity:1,force3D:true,transform:'perspective(1000px) rotateX(0deg) translateY(-200px)'})
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
        TweenMax.to(logopath.eq(4), 1.5, {fill:'#0099ff'});
        TweenMax.to(textpath.eq(6), 1.5, {fill:'#0099ff'});
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
        TweenMax.to( wheel, 1.5, {transform: 'perspective(1000px) translateY(20px) scale(1)',repeat:-1, yoyo:true,force3D:true,opacity:0.5} );
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
    new Vivus('svg_logo',{duration: 200,type:'oneByOne'}, function (obj) {
//            logopath.each(function(i){
//                var self = this
//                setTimeout(function(){
//                    var logo = new TimelineLite();
//                    logo.to(self, 0.2,{stroke:'none',delay:1})
//                },i*200)
//            })

    });
    new Vivus('svg_text', {duration: 300,type:'delayed', forceRender: false}, function (obj) {

    })
    timer1 = setTimeout(function(){
        var svg = $('#svg_logo').getSVG();
        var logopath = svg.find('path');
        logopath.each(function(i){
            var self = this
            setTimeout(function(){
                var logo = new TimelineLite();
                logo.to(self, 1.0,{fill:'#0099ff'})
                logo.to(self, 1.0,{fill:'#fff'})
            },i*200)
        })
    },3500)
    timer2 = setTimeout(function(){
        var svg = $('#svg_logo').getSVG();
        var logopath = svg.find('path');
        var textsvg = $('#svg_text').getSVG();
        var textpath = textsvg.find("path");
        textpath.each(function(i){
            var self = this
            setTimeout(function(){
                var textlogo = new TimelineLite();
                textlogo.to(self, 0.5,{fill:'#0099ff'})
                textlogo.to(self, 0.5,{fill:'#fff',onComplete:function(){
                    TweenMax.to(logopath.eq(4), 0.5, {fill:'#0099ff'});
                    TweenMax.to(textpath.eq(5), 0.5, {fill:'#0099ff',x:'136%',delay:2.5});
                    TweenMax.to(textpath.eq(6), 0.5, {x:'-136%',delay:2.5});
                }})
            },i*200)
        })

    },4000)
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
//            TweenMax.to($(this).find('[data-role="move-bg"]'), 1.0, {transform: "translateZ(0)", force3D:true});
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
//            TweenMax.to($(this).find('[data-role="move-bg"]'), 1, {x:xx,force3D:true});
            TweenMax.to($(this).find('[data-role="move-desktop"]'), 1, {x:xx*2,y:yy*1,force3D:true});
            TweenMax.to($(this).find('[data-role="move-notebook"]'), 1, {x:xx*4,y:yy*2,force3D:true});
            TweenMax.to($(this).find('[data-role="move-tablet"]'), 1, {x:xx*6,y:yy*3,force3D:true});
            TweenMax.to($(this).find('[data-role="move-mobile"]'), 1, {x:xx*8,y:yy*4,force3D:true});
        }
    })

}

function disposeMain()
{
    clearInterval(timer1);
    clearInterval(timer2);
    $('.intro_wrap').off('inview');
}
