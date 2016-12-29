(function ($){

    $.validator.setDefaults({
        onkeyup:false,
        onclick:false,
        onfocusout:false,
        showErrors:function(errorMap, errorList)
        {
            if(this.numberOfInvalids())
            {
                alert(errorList[0].message);
                $(errorList[0].element).focus();
            }
        }
    });

    $.extend($.validator.messages,
             {
        required: "반드시 입력해야 합니다.",
        remote: "수정 바랍니다.",
        email: "이메일 주소를 올바로 입력하세요.",
        url: "URL을 올바로 입력하세요.",
        date: "날짜가 잘못 입력됐습니다.",
        dateISO: "ISO 형식에 맞는 날짜로 입력하세요.",
        number: "숫자만 입력하세요.",
        digits: "숫자(digits)만 입력하세요.",
        creditcard: "올바른 신용카드 번호를 입력하세요.",
        equalTo: "값이 서로 다릅니다.",
        accept: "승낙해 주세요.",
        maxlength: jQuery.validator.format("{0}글자 이상은 입력할 수 없습니다."),
        minlength: jQuery.validator.format("적어도 {0}글자는 입력해야 합니다."),
        rangelength: jQuery.validator.format("{0}글자 이상 {1}글자 이하로 입력해 주세요."),
        range: jQuery.validator.format("{0}에서 {1} 사이의 값을 입력하세요."),
        max: jQuery.validator.format("{0} 이하로 입력해 주세요."),
        min: jQuery.validator.format("{0} 이상으로 입력해 주세요.")
    });

    var velika = velika || function ()
    {
        var pageAr = ["home", "about", "services", "gallery1", "gallery2", "contact", "qna"];
        var currentPage = "";
        var oldPage = "";
        var firstFlag = true;
        var footer = null;
        var currentUrl = "";

        function loadFooter()
        {
            $.get("/html/footer.html?"+(Math.random()*999999999), function ( data )
                  {
                footer = $(data);
                loadPage();
            });
        }

        function loadPage()
        {
            var html = "";
            var url = currentPage.replace("#", "");
            $.get("/html/"+url+".html?"+(Math.random()*999999999), function ( data )
                  {
                var page = $(data);
                if(firstFlag)
                {
                    $("#content").append(page);
                    if(velika[url]) velika[url].init();
                    firstFlag = false;
                    oldPage = currentPage;
                    if(url != "home")
                    {
                        page.append(footer);
                    }
                }
                else
                {
                    var outPage = $("#content>article");
                    var arrow = getMotionArrow(url);
                    TweenMax.to(outPage, 0.8, {x:-($(window).width()*0.3)*arrow, ease:Cubic.easeInOut, force3D:true, onComplete:motionEnd});
                    TweenMax.to(page, 0, {x:$(window).width()*arrow, opacity:0});
                    TweenMax.to(page, 0.8, {x:0, opacity:1, force3D:true, ease:Cubic.easeInOut});
                    $("#content").append(page);
                    if(url != "home")
                    {
                        page.append(footer.clone());
                    }

                    function motionEnd()
                    {
                        if(url != "home") velika[url].init();
                        var oldUrl = oldPage.replace("#", "");
                        outPage.remove();
                        oldPage = currentPage;
                        if(velika[oldUrl]) velika[oldUrl].dispos();

                    }
                    if(url=="home") setTimeout(function (){velika[url].init();}, 100);

                }
                currentUrl = url;

            });
        }

        function getMotionArrow( url )
        {
            var prevIdx = pageAr.indexOf(currentUrl);
            var nextIdx = pageAr.indexOf(url);
            if(prevIdx < nextIdx) return 1;
            else                  return -1;
        }


        function initSound()
        {
            var savePlayer = $('#audio_area').html(); // Save player code
            $(".sound button.on").on("click",function(){
                $('#audio_area').html(savePlayer); // Restore it
                $(this).hide();
                $(".sound button.off").show();
            })
            $(".sound button.off").on("click",function(){
                $('#bgmSound').remove(); // Remove player from DOM
                $(this).hide();
                $(".sound button.on").show();
            })
        }

        $(function ()
          {
            currentPage = location.hash;

            if(currentPage == "") currentPage = "#home";
            $(window).on("hashchange", function ( e )
                         {
                currentPage = location.hash;
                loadPage();
            });


            $('#home').css({'height':($(window).height())+'px'});
            $(window).resize(function(){
                $('#home').css({'height':($(window).height())+'px'});
            });

            //Navigation
            $('ul.slimmenu').on('click',function(){
                var width = $(window).width();
                if ((width <= 800)){
                    $(this).slideToggle();
                }
            });


            $('ul.slimmenu').slimmenu(
                {
                    resizeWidth: '800',
                    collapserTitle: '',
                    easingEffect:'easeInOutQuint',
                    animSpeed:'medium',
                    indentChildren: true,
                    childrenIndenter: '&raquo;'
                });

            loadFooter();
            initSound();
        });

        $(window).load(function() {
            $("#status").fadeOut();
            $("#preloader").delay(350).fadeOut("slow");
        });




        return{

            gotoPage : function ( id )
            {
                location.href = "#"+id;
            },

            showGalleryModal : function ( id )
            {
                $.ajax({
                    type:"GET",
                    url:"/ajax/gallerydetail?id="+id,
                    success:function(data)
                    {
                        var item = data.galleryData.items;
                        if(item)
                        {
                            $("#gallery_wrap").find("h1").html(item.title);
                            $("#gallery_wrap").find(".gallery_contents").html(item.content);
                            $("#gallery_layer").show();
                            $("#gallery_overay").scrollTop(0);
                            TweenMax.to($("#gallery_overay"), 0, {y:$(window).height()});
                            TweenMax.to($("#gallery_overay"), 1, {y:0, force3D:true, ease:Expo.easeInOut});
                            TweenMax.to($("#gallery_layer .contents_close"), 0, {y:-200});
                            TweenMax.to($("#gallery_layer .contents_close"), 1, {delay:0.3, y:0, force3D:true, ease:Expo.easeInOut});
                        }
                        else
                        {
                            alert("게시물이 존재하지 않습니다.");
                        }
                    }
                });
            },
            hideGalleryModal : function ()
            {
                $("#gallery_layer").hide();
            }
        };
    };


    var GalleryList = GalleryList || function (category)
    {
        var galleryData;
        var listViewNum = 8;
        var listPage = 1;
        var listTotalPage;
        var gridList;
        var nextPath;
        var currentCate;
        var removeItems;
        var isFirst = true;


        function loadGalleryData(path)
        {
            $(".more_btn").hide();
            $.ajax({
                type:"GET",
                url:path+"&category="+category+"&listNum="+listViewNum,
                success:function(data)
                {
                    galleryData = data.galleryData;
                    listTotalPage = Math.ceil(galleryData.total/listViewNum);
                    nextPath = galleryData.next;
                    currentCate = galleryData.category;

                    if(galleryData.total == 0)
                    {
                        //데이터 없을 시
                    }
                    else
                    {
                        if(isFirst)
                        {
                            gridList = $("#galleryList").masonry({itemSelector:".portfolio-box", transitionDuration:0});
                            $(".more_btn").bind("click", function ( e )
                                                {
                                if(listPage < listTotalPage)
                                {
                                    listPage++;
                                    loadGalleryData(nextPath);
                                }
                            });
                        }
                        addGalleryList();
                    }

                    if(listPage >= listTotalPage)
                    {
                        $(".more_btn").hide();
                    }
                    else
                    {
                        $(".more_btn").show();
                    }
                }
            });
        }

        loadGalleryData("/ajax/gallerydata?page=1");

        function addGalleryList()
        {
            var items = new Array();
            for(var i = 0; i<listViewNum; i++)
            {
                if(i < galleryData.items.length)
                {
                    items.push({"id":galleryData.items[i].id,
                                "date":galleryData.items[i].date,
                                "category":galleryData.items[i].category,
                                "title":galleryData.items[i].title,
                                "subTitle":galleryData.items[i].subTitle,
                                "thumbPath":galleryData.items[i].thumbPath
                               });
                }
            }

            var itemTmpl = $("#galleryListTemp").tmpl(items);

            $(itemTmpl).each(function (i)
                             {
                gridList.append($(this)).masonry('appended', $(this));
            });

            gridList.imagesLoaded().progress( function()
                                             {
                gridList.masonry({columnWidth:".portfolio-box"});
            });
        }

        return{

        };

    }


    // 홈 클래스
    velika.home = (function ()
                   {
        var timer;
        var selectNum = 0;


        function setMainVisual()
        {
            $(".rotator > div:gt(0)").hide();
            TweenMax.to($(".rotator > div").eq(0).find(">div"), 1, {delay:4.5, opacity:0});
            TweenMax.to($(".main_visual > div > span"), 0, {scaleX:1.2, scaleY:1.2});
            $(".main_visual > div:gt(0)").hide();

            timer = setInterval(function ()
                                {
                changeVisual();
            }, 5000);
        }

        function changeVisual()
        {
            if(selectNum == $('.main_visual > div').length) selectNum = 0;
            var outTarget = $('.main_visual > div').eq(selectNum);
            var inTarget = outTarget.next();
            if(inTarget.length == 0) inTarget = $('.main_visual > div').eq(0);
            var inType = inTarget.attr("data-animation");
            outTarget.show().css({"z-index":0});
            inTarget.show().css({"z-index":1, opacity:0});

            switch(inType)
            {
                case "scaleDown" :
                    TweenMax.to(inTarget, 0, {scaleX:1.1, scaleY:1.1});
                    TweenMax.to(inTarget, 4.95, {scaleX:1, scaleY:1, force3D:true, onComplete:motionEnd});
                    break;
                case "scaleUp" :
                    TweenMax.to(inTarget, 0, {scaleX:0.9, scaleY:0.9});
                    TweenMax.to(inTarget, 4.95, {scaleX:1, scaleY:1, force3D:true, onComplete:motionEnd});
                    break;
                case "moveLeft" :
                    TweenMax.to(inTarget, 0, {x:-$(window).width()*0.1});
                    TweenMax.to(inTarget, 4.95, {x:0, force3D:true, onComplete:motionEnd});
                    break;
                case "moveRight" :
                    TweenMax.to(inTarget, 0, {x:$(window).width()*0.1});
                    TweenMax.to(inTarget, 4.95, {x:0, force3D:true, onComplete:motionEnd});
                    break;
                case "moveDown" :
                    TweenMax.to(inTarget, 0, {y:-$(window).height()*0.1});
                    TweenMax.to(inTarget, 4.95, {y:0, force3D:true, onComplete:motionEnd});
                    break;
                case "moveUp" :
                    TweenMax.to(inTarget, 0, {y:$(window).height()*0.1});
                    TweenMax.to(inTarget, 4.95, {y:0, force3D:true, onComplete:motionEnd});
                    break;
            }

            TweenMax.to(inTarget, 2, {opacity:1});

            var typo = $(".rotator > div").eq(selectNum).next();
            if(typo.length == 0) typo = $('.rotator > div').eq(0);
            typo.show()
            typo.find(">div").css({opacity:0});
            var typoType = typo.attr("data-animation");
            switch(typoType)
            {
                case "scaleDown" :
                    TweenMax.to(typo.find(">div"), 0, {scaleX:1.2, scaleY:1.2});
                    TweenMax.to(typo.find(">div"), 4, {scaleX:1, scaleY:1});
                    break;
                case "scaleUp" :
                    TweenMax.to(typo.find(">div"), 0, {scaleX:0.8, scaleY:0.8});
                    TweenMax.to(typo.find(">div"), 4, {scaleX:1, scaleY:1});
                    break;
                case "moveLeft" :
                    TweenMax.to(typo.find(">div"), 0, {x:-$(window).width()*0.1});
                    TweenMax.to(typo.find(">div"), 4, {x:0});
                    break;
                case "moveRight" :
                    TweenMax.to(typo.find(">div"), 0, {x:$(window).width()*0.1});
                    TweenMax.to(typo.find(">div"), 4, {x:0});
                    break;
                case "moveDown" :
                    TweenMax.to(typo.find(">div"), 0, {y:-$(window).height()*0.1});
                    TweenMax.to(typo.find(">div"), 4, {y:0});
                    break;
                case "moveUp" :
                    TweenMax.to(typo.find(">div"), 0, {y:$(window).height()*0.1});
                    TweenMax.to(typo.find(">div"), 4, {y:0});
                    break;
            }
            TweenMax.to(typo.find(">div"), 2, {delay:0.8, opacity:1});
            TweenMax.to(typo.find(">div"), 0.5, {delay:4.5, opacity:0});


            function motionEnd()
            {
                outTarget.hide();
                typo.hide();
                selectNum++;
            }
        }


        return{
            init : function ()
            {
                setMainVisual();
            },
            dispos : function ()
            {
                clearInterval(timer);
            }
        };
    })();


    // about 클래스
    velika.about = (function ()
                    {

        return {

            init : function ()
            {
                $("#owl-about").owlCarousel({

                    navigation : false,
                    singleItem:true,
                    autoPlay:6000,
                    transitionStyle: "fade",
                    addClassActive: true,
                });

                $("#owl-family").owlCarousel({
                    itemsCustom : [[0, 2],[450, 2],[600, 3],[700, 4],[900, 7]],
                    navigation : false
                });
            },

            dispos : function ()
            {
                $("#owl-about").trigger('remove.owl.carousel', 0);
                $("#owl-family").trigger('remove.owl.carousel', 0);
            }
        }
    })();


    // service 클래스
    velika.service = (function ()
                      {
        return {

            init : function ()
            {

            },

            dispos : function ()
            {

            }
        }
    })();

    // gallery1 클래스
    velika.gallery1 = (function ()
                       {
        var gallery;

        return {

            init : function ()
            {
                gallery = new GalleryList(1);
            },

            dispos : function ()
            {

            }
        }
    })();

    // gallery2 클래스
    velika.gallery2 = (function ()
                       {
        return {

            init : function ()
            {
                gallery = new GalleryList(2);
            },

            dispos : function ()
            {

            }
        }
    })();

    // contact 클래스
    velika.contact = (function ()
                      {

        function initGmap()
        {
            var Y_point            = 37.4885180;        // Y 좌표
            var X_point            = 126.9971806;        // X 좌표
            var zoomLevel        = 18;                        // 지도의 확대 레벨 : 숫자가 클수록 확대정도가 큼
            var markerTitle        = "벨리카";                // 현재 위치 마커에 마우스를 오버을때 나타나는 정보

            var myLatlng = new google.maps.LatLng(Y_point, X_point);
            var mapOptions = {
                zoom: zoomLevel,
                center: myLatlng,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map(document.getElementById('map'), mapOptions);

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: markerTitle
            });

            var infowindow = new google.maps.InfoWindow({
                maxWidth: 300
            });

            google.maps.event.addListener(marker, 'click', function() {
                //infowindow.open(map, marker);
            });
        }


        return {

            init : function ()
            {
                initGmap();
            },

            dispos : function ()
            {

            }
        }
    })();

    // qna 클래스
    velika.qna = (function ()
                  {

        return {

            init : function ()
            {
                $("#mailForm").validate({
                    rules:{
                        qna_title:"required",
                        qna_name:"required",
                        qna_email:{required: true, email: true},
                        qna_phone:"required",
                        qna_desc:"required"
                    },
                    messages: {
                        qna_title : "제목을 입력해 주세요.",
                        qna_name : "이름을 입력해 주세요.",
                        qna_email: "형식에 맞는 이메일을 입력해 주세요.",
                        qna_phone:"연락처를 입력해 주세요.",
                        qna_desc:"내용을 입력해 주세요."
                    },
                    submitHandler: function(form)
                    {
                        $("#mailForm").submit();
                    }
                });
            },

            dispos : function ()
            {

            }
        }
    })();



    window.Velika = velika;

})(jQuery);

var velika = new Velika();
