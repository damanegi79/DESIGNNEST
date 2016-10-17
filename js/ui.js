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
        $(".article").bind("mousemove", moveCard);
    });


    $(".article").bind("mouseout", function (  )
                         {
        TweenMax.to($(".article"), 0.3, {transform: "translateZ(0)"});
        TweenMax.to($(".shadow"), 0.3, {transform: "translateZ(0)",background:"linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 60%)"});
//        TweenMax.to($(".text"), 0.6, {transform: "translateZ(0px)", textShadow:"0"});
        $(".article").unbind("mousemove", moveCard);
    });

    function moveCard( e )
    {
        var pageX = e.pageX - $(".article").offset().left;
        var pageY = e.pageY - $(".article").offset().top;

        pageX = pageX - ($(".article").width()/2);
        pageY = pageY - ($(".article").height()/2);

        var percentX = pageX / ($(".article").width()/2);
        var percentY = pageY / ($(".article").height()/2);

        var rotationY = -5*percentX;
        var rotationX = 5*percentY;

        TweenMax.to($(".article"), 0.6, {rotationY:rotationY, rotationX:rotationX});
        TweenMax.to($(".shadow"), 0.6, {rotationY:rotationY, rotationX:rotationX});
//        TweenMax.to($(".text"), 0.6, {rotationY:rotationY, rotationX:rotationX});

        var xx = 20*percentX;
        var yy = 2*percentY;

        TweenMax.to($(".text"), 0.6, {x:xx, y:yy, textShadow: -(xx*0.5)+"px "+(-yy*2)+"px 5px rgba(0,0,0,0.8)"});

        var angle = -getAngle(0, 0, pageX, pageY);


        TweenMax.to($(".shadow"), 0, {"background":"linear-gradient("+angle+"deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0) 100%)"})


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
