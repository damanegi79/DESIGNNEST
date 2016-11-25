/*
 * Plugin intialization
 */
var motionFlag = false;

$(document).ready(function() {
    $('#pagepiling').pagepiling({
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3', 'page4'],
        navigation: {
            'textColor': '#f2f2f2',
            'bulletsColor': '#ccc',
            'position': 'right',
            'tooltips': ['Page 1', 'Page 2', 'Page 3', 'Page 4']
        },
        afterRender: function(index, nextIndex, direction){
            $('#intro').fadeOut(1000);
            setTimeout(function(){
                if($('#section1').hasClass('active')){
                    introText()
                    motionFlag = true;
                    console.log(motionFlag)
                }
            },1000)

        },
        afterLoad: function(index, nextIndex, direction){

            if (nextIndex == 1) {
                if(motionFlag){
                    console.log(motionFlag,nextIndex)
                    return;
                }
                else {
                    console.log(motionFlag,nextIndex)
                    introText()
                    motionFlag = true;

                }

            }
            console.log(motionFlag,nextIndex)
        },
        onLeave: function (index, nextIndex, direction) {
            if (nextIndex == 1) {
//                intro()
            }
            if (nextIndex == 2) {
//                outro()
            }

            //fading out the txt of the leaving section
//            $('.section').eq(index - 1).find('h1, p').fadeOut(700, 'easeInQuart');

            //fading in the text of the destination (in case it was fadedOut)
//            $('.section').eq(nextIndex - 1).find('h1, p').fadeIn(700, 'easeInQuart');


            //reaching our last section? The one with our normal site?
            if (nextIndex == 2) {
                $('#arrow').hide();

                //fading out navigation bullets
                $('#pp-nav').fadeOut();

                $('#section2').find('.content').animate({
                    top: '0%'
                }, 700, 'easeInQuart');
            }

            //leaving our last section? The one with our normal site?
            if (index == 2) {
                $('#arrow').show();

                //fadding in navigation bullets
                $('#pp-nav').fadeIn();

                $('#section2 .content').animate({
                    top: '100%'
                }, 700, 'easeInQuart');
            }
        },
    });
    function intro(){

    };
    function outro(){

    };
    function introText(){
        text_ani()
        var logo = new TimelineLite();
        var tit = $(".intro_contents");
        var sub_tit = $(".sub_title");
        logo.to(tit, 1.0,{marginTop:0, opacity:1})
        logo.to(tit, 2.5,{transform:'perspective(1000px) rotateX(20deg) rotateY(-20deg)'},1)
        logo.to(tit, 2.5,{transform:'perspective(1000px) rotateX(20deg) rotateY(20deg)'},3.5)
        logo.to( tit, 1.0, {transform:'perspective(1000px) rotateX(0deg) rotateY(0deg) '})
        logo.from(sub_tit, 0.5, {opacity:0,transform:'perspective(1000px) rotateX(0deg) translateY(30px)',onComplete:function(){
                                        axis()
                                        scrollfn()
                                        $("#svg_logo").addClass('logoChg')
                                        console.log('axis started')
                                    }

                                })
    }
    function logoText() {
        var split = new TimelineLite;
        var mySplitText = $("#logo_txt span")
        var chars = mySplitText;
        split.staggerFrom(chars, 0.4, {opacity:0,scale:1, top:-80}, 0.3, "+=0");
    }
    function introReset(){
        var tit = $(".intro_contents");
        TweenMax.to( tit, 2.5, {transform:'perspective(1000px) rotateX(15deg) rotateY(-20deg)'} );
    }
    function axis(){
        if($('#section1').hasClass('active')){
             $(".logo_content").bind("mousemove", moveLogo);
         }
//        $(".logo_content").bind("mouseover", function (){

//        });
    }
    function scrollfn(){
        var scrollDown = $(".scrollDown")
        var wheel = $(".scrollDown .ico_scroll");
        scrollDown.fadeIn(function(){
            TweenMax.to( wheel, 1, {transform: 'translateY(20px)',repeat:-1, yoyo:true} );
        });
    }
    function moveLogo(e)
    {
        var pageX = e.pageX - $(".intro_wrap").offset().left;
        var pageY = e.pageY - $(".intro_wrap").offset().top;
        pageX = pageX - ($(".intro_wrap").width()/2);
        pageY = pageY - ($(".intro_wrap").height()/2); //-scrollY
        var percentX = pageX / ($(".intro_wrap").width()/2);
        var percentY = pageY / ($(".intro_wrap").height()/2);
        var rotationY = -15*percentX;
        var rotationX = 15*percentY;
        TweenMax.to($(".intro_contents"), 0.6, {rotationY:rotationY, rotationX:rotationX,x:rotationY*2, y:-rotationX*2});
//        console.log(pageX,pageY,percentX,percentY)
//        console.log('play')
    }
    function text_ani(){


        var svg = $('#svg_logo').getSVG();
        var logopath = svg.find(".path");

        var textsvg = $('#svg_text').getSVG();
        var textpath = textsvg.find(".path");

        new Vivus('svg_logo',{duration: 200,type:'delayed'}, function (obj) {
            logopath.each(function(i){
                var self = this
                setTimeout(function(){
                    var logo = new TimelineLite();
                    logo.to(self, 0.3,{stroke:'none'})
                },i*200)
            })
        });
        setTimeout(function(){
            new Vivus('svg_text', {duration: 200,type:'delayed'}, function (obj) {
                textpath.each(function(i){
                    var self = this
                    setTimeout(function(){
                        var textlogo = new TimelineLite();
                        textlogo.to(self, 0.3,{stroke:'none'})
                    },i*200)
                })
            })
        },2000)


        setTimeout(function(){
            logopath.each(function(i){
                var self = this
                setTimeout(function(){
                    var logo = new TimelineLite();
                    logo.to(self, 0.5,{fill:'#128dd4'})
                    logo.to(self, 0.5,{fill:'#222'})
                    logo.to(self, 0.1,{stroke:'none'})
                },i*200)
            })
        },3000)
        setTimeout(function(){
            textpath.each(function(i){
                var self = this
                setTimeout(function(){
                    var textlogo = new TimelineLite();
                    textlogo.to(self, 1.0,{fill:'#128dd4'})
                    textlogo.to(self, 1.0,{fill:'#222'})
                    textlogo.to(self, 0.1,{stroke:'none'})
                },i*200)
            })
            TweenMax.to(logopath.eq(0), 4, {fill:'#128dd4'} );
        },4000)
    }


});

