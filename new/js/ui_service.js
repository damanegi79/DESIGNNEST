"use strict";
//$(document).ready(function() {
//    init()
//})

function init(){
    scroll()
    scroll3d()
    headerMotion()
    service()
    axisCard()
}

//$(window).load(function() {
//    $("body").niceScroll({
//        cursorcolor: "rgba(0,0,0,0.5)", // change cursor color in hex
//        cursoropacitymin: 1, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
//        cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
//        cursorwidth: "10px", // cursor width in pixel (you can also write "5px")
//        cursorborder: "none", // css definition for cursor border
//        cursorborderradius: "5px", // border radius in pixel for cursor
//        scrollspeed: 150,
//        mousescrollstep:80,
//        autohidemode: false,
//    });
//    scroll3d()
//    headerMotion()
//    service()
//    axisCard()
//})

function scroll(){
    $("body").niceScroll({
        cursorcolor: "rgba(0,0,0,0.5)", // change cursor color in hex
        cursoropacitymin: 1, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
        cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
        cursorwidth: "10px", // cursor width in pixel (you can also write "5px")
        cursorborder: "none", // css definition for cursor border
        cursorborderradius: "5px", // border radius in pixel for cursor
        scrollspeed: 150,
        mousescrollstep:80,
        autohidemode: false,
    });
}

function headerMotion(){
    var controller = new ScrollMagic.Controller();
    var header = $('#transition_wrapper .header .contents')
    var headerTween = TweenMax.to(header, 2, {transform:'translateY(30vh) scale(0.8)',force3D:true,opacity:0.5})
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
        var listTween = TweenMax.from(thisList, 2, {transform:'rotateX(-40deg) scale(0.8)', force3D:true})
        var infoTween = TweenMax.to(itemInfo, 2, {transform:'translateY(0px)', force3D:true})
        var mobileTween = TweenMax.to(itemMobile, 2, {transform:'translateY(0px)', force3D:true})
        var pcTween = TweenMax.to(itemPc, 2, {transform:'translateY(0px)', force3D:true,onComplete:function(){
            $(thisList).addClass('active')
        }})
        var list_scene = new ScrollMagic.Scene({triggerElement:this, offset:50, triggerHook: 'onEnter',duration:450}).setTween(listTween)
        var info_scene = new ScrollMagic.Scene({triggerElement:this, offset:50, triggerHook: 'onEnter',duration:450}).setTween(infoTween)
        var mobile_scene = new ScrollMagic.Scene({triggerElement:this, offset:50, triggerHook: 'onEnter',duration:450}).setTween(mobileTween)
        var pc_scene = new ScrollMagic.Scene({triggerElement:this, offset:50, triggerHook: 'onEnter',duration:450}).setTween(pcTween)

        controller.addScene([
            list_scene,info_scene,mobile_scene,pc_scene
        ]);

    })
    $('.itemList').each(function(){
        var thisList = this;
        var itemInfo = $(thisList).find('.item_info')
        var itemMobile = $(thisList).find('.mobile')
        var itemPc = $(thisList).find('.pc')

        var listTween = TweenMax.to(this, 2, {transform:'rotateX(40deg) scale(0.7)',force3D:true})
        var infoTween = TweenMax.to(itemInfo, 2, {transform:'translateY(-100px)',force3D:true})
        var mobileTween = TweenMax.to(itemMobile, 2, {transform:'translateY(-200px)',force3D:true})
        var pcTween = TweenMax.to(itemPc, 2, {transform:'translateY(-100px)',force3D:true,onStart:function(){
            $(thisList).removeClass('active')
        }})
        var list_scene = new ScrollMagic.Scene({triggerElement:this, offset:-50, triggerHook: 'onLeave',duration:350}).setTween(listTween)
        var info_scene = new ScrollMagic.Scene({triggerElement:this, offset:-50, triggerHook: 'onLeave',duration:350}).setTween(infoTween)
        var mobile_scene = new ScrollMagic.Scene({triggerElement:this, offset:-50, triggerHook: 'onLeave',duration:350}).setTween(mobileTween)
        var pc_scene = new ScrollMagic.Scene({triggerElement:this, offset:-50, triggerHook: 'onLeave',duration:350}).setTween(pcTween)

        controller.addScene([
            list_scene,info_scene,mobile_scene,pc_scene
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
            TweenMax.to($(this).find('.shadowTxt'), 0.5, {transform: "scale(1.05) translateY(20px) translateX(20px)",force3D:true,x:0, y:0,opacity:0.2,textShadow:'0, 0, 1px rgba(0,0,0,1)'});
        })
        $(this).bind("mouseleave",function(){
            TweenMax.to($(this).find('.card'), 0.5, {transform: "scale(1) translateY(0px)",force3D:true,x:0, y:0});
            TweenMax.to($(this).find('.shadow'), 0.5, {transform: "scale(1) translateY(0px)",force3D:true,x:0, y:0, marginTop:'-100px', boxShadow:'0 0 0 rgba(0,0,0,0.5)'});
            TweenMax.to($(this).find('.txtArea'), 0.5, {transform: "scale(1) translateY(0px)",force3D:true,x:0, y:0});
            TweenMax.to($(this).find('.shadowTxt'), 0.5, {transform: "scale(1) translateY(0px) translateX(0px)",force3D:true,x:0, y:0,opacity:0});
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
        var itemListarea = $(thisList).find('.templateImg ul.list')

//        var txtTween = TweenMax.to(itemTxt, 2, {color:'#128dd4',borderBottom:'1px solid #128dd4'})
//        var areaTween = TweenMax.to(itemTxtarea, 2, {transform:"translateX(0%)",opacity:1})

//        var txt_scene = new ScrollMagic.Scene({triggerElement:this, offset:200, duration:100}).setTween(txtTween)
//        var area_scene = new ScrollMagic.Scene({triggerElement:this, offset:100, triggerHook: 'onEnter', duration:400}).setTween(areaTween)

        var txtTween = TweenMax.to(itemTxt, 2, {color:'#128dd4',force3D:true})
        var areaTween = TweenMax.to(itemTxtarea, 2, {transform:"translateX(0%)",opacity:1,force3D:true})
        var itemListTween = TweenMax.to(itemListarea, 2, {transform:"perspective( 1000px ) rotateX(10deg) rotateZ(-40deg) translateY(-500px)  translateX(200px) scale(1.2)",force3D:true})


        var txt_scene = new ScrollMagic.Scene({triggerElement:this, offset:250, duration:100}).setTween(txtTween)
        var area_scene = new ScrollMagic.Scene({triggerElement:this, offset:100, triggerHook: 'onEnter', duration:400}).setTween(areaTween)
        var template_scene = new ScrollMagic.Scene({triggerElement:this, offset:200, triggerHook: 'onEnter', duration:1000}).setTween(itemListTween)

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
//            $('.service_container.overWrap').addClass('over-view')
        }})

        var resoposive_scene01 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'300', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween01)
        var resoposive_scene02 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'300', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween02)
        var resoposive_scene03 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'300', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween03)
        var resoposive_scene04 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'300', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween04)
        var resoposive_scene05 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'300', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween05)

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
//            area_scene,
            template_scene,
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
//            pc_scene03
        ]);

    })
 }
