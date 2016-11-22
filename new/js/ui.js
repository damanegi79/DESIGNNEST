/*
 * Plugin intialization
 */

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
//            intro()
            introText()
            $('.rotate').click(function(){
                introText();
            })
            $('.reset').click(function(){
                introReset();
            })
        },
        afterLoad: function(index, nextIndex, direction){
            console.log(index)
            console.log(nextIndex)

        },
        onLeave: function (index, nextIndex, direction) {
            if (nextIndex == 1) {
                intro()
            }
            if (nextIndex == 2) {
                outro()
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
        var logo = new TimelineLite();
        var tit = $(".intro_contents");
        var sub_tit = $(".sub_title");
        logo.to(tit, 1.5,{marginTop:0, opacity:1})
        logo.to(tit, 2.5,{transform:'perspective(1000px) rotateX(20deg) rotateY(20deg)'})
        logo.to( tit, 1.0, {transform:'perspective(1000px) rotateX(0deg) rotateY(0deg) '})
        logo.from(sub_tit, 0.5, {opacity:0,transform:'perspective(1000px) rotateX(0deg) translateY(30px)'})

        function logoText() {
            var split = new TimelineLite;
            var mySplitText = $("#logo_txt span")
            var chars = mySplitText;
            split.staggerFrom(chars, 0.4, {opacity:0,scale:1, top:-80}, 0.3, "+=0");
        }
        logoText();

    }
    function introReset(){
        var tit = $(".intro_contents");
        TweenMax.to( tit, 2.5, {transform:'perspective(1000px) rotateX(15deg) rotateY(-20deg)'} );
    }
});
