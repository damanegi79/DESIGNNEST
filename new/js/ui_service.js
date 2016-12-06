"use strict";

$(document).ready(function() {
    $("body").niceScroll({
        cursorcolor: "#424242", // change cursor color in hex
        cursoropacitymin: 1, // change opacity when cursor is inactive (scrollabar "hidden" state), range from 1 to 0
        cursoropacitymax: 1, // change opacity when cursor is active (scrollabar "visible" state), range from 1 to 0
        cursorwidth: "5px", // cursor width in pixel (you can also write "5px")
        cursorborder: "1px solid #fff", // css definition for cursor border
        cursorborderradius: "5px", // border radius in pixel for cursor
        scrollspeed: 100,
        mousescrollstep: 80,
    });
    scroll3d()
//    axisPortfolio()
})

function scroll3d(){
    var controller = new ScrollMagic.Controller();
    $('.itemList').each(function(){
        var thisList = this;
        var itemInfo = $(thisList).find('.item_info')
        var itemMobile = $(thisList).find('.mobile')
        var itemPc = $(thisList).find('.pc')
        var tween = TweenMax.from(this, 2, {transform:'rotateX(-40deg) scale(0.8)',opacity:1,ease:Linear.easeNone,onComplete:function(){
            TweenMax.to(itemInfo, 1, ({transform:'translateY(0px)',opacity:1, ease:Power1.easeOut}))
            TweenMax.to(itemPc, 1, ({transform:'translateX(0px)', ease:Power1.easeOut}))
            TweenMax.to(itemMobile, 1, ({transform:'translateX(0px)', ease:Power1.easeOut,delay:0.5,onComplete:function(){
                $(thisList).addClass('active')
                $(thisList).bind("mouseenter",function(){
                    if($(this).hasClass('active')){
                        console.log('in')
                        $(this).bind("mousemove",moveFolio)
                    }
                })
                $(thisList).bind("mouseleave",function(){
                    if($(this).hasClass('active')){
                        TweenMax.to($(thisList).find('[data-role="moveTarget-1"]'), 0.5, {transform: "translateZ(0)",x:0, y:0});
                        TweenMax.to($(thisList).find('[data-role="moveTarget-2"]'), 0.5, {transform: "translateZ(0)",x:0, y:0});
                        TweenMax.to($(thisList).find('[data-role="moveTarget-3"]'), 0.5, {transform: "translateZ(0)",x:0, y:0});
                        console.log('out')
                        $(this).unbind("mousemove",moveFolio)
                    }
                })
            }}))
//


        }})
        new ScrollMagic.Scene({triggerElement:this, offset:100, triggerHook: 'onEnter',duration:350}) //,duration:100
            .setTween(tween)
            .addTo(controller)

    })
    $('.itemList').each(function(){
        var thisList = this;
        //        console.log($('.item-02').position().top)
        var tween = TweenMax.to(this, 2, {transform:'rotateX(40deg) scale(0.8)',opacity:1, ease:Linear.easeNone})
        new ScrollMagic.Scene({triggerElement:this, offset:-50, triggerHook: 'onLeave',duration:450}) //,duration:100
            .setTween(tween)
            .addTo(controller)

    })




}
function axisPortfolio(){
    $('.itemList').each(function(){
        var thisList = this;
        $(this).bind("mouseenter",function(){
            if($(this).hasClass('active')){
                console.log('have')
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
