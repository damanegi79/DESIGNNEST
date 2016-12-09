"use strict";

$(window).load(function() {
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
    scroll3d()
    headerMotion()
    service()
    axisCard()
})

function headerMotion(){
    var controller = new ScrollMagic.Controller();
    var header = $('#transition_wrapper .header .contents')
    var headerTween = TweenMax.to(header, 2, {transform:'translateY(30vh) scale(0.8)',opacity:0.5})
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
        var listTween = TweenMax.from(thisList, 2, {transform:'rotateX(-40deg) scale(0.8)'})
        var infoTween = TweenMax.to(itemInfo, 2, {transform:'translateY(0px)'})
        var mobileTween = TweenMax.to(itemMobile, 2, {transform:'translateY(0px)'})
        var pcTween = TweenMax.to(itemPc, 2, {transform:'translateY(0px)',onComplete:function(){
            $(thisList).addClass('active')
            console.log('has active')
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

        var listTween = TweenMax.to(this, 2, {transform:'rotateX(40deg) scale(0.8)'})
        var infoTween = TweenMax.to(itemInfo, 2, {transform:'translateY(-100px)'})
        var mobileTween = TweenMax.to(itemMobile, 2, {transform:'translateY(-200px)'})
        var pcTween = TweenMax.to(itemPc, 2, {transform:'translateY(-100px)',onStart:function(){
            $(thisList).removeClass('active')
            console.log('del active')
        }})
        var list_scene = new ScrollMagic.Scene({triggerElement:this, offset:-50, triggerHook: 'onLeave',duration:450}).setTween(listTween)
        var info_scene = new ScrollMagic.Scene({triggerElement:this, offset:-50, triggerHook: 'onLeave',duration:450}).setTween(infoTween)
        var mobile_scene = new ScrollMagic.Scene({triggerElement:this, offset:-50, triggerHook: 'onLeave',duration:450}).setTween(mobileTween)
        var pc_scene = new ScrollMagic.Scene({triggerElement:this, offset:-50, triggerHook: 'onLeave',duration:450}).setTween(pcTween)

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
                TweenMax.to($(this).find('.card'), 0.5, {transform: "scale(1.2) translateY(0px)",x:0, y:0});
                TweenMax.to($(this).find('.shadow'), 0.5, {transform: "scale(1) translateY(30px)",x:0, y:0, marginTop:'-70px', boxShadow:'0 0 20px rgba(0,0,0,1)'});
                TweenMax.to($(this).find('.txtArea'), 0.5, {transform: "scale(1.05) translateY(0px)",x:0, y:0});
        })
        $(this).bind("mouseleave",function(){
            TweenMax.to($(this).find('.card'), 0.5, {transform: "scale(1) translateY(0px)",x:0, y:0});
            TweenMax.to($(this).find('.shadow'), 0.5, {transform: "scale(1) translateY(0px)",x:0, y:0, marginTop:'-100px', boxShadow:'0 0 0 rgba(0,0,0,0.5)'});
            TweenMax.to($(this).find('.txtArea'), 0.5, {transform: "scale(1) translateY(0px)",x:0, y:0});
            TweenMax.to($(this).find(".shine"), 1, {"background":"linear-gradient(315deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 100%)"})
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
    TweenMax.to($(this).find(".shine"), 0, {"background":"linear-gradient("+angle+"deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 100%)"})
    TweenMax.to($(this).find('.card'), 0.6, {rotationY:-rotationY*5, rotationX:-rotationX*5});
    TweenMax.to($(this).find('.shadow'), 0.6, {rotationY:-rotationY*5, rotationX:-rotationX*5, x:xx, y:-yy});
    TweenMax.to($(this).find('.txtArea'), 0.6, {x:-xx, y:yy});
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

        var txtTween = TweenMax.to(itemTxt, 2, {color:'#128dd4'})
        var areaTween = TweenMax.to(itemTxtarea, 2, {transform:"translateX(0%)",opacity:1})
        var itemListTween = TweenMax.to(itemListarea, 2, {transform:"perspective( 1000px ) rotateX(10deg) rotateZ(-40deg) translateY(-500px)  translateX(200px) scale(1.2)"})


        var txt_scene = new ScrollMagic.Scene({triggerElement:this, offset:50, duration:100}).setTween(txtTween)
        var area_scene = new ScrollMagic.Scene({triggerElement:this, offset:100, triggerHook: 'onEnter', duration:400}).setTween(areaTween)
        var template_scene = new ScrollMagic.Scene({triggerElement:this, offset:100, triggerHook: 'onEnter', duration:1000}).setTween(itemListTween)

        var responsive01 = $(thisList).find('.device01')
        var responsive02 = $(thisList).find('.device02')
        var responsive03 = $(thisList).find('.device03')
        var responsive04 = $(thisList).find('.device04')
        var responsive05 = $(thisList).find('.device05')

        var responsiveTween01 = TweenMax.from(responsive01, 2, {transform:"translateY(-350px)",opacity:1})
        var responsiveTween02 = TweenMax.from(responsive02, 2, {transform:"translateY(-450px) translateX(-100px)",opacity:1})
        var responsiveTween03 = TweenMax.from(responsive03, 2, {transform:"rotateZ(30deg) scale(1.5) translateY(250px) translateX(-50px)",opacity:1})
        var responsiveTween04 = TweenMax.from(responsive04, 2, {transform:"translateY(300px) translateX(100px)",opacity:1})
        var responsiveTween05 = TweenMax.from(responsive05, 2, {transform:"translateX(300px)",opacity:1,onComplete:function(){
//            $('.service_container.overWrap').addClass('over-view')
        }})

        var resoposive_scene01 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'300', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween01)
        var resoposive_scene02 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'300', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween02)
        var resoposive_scene03 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'300', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween03)
        var resoposive_scene04 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'300', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween04)
        var resoposive_scene05 = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'300', triggerHook: 'onEnter', duration:300}).setTween(responsiveTween05)

        var mobileTween = new TimelineMax();
        mobileTween
            .to(responsive03, 2, {transform:"rotateZ(30deg) translateY(280px) translateX(450px) scale(4)",opacity:1,onStart:function(){
            $('.service_container.overWrap').addClass('over-view')
        }})
            .to(responsive03.find('.mobile02'), 1, {transform:"rotateZ(5deg)  translateY(30px) translateX(-40px) scale(0.9)"})
            .to(responsive03.find('.mobile01'), 1, {transform:"rotateZ(15deg) translateY(55px) translateX(-70px) scale(0.7)"})

        var mobile_scene = new ScrollMagic.Scene({triggerElement:'.overWrap', offset:'0', triggerHook: 'onLeave', duration:450}).setTween(mobileTween)

        controller.addScene([
            txt_scene,
            area_scene,
            template_scene,
            resoposive_scene01,
            resoposive_scene02,
            resoposive_scene03,
            resoposive_scene04,
            resoposive_scene05,
            mobile_scene
        ]);

    })
 }
