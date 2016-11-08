/*
 * Plugin intialization
 */

$(function ()
  {
    $(".article").bind("mouseover", function (  )
                         {
        TweenMax.to($(".article"), 0.6, {transform: "translateZ(0px)"});
//        TweenMax.to($(".text"), 0.6, {transform: "translateZ(50px)",textShadow: "10px 10px 5px rgba(0,0,0,1)"});
        TweenMax.to($(".shadow"), 0.6, {transform: "translateZ(50px)"});
//        TweenMax.to($(".article h1"), 0.6, {transform: "translateZ(50px)"});
        TweenMax.to($(".line"), 0.6, {left:"50px",right:"50px",bottom:"50px",top:"50px",borderColor:"rgba(255,255,255,1)"});
        TweenMax.to($(".line_shadow"), 0.6, {left:"70px",right:"70px",bottom:"60px",top:"60px"});
        TweenMax.to($(".article .top"), 0.6, {overflow:"visible"});
        $(".article").bind("mousemove", moveCard);
    });


    $(".article").bind("mouseout", function (  )
                         {
        TweenMax.to($(".article"), 0.3, {transform: "translateZ(0)"});
        TweenMax.to($(".shadow"), 0.3, {transform: "translateZ(0)",background:"linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 60%)"});
        TweenMax.to($(".line"), 0.3, {x:0, y:0,left:"0px",right:"0px",bottom:"0px",top:"0px",borderColor:"rgba(255,255,255,0.5)"});
        TweenMax.to($(".line_shadow"), 0.3, {x:0, y:0,left:"0px",right:"0px",bottom:"0px",top:"0px"});
        TweenMax.to($(".article h1"), 0.3, {x:0, y:0});
        TweenMax.to($(".article .top"), 0.6, {overflow:"hidden"});
//        TweenMax.to($(".text"), 0.6, {transform: "translateZ(0px)", textShadow:"0"});
        //TweenMax.to($(".line"), 0.6, {transform: "translateZ(0px)"});
        $(".article").unbind("mousemove", moveCard);
    });

    function moveCard( e )
    {
        if(motionFlag)
        {
            return;
        }
        var sectionNum  = $('.section.active').index();
        var winHeight = $(window).height()
        var scrollY = sectionNum * winHeight;
//        transform: translate3d(0px, -696.697px, 0px);
        var pageX = e.pageX - $(".article").offset().left;
        var pageY = e.pageY - $(".article").offset().top;

        pageX = pageX - ($(".article").width()/2);
        pageY = pageY - ($(".article").height()/2)-scrollY;

        var percentX = pageX / ($(".article").width()/2);
        var percentY = pageY / ($(".article").height()/2);

        var rotationY = -5*percentX;
        var rotationX = 5*percentY;

        TweenMax.to($(".article"), 0.6, {rotationY:rotationY, rotationX:rotationX});
        TweenMax.to($(".shadow"), 0.6, {rotationY:rotationY, rotationX:rotationX});
//        TweenMax.to($(".text"), 0.6, {rotationY:rotationY, rotationX:rotationX});
        TweenMax.to($(".line"), 0.6, {x:rotationY*10, y:-rotationX*10});
//        TweenMax.to($(".line_shadow"), 0.6, {x:rotationY*5, y:-rotationX*5});
        TweenMax.to($(".article h1"), 0.6, {x:rotationY*10, y:-rotationX*10});

        var xx = 20*percentX;
        var yy = 2*percentY;

//        TweenMax.to($(".text"), 0.6, {x:xx, y:yy, textShadow: -(xx*0.5)+"px "+(-yy*2)+"px 5px rgba(0,0,0,0.8)"});

        var angle = -getAngle(0, 0, pageX, pageY);
        console.log(scrollY)

        TweenMax.to($(".shadow"), 0, {"background":"linear-gradient("+angle+"deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 100%)"})


    }


    function getAngle  (x1, y1, x2, y2)
    {
        var dx = x2 - x1;
        var dy = y2 - y1;
        var rad = Math.atan2(dx, dy);
        return (rad*180)/Math.PI;
    }


    $(window).bind("mousemove")


});
$(document).ready(function(){

})
