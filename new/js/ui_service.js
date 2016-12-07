"use strict";

$(document).ready(function() {
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
//    axisPortfolio()
})

function headerMotion(){
    var controller = new ScrollMagic.Controller();
    var header = $('#transition_wrapper .header .contents')
    var headerTween = TweenMax.to(header, 2, {transform:'translateY(50vh) scale(0.7)',opacity:0.5})
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
function axisPortfolio(){
    $('.itemList').each(function(){
        var thisList = this;
        $(this).bind("mouseover",function(){
            console.log('in')
            if($(this).hasClass('active')){
                $(this).bind("mousemove",moveFolio)

            }
        })
        $(this).bind("mouseleave",function(){
            if($(this).hasClass('active')){
                TweenMax.to($(this).find('[data-role="moveTarget-1"]'), 0.5, {transform: "translateZ(0)",x:0, y:0});
                TweenMax.to($(this).find('[data-role="moveTarget-2"]'), 0.5, {transform: "translateZ(0)",x:0, y:0});
                TweenMax.to($(this).find('[data-role="moveTarget-3"]'), 0.5, {transform: "translateZ(0)",x:0, y:0});
                console.log('out')
                $(this).unbind("mousemove",moveFolio)
            }
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
    var xx = -10*percentX;
    var yy = -10*percentY;
    TweenMax.to($(this).find('[data-role="moveTarget-1"]'), 0.2, {x:xx,y:yy*0.5});
    TweenMax.to($(this).find('[data-role="moveTarget-2"]'), 0.2, {x:xx*2,y:yy*1.5});
    TweenMax.to($(this).find('[data-role="moveTarget-3"]'), 0.2, {x:xx*4,y:yy*2.5});
}
