<?php include 'include/check_mobile.php'; ?>
<?php $mobile_path = $isMoblie ? "_mob" : "" ?>
<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="user-scalable=no,width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="웹퍼블리싱, 홈페이지 제작, 웹사이트 제작, 반응형 웹사이트 제작, 스크립트 개발"/>
        <meta name="keywords" content="웹사이트 개발, 반응형 사이트 개발, 모바일 사이트 개발, 홈페이지 제작, 스크립트 개발, 웹퍼블리싱, 모바일웹 퍼블리싱, 반응형웹 퍼블리싱, 웹디자인"/>
        <!-- Share -->
        <meta property="og:title" content="Designnest - Interective Agency" />
        <meta property="og:description" content="웹퍼블리싱, 홈페이지 제작, 웹사이트 제작, 반응형 웹사이트 제작, 스크립트 개발" />
        <meta property="og:image" content="http://designnest.net/img/img-site.png" />
        <meta property="og:url" content="http://www.designnest.net">
        <meta property="og:image:width" content="660" />
        <meta property="og:image:height" content="380" />
        <meta name="naver-site-verification" content="9acc92bdb6ce864da9bfc1320dc639592e26ed32"/>
        <!-- Share -->
        <title>Designnest</title>
        <link rel="canonical" href="http://www.designnest.net/index.html">
        <link rel="shortcut icon" href="img/favicon.ico">
        <link rel="stylesheet" href="/cms/app-data/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" href="/cms/app-data/css/style.css">
        <link href="/cms/app-data/plugins/rs-plugin-5/css/settings.css" rel="stylesheet">
        <link href="/cms/app-data/plugins/rs-plugin-5/css/layers.css" rel="stylesheet">
        <link href="/cms/app-data/plugins/rs-plugin-5/css/navigation.css" rel="stylesheet">
        <link rel="stylesheet" href="css/designnest<?= $mobile_path; ?>.css" />
        <script src="js/jquery-1.9.1.min.js"></script>
        <script type="text/javascript" src="/cms/app-data/bootstrap/js/bootstrap.min.js"></script>
        <script src="js/TweenMax.min.js"></script>
        <script src="js/CSSPlugin.min.js"></script>
        <script src="js/ScrollMagic.js"></script>
        <script src="js/animation.gsap.js"></script>
        <script src="js/vivus.js"></script>
        <script src="js/pathformer.js"></script>
        <script src="js/jquery.svg.es5.js"></script>
        <script src="js/jquery.nicescroll.min.js"></script>
        <script src="js/jquery.mousewheel.min.js"></script>
        <script src="js/jquery.inview.min.js"></script>
        <script src="js/jquery.validate.min.js"></script>
        <script src="js/sketch.min.js"></script>
        <script type="text/javascript" src="/cms/app-data/js/modernizr.js"></script>
        <script type="text/javascript" src="/cms/app-data/plugins/rs-plugin-5/js/jquery.themepunch.tools.min.js"></script>
        <script type="text/javascript" src="/cms/app-data/plugins/rs-plugin-5/js/jquery.themepunch.revolution.min.js"></script>
        <script src="js/ui_common<?= $mobile_path; ?>.js"></script>
    </head>

    <body>
        <div id="intro"></div>
        <div class="browserCaution">
            본 사이트는 CSS3 애니메이션과 필터, SVG 벡터 이미지가 다수 포함되어 있는 관계로 <br>
            구글크롬, 파이어폭스, 사파리에 최적화 되어있습니다. <br>
            <b>Internet Explorer 브라우저(11포함)</b> 에서는 제대로 표현되지 않습니다.
            <p class="close"><button><i class="fa fa-times fa-2x" aria-hidden="true"></i></button></p>
        </div>
        <div class="menuOpen"><span class="menu"><button></button><object id="menuLogo" data="img/logo_svg.svg" type="image/svg+xml"></object></span> <span class="stats">HOME</span></div>
        <div class="menuClose"><span class="closeBg"></span><button><i class="ti-close"></i></button></div>
        <div id="menu_wrap">
            <div class="menu_container">
                <div class="menu_contents">
                    <div class="top_content">
                        <header>
                            <p class="bar"></p>
                            <h1>DESIGNNEST</h1>
                            <ul>
                                <li>PC, Mobile, Responsive Web Publishing</li>
                                <li>Template Website Developement</li>
                                <li>Front Ui Developement</li>
                            </ul>
                        </header>

                        <nav id="nav" class="gnb">
                            <p class="bar"></p>
                            <ul>
                                <li class="menu01"><a href="#home"><span>HOME/LATEST WORK</span></a></li>
                                <li class="menu02"><a href="#service"><span>OUR SERVICE</span></a></li>
                                <li class="menu03"><a href="#portfolio"><span>PORTFOLIO LIST</span></a></li>
                                <li class="menu04"><a href="#developement"><span>SITE DEVELOPEMENT</span></a></li>
                                <li class="menu05"><a href="#contact"><span>CONTACT US</span></a></li>
                            </ul>
                        </nav>
                        <div class="contact">
                            <p class="bar"></p>
                            <p class="text"><span>웹 퍼블리싱, 프론트 UI 개발</span> 및 <span>웹사이트 제작</span></p>
                            <p class="text">궁금하신 사항은 언제든지 연락 주세요. <br> 친절히 안내해 드리겠습니다.</p>
                            <p class="mail"><a href="#contact" class="link">E-mail 문의하기</a></p>
                        </div>

                        <p class="copyright">Copyright © 2017 DESIGNNEST All rights reserved.</p>
                    </div>
                    <div class="bottom_quick">
                        <div class="bottom_con">
                            <a href="#developement">
                                <p class="background"><img src="img/img_menu01.jpg" alt=""></p>
                                <div class="text">
                                    <p class="title">Developement</p>
                                    <p>웹사이트 제작</p>
                                    <p class="summery">Website Developement</p>
                                </div>
                                <div class="overay"></div>
                            </a>
                        </div>
                        <div class="bottom_con">
                            <a href="#" class="ready">
                                <p class="background"><img src="img/img_menu02.jpg" alt=""></p>
                                <div class="text">
                                    <p class="title">Design</p>
                                    <p>디자인 템플릿 보기</p>
                                    <p class="summery">Design Preview</p>
                                </div>
                                <div class="overay"></div>
                            </a>
                        </div>
                        <div class="bottom_con">
                            <a href="#" class="ready">
                                <p class="background"><img src="img/img_menu03.jpg" alt=""></p>
                                <div class="text">
                                    <p class="title">Editor</p>
                                    <p>컨텐츠 에디터 미리보기</p>
                                    <p class="summery">Contents Editor</p>
                                </div>
                                <div class="overay"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="ajaxContainer"></div>
        <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                                    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

            ga('create', 'UA-90314175-1', 'auto');
            ga('send', 'pageview');

        </script>
        <script src="js/index.js"></script>
    </body>
</html>
