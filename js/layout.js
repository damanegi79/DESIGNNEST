/*
 * Plugin intialization
 */

$(function (){
    'use strict';
    var ind = 0, old = 0, Items, k=0, footeractive=0;
    var isiPad = navigator.userAgent.match(/ipad/i) != null;
    function fullpage(e){
        if(k==0){
            k=1;
            setTimeout(function(){
                k=0;
            },1000)
            var evt = window.event || e
            var delta = evt.detail? evt.detail*(-120) : evt.wheelDelta
            if(delta>0){

                if(ind>0 && footeractive == 0){
                    ind--;
                    $(Items[ind]).removeClass('bottom').removeClass('top')
                    $(Items[old]).addClass('bottom')
                    old = ind;
                }else{
                    if(footeractive==1){
                        footeractive=0;
                        $('.full-page').removeClass('move-top')
                        $('.footer-section').removeClass('display')
                    }
                }

            } else{

                if(ind<Items.length-1){
                    ind++;
                    $(Items[ind]).removeClass('bottom').removeClass('top')
                    $(Items[old]).addClass('top')
                    old = ind;
                }else{
                    if(footeractive==0){
                        footeractive=1;
                        $('.full-page').addClass('move-top')
                        $('.footer-section').addClass('display')
                    }
                }
            }
        }
    }
    function setupFullpage(){
        Items = $('.full-page').find('.section')
    }
    $(window).load(function(){
        setupFullpage();

        if(!isiPad){

            var mousewheelevt = (/Firefox/i.test(navigator.userAgent))?"DOMMouseScroll" : "mousewheel"
            if(document.attachEvent)
                document.attachEvent("on"+mousewheelevt, fullpage)
            else if(document.addEventListener)
                document.addEventListener(mousewheelevt, fullpage ,false)

        }

    })
});
