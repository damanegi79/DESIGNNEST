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
    scrollTest()
})


/* Scroll Magic Test */
//var scrollFunction = true;
function scrollTest(){
//    scrollFunction = false;
    var controller = new ScrollMagic.Controller();

//    var tween = console.log('in')
    $('.itemList').each(function(){
        var thisList = this;
        var itemInfo = $(thisList).find('.item_info')
        var itemThumb = $(thisList).find('.item_thumb')
        var tween = TweenMax.from(this, 2, {transform:'rotateX(-40deg) scale(0.8)',opacity:1,ease:Linear.easeNone,onComplete:function(){
            TweenMax.to(itemInfo, 1, ({transform:'translateY(0px)',opacity:1, ease:Power1.easeOut}))
            TweenMax.to(itemThumb, 1, ({transform:'translateX(0px)', ease:Power1.easeOut}))
        }})
        new ScrollMagic.Scene({triggerElement:this, offset:100, triggerHook: 'onEnter',duration:450}) //,duration:100
            .setTween(tween)
            .addIndicators()
            .addTo(controller)
    })
    $('.itemList').each(function(){
        var thisList = this;
        //        console.log($('.item-02').position().top)
        var tween = TweenMax.to(this, 2, {transform:'rotateX(40deg) scale(0.8)',opacity:1, ease:Linear.easeNone})
        new ScrollMagic.Scene({triggerElement:this, offset:-100, triggerHook: 'onLeave',duration:450}) //,duration:100
            .setTween(tween)
            .addIndicators()
            .addTo(controller)
    })
//    $('.itemList').on("mouseover",function(){
//        var bg = $(this).find('.bg img')
//        var tween = TweenMax.to(bg, 5, {transform:'scale(1.1)', ease: Power1.easeOut})
//    })
//    $('.itemList').on("mouseleave",function(){
//        var bg = $(this).find('.bg img')
//        var tween = TweenMax.to(bg, 5, {transform:'scale(1)', ease: Power1.easeOut})
//    })
}
