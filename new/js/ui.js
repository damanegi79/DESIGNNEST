/*
 * Plugin intialization
 */

$(document).ready(function() {
    $('#pagepiling').pagepiling({
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3'],
        navigation: {
            'textColor': '#f2f2f2',
            'bulletsColor': '#ccc',
            'position': 'right',
            'tooltips': ['Page 1', 'Page 2', 'Page 3', 'Page 4']
        },
        onLeave: function (index, nextIndex, direction) {

            //fading out the txt of the leaving section
            $('.section').eq(index - 1).find('h1, p').fadeOut(700, 'easeInQuart');

            //fading in the text of the destination (in case it was fadedOut)
            $('.section').eq(nextIndex - 1).find('h1, p').fadeIn(700, 'easeInQuart');


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
});
