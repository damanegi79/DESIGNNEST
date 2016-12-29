"use strict";

//var motionFlag = false;

//$(window).load(function() {
//    init()
//})

//function init(){
//    console.log('load home')
//    introText()
////    motionFlag = true;
//    svgDevice()
//    mobileZoom()
//    scrollbg()
//}


function introText(){
    text_ani()
    var logo = new TimelineLite();
    var tit = $(".intro_contents");
    var sub_tit = $(".logo_area .sub_title");
    logo.to(tit, 1.0,{marginTop:0, opacity:1})
    logo.to(tit, 2.5,{transform:'perspective(1000px) rotateX(20deg) rotateY(-20deg)'},1)
    logo.to(tit, 2.5,{transform:'perspective(1000px) rotateX(20deg) rotateY(20deg)'},3.5)
    logo.to( tit, 1.0, {transform:'perspective(1000px) rotateX(0deg) rotateY(0deg) ',onComplete:function(){
        mob_gyro()
        axis()
    }})
    logo.to(sub_tit, 0.5, {opacity:1,transform:'perspective(1000px) rotateX(0deg) translateY(0px)'})
}
function axis(){
    if($('.intro_wrap').mouseover()){
        $(".logo_content").bind("mousemove", moveLogo);
    }
}
function scrollfn(){
    var scrollDown = $(".scrollDown")
    var wheel = $(".scrollDown .ico_scroll");
    TweenMax.to( scrollDown, 1, {opacity:1,onComplete:function(){
        TweenMax.to( wheel, 1, {transform: 'translateY(20px)',repeat:-1, yoyo:true} );
    }} );
}

function moveLogo(e){
    var pageX = e.pageX - $(".intro_wrap").offset().left;
    var pageY = e.pageY - $(".intro_wrap").offset().top;
    pageX = pageX - ($(".intro_wrap").width()/2);
    pageY = pageY - ($(".intro_wrap").height()/2); //-scrollY
    var percentX = pageX / ($(".intro_wrap").width()/2);
    var percentY = pageY / ($(".intro_wrap").height()/2);
    var rotationY = -15*percentX;
    var rotationX = 15*percentY;
    TweenMax.to($(".intro_contents"), 0.6, {rotationY:rotationY, rotationX:rotationX,x:rotationY*2, y:-rotationX*2});
    console.log(pageX,pageY)
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
        TweenMax.to($(".intro_contents"), 0.6, {rotationY:-moveX, x:moveX ,y:-moveY*1.5}); //rotationX:(moveY-30)*0.8,
        $(".console input.input01").val('y:'+moveY)
        $(".console input.input02").val('x:'+moveX)
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
    setTimeout(function(){
        var svg = $('#svg_logo').getSVG();
        var logopath = svg.find('path');
        logopath.each(function(i){
            var self = this
            setTimeout(function(){
                var logo = new TimelineLite();
                logo.to(self, 1.0,{fill:'#128dd4'})
                logo.to(self, 1.0,{fill:'#222'})
            },i*200)
        })
    },3500)
    setTimeout(function(){
        var svg = $('#svg_logo').getSVG();
        var logopath = svg.find('path');
        var textsvg = $('#svg_text').getSVG();
        var textpath = textsvg.find("path");
        console.log('path = ' +textpath.size())
        textpath.each(function(i){
            var self = this
            setTimeout(function(){
                var textlogo = new TimelineLite();
                textlogo.to(self, 1.0,{fill:'#128dd4'})
                textlogo.to(self, 1.0,{fill:'#222',onComplete:function(){
                    TweenMax.to(logopath.eq(4), 0.5, {fill:'#128dd4'});
                    TweenMax.to(textpath.eq(5), 0.5, {fill:'#128dd4',x:'136%'});
                    //            TweenMax.to(textpath.eq(5), 0.5, { delay:2});
                    TweenMax.to(textpath.eq(6), 0.5, {x:'-136%'});
                }})
            },i*200)
        })
        setTimeout(function(){
            scrollfn()
        },2000)
    },4000)
}
function svgDevice(){
    new Vivus('svg_device',{duration:200,type:'oneByOne', forceRender: false},function(){ //,start: 'autostart'
        deviceAxis()
        TweenMax.to($('#img_device3,.img3'), 0.5, {opacity:1});
        TweenMax.to($('#svg_device'), 0.5, {opacity:0});
        TweenMax.to($('.device-pos-2'), 0.3, {marginTop:'-10px',marginLeft:'-80%',opacity:1,delay:0.5});
        TweenMax.to($('.device-pos-1'), 0.3, {marginTop:'-30px',marginLeft:'85%',opacity:1, delay:0.5, onComplete:function(){
            }
        });

    })
}


function deviceAxis(){
        var motionDeviceAxis = false;
        $(".project-01").bind("mouseover", function (){
            if(!motionDeviceAxis){
                motionDeviceAxis = true;
                $(".project-01").bind("mousemove", moveAxis);
                //            $(".work_info").bind("mousemove", moveAxis);
                //            TweenMax.to($(".work_info"), 0.6, {transform: "translateZ(50px)"});
                console.log('in')
            }
        });


        $(".project-01").bind("mouseleave", function (){
            motionDeviceAxis = false;
            TweenMax.to($('[data-role="moveTarget-1"]'), 1.0, {transform: "translateZ(0)",x:0, y:0});
            TweenMax.to($('[data-role="moveTarget-2"]'), 1.0, {transform: "translateZ(0)",x:0, y:0});
            TweenMax.to($('[data-role="moveTarget-3"]'), 1.0, {transform: "translateZ(0)",x:0, y:0});
//            TweenMax.to($(".work_info"), 0.6, {transform: "translateZ(0px)"});
            $(".project-01").unbind("mousemove", moveAxis);
//            $(".work_info").unbind("mousemove", moveAxis);
            console.log('out')
        });

    }

function moveAxis(e){
        var pageX = e.pageX - $(".work_img_area").offset().left;
        var pageY = e.pageY - $(".work_img_area").offset().top;
        pageX = pageX - ($(".work_img_area").width()/2);
        pageY = pageY - ($(".work_img_area").height()/2);
        var percentX = pageX / ($(".work_img_area").width()/2);
        var percentY = pageY / ($(".work_img_area").height()/2);
        var rotationY = -10*percentX;
        var rotationX = 10*percentY;
        var xx = -10*percentX;
        var yy = -10*percentY;
        TweenMax.to($('[data-role="moveTarget-1"]'), 0.6, {x:xx,y:yy});
        TweenMax.to($('[data-role="moveTarget-2"]'), 0.6, {x:xx*1.5,y:yy*2.5});
        TweenMax.to($('[data-role="moveTarget-3"]'), 0.6, {x:xx*3,y:yy*4});
//        TweenMax.to($('.work_info'), 0.6, {rotationY:rotationY, rotationX:rotationX});

    }

function mobileZoom(){
    var zoom = false;
    $(".img_zoom").on('click',function(){
        var target = $(this).parent().parent()
        if(zoom==false){
            TweenMax.to(target,0.6,{scale:1.5})
            $(this).addClass('active')
            zoom=true;
            return false;
        }else if(zoom==true){
            TweenMax.to(target,0.6,{scale:1})
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
        var bgTween = TweenMax.to(itemBg, 2, {transform:'translateY(-20vh)'})
        var bg_scene = new ScrollMagic.Scene({triggerElement:this, offset:'-200', triggerHook: 'onLeave',duration:450}).setTween(bgTween)
        controller.addScene([
            bg_scene
        ]);
    })
}
