<!DOCTYPE html>
<html lang="ko">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="user-scalable=no,width=auto, initial-scale=1, maximum-scale=1, minimum-scale=1,minimal-ui" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="description" content="웹사이트 개발, 반응형 사이트 개발, 모바일 사이트 개발, 홈페이지 제작, 스크립트 개발, 웹퍼블리싱, 모바일웹 퍼블리싱, 반응형웹 퍼블리싱, 웹디자인"/>
        <meta name="keywords" content="웹퍼블리싱, 모바일웹 퍼블리싱, 반응형웹 퍼블리싱, 웹디자인, 홈페이지제작, 웹사이트 제작, 모바일 사이트, 반응형 사이트"/>
        <!-- Share -->
        <meta property="og:title" content="Designnest Interective Agency" />
        <meta property="og:description" content="웹퍼블리싱, 반응형웹 퍼브리싱, Front-UI 개발, 웹사이트 제작" />
        <meta property="og:image" content="" />
        <!-- Share -->
        <title>Designnest</title>
        <link rel="stylesheet" type="text/css" href="css/jquery.pagepiling.css" />
        <link rel="stylesheet" href="css/designnest.css" />
        <script src="js/jquery-1.9.1.min.js"></script>
        <script src="js/jquery.pagepiling.min.js"></script>
        <script src="js/TweenMax.min.js"></script>
<!--        <script src="js/animation.gsap.js"></script>-->
        <script src="js/vivus.js"></script>
        <script src="js/pathformer.js"></script>
        <script src="js/jquery.svg.es5.js"></script>
        <script src="js/jquery.inview.min.js"></script>
        <script src="js/ui_common.js" ></script>
        <script src="js/ui_index.js" ></script>

    </head>

    <body>
<!--        <p class="console"><input type="text" class="input01"><input type="text" class="input02"></p>-->
        <div id="intro"></div>
        <div class="browserCaution">
            본 사이트는 CSS3 3d transition과 SVG vector 이미지가 다수 포함되어 있는 관계로 <br>
            구글크롬, 파이어폭스, 사파리에 최적화 되어있습니다. <br>
            <b>Internet Explorer 브라우저(11포함)</b> 에서는 제대로 표현되지 않습니다.
            <p class="close"><button><i class="fa fa-times fa-2x" aria-hidden="true"></i></button></p>
        </div>
        <div class="menuOpen"><span class="menu"><button></button><object id="menuLogo" data="img/logo_svg.svg" type="image/svg+xml"></object></span> <span class="stats">HOME</span></div>
        <div class="menuClose"><button>close</button></div>
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

                        <nav class="gnb">
                            <p class="bar"></p>
                            <ul>
                                <li class="menu01"><a href="#"><span>HOME/LATEST WORK</span></a></li>
                                <li class="menu02"><a href="#"><span>OUR SERVICE</span></a></li>
                                <li class="menu03"><a href="#"><span>PORTFOLIO LIST</span></a></li>
                                <li class="menu04"><a href="#"><span>SITE DEVELOPEMENT</span></a></li>
                                <li class="menu05"><a href="#"><span>CONTACT US</span></a></li>
                            </ul>
                        </nav>
                        <div class="contact">
                            <p class="bar"></p>
<!--                            <p class="get">What can we do for you? <br>You can always get in touch!</p>-->
                            <p class="text"><span>웹 퍼블리싱, 프론트 UI 개발</span> 및 <span>웹사이트 제작</span></p>
                            <p class="text">궁금하신 사항은 언제든지 연락 주세요. <br> 친절히 안내해 드리겠습니다.</p>
                            <p class="mail"><a href="#" class="link">E-mail 문의하기</a></p>
                        </div>

                        <p class="copyright">Copyright © 2017 DESIGNNEST All rights reserved.</p>
                    </div>
                    <div class="bottom_quick">
                        <div class="bottom_con">
                            <a href="#">
                                <p class="background"><img src="img/img_menu01.jpg" alt=""></p>
                                <div class="text">
                                    <p class="title">WebSite</p>
                                    <p>템플릿 기반 웹사이트 제작</p>
                                    <p class="summery">Website Developement</p>
                                </div>
                                <div class="overay"></div>
                            </a>
                        </div>
                        <div class="bottom_con">
                            <a href="#">
                                <p class="background"><img src="img/img_menu02.jpg" alt=""></p>
                                <div class="text">
                                   <p class="title">Design</p>
                                    <p>디자인 템플릿 보기</p>
                                    <p>Hight-quality Template Product</p>
                                </div>
                                <div class="overay"></div>
                            </a>
                        </div>
                        <div class="bottom_con">
                            <a href="#">
                                <p class="background"><img src="img/img_menu03.jpg" alt=""></p>
                                <div class="text">
                                    <p class="title">CMS</p>
                                    <p>관리자 미리보기</p>
                                    <p class="summery">Preview CMS</p>
                                </div>
                                <div class="overay"></div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<!--
        <ul id="menu">
            <li data-menuanchor="page1" class="active"><a href="#page1">Page 1</a></li>
            <li data-menuanchor="page2"><a href="#page2">Page 2</a></li>
            <li data-menuanchor="page3"><a href="#page3">Page 3</a></li>
        </ul>
-->
    <div id="wrapper">
        <div id="pagepiling">
            <div class="section" id="section1">
                <div class="intro_wrap">
                    <div class="intro_contents">
                        <div id="gyro" class="logo_content">
                            <div class="logo_area">
                                <div class="logo"><object id="svg_logo" class="svg_logo" data="img/logo_svg.svg" type="image/svg+xml"></object></div>
                                <div class="logoText"><object id="svg_text" class="svg_text" data="img/designnest.svg" type="image/svg+xml"></object></div>
                                <p class="sub_title">interactive agency</p>
                            </div>

                        </div>
                    </div>

                </div>
                <div class="scrollDown"><object class="ico_scroll" data="img/scroll.svg" type="image/svg+xml"></object></div>
            </div>
            <div class="section pp-scrollable" id="section2">
                <div class="content">
                    <div class="header">
                       <div class="header_content">
                            <hgroup>
                                <h1>Latest Work</h1>

                                <h2 class="subTitle">Pile your sections one over another and access them scrolling or by URL!</h2>
                            </hgroup>
                        </div>
                    </div>
                    <article class="work_content_wrap project-01">

                        <div class="work_content">
                            <div class="container">
                                <div class="work_article">
                                   <div class="work_img_area">
                                        <div class="device_origin">
                                            <div class="device device-pos-1" data-role="moveTarget-1">
                                                <img id="img_device1" class="svg_device_color" src="img/iphone-black.svg" alt="">
                                                <div class="img_area img1"><img src="img/project/img_emart01.jpg" alt=""></div>
                                            </div>
                                            <div class="device device-pos-2" data-role="moveTarget-2">
                                                <img id="img_device2" class="svg_device_color" src="img/iphone-black.svg" alt="">
                                                <div class="img_area img2"><img src="img/project/img_emart02.jpg" alt=""></div>
                                            </div>
                                            <div class="device device-pos-3" data-role="moveTarget-3">
                                                <object id="svg_device" class="" data="img/iphone_frame.svg" type="image/svg+xml"></object>
                                                <img id="img_device3" class="svg_device_color" src="img/iphone-black.svg" alt="">
                                                <div class="img_area img3"><a href="#" class="img_zoom"><img src="img/project/img_emart03.jpg" alt=""></a></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="work_info">
                                        <p class="logo"><img src="img/project/img_logo_emart.png" alt=""></p>
                                        <h2>이마트 레지스트리</h2>
                                        <p class="work_sub_title">이마트 앱 전용으로 레지스트리라는 명칭으로 서비스 되는 상품선물 서비스</p>
                                        <dl>
                                            <dt>업무 분야</dt>
                                            <dd>Mobile Web Publishing</dd>
                                            <dd>Front UI Developement</dd>
                                        </dl>
                                        <dl>
                                            <dt>타겟 디바이스</dt>
                                            <dd>Mobile, Tablet</dd>
                                        </dl>
                                        <dl>
                                            <dt>사용 기술</dt>
                                            <dd>HTML, CSS, JAVASCRIPT, JQUERY, SVG, PLUGIN ETC..</dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                            <p class="shape clearfix"><img src="img/mask.svg" alt=""></p>
                            <p class="shape bottom clearfix"><img src="img/mask.svg" alt=""></p>
                            <div class="bg"><img src="img/project/emart-02.jpg" alt=""></div>
                        </div>

                    </article>
                    <article class="work_content_wrap black">

                        <div class="work_content">
                            <div class="container">
                                <div class="work_article">
                                    <div class="work_img_area pos-right">

                                    </div>
                                    <div class="work_info pos-left">
                                        <p class="logo"><img src="img/project/img_logo_samsung.png" alt=""></p>
                                        <h2>삼성 SSD <span class="small">Global / Japan</span></h2>
                                        <p class="work_sub_title">삼성 반도체의 SSD 제품군을 홍보하는 사이트로 영문, 일문 버전의 반응형 사이트 제작 </p>
                                        <dl>
                                            <dt>업무 분야</dt>
                                            <dd>Resposive Web Publishing</dd>
                                            <dd>Front UI Developement</dd>
                                        </dl>
                                        <dl>
                                            <dt>타겟 디바이스</dt>
                                            <dd>PC, Mobile, Tablet</dd>
                                        </dl>
                                        <dl>
                                            <dt>사용 기술</dt>
                                            <dd>HTML, CSS, JAVASCRIPT, JQUERY</dd>
                                        </dl>
                                    </div>

                                </div>

                            </div>
                            <div class="bg"><img src="img/project/bg_ssd.jpg" alt=""></div>
                        </div>
                    </article>
                    <article class="work_content_wrap black">

                        <div class="work_content">
                            <div class="container">
                                <div class="work_article">
                                    <div class="work_img_area pos-right">

                                    </div>
                                    <div class="work_info pos-left">
                                        <p class="logo"><img src="img/project/img_logo_samsung.png" alt=""></p>
                                        <h2>삼성 SSD <span class="small">Global / Japan</span></h2>
                                        <p class="work_sub_title">삼성 반도체의 SSD 제품군을 홍보하는 사이트로 영문, 일문 버전의 반응형 사이트 제작 </p>
                                        <dl>
                                            <dt>업무 분야</dt>
                                            <dd>Resposive Web Publishing</dd>
                                            <dd>Front UI Developement</dd>
                                        </dl>
                                        <dl>
                                            <dt>타겟 디바이스</dt>
                                            <dd>PC, Mobile, Tablet</dd>
                                        </dl>
                                        <dl>
                                            <dt>사용 기술</dt>
                                            <dd>HTML, CSS, JAVASCRIPT, JQUERY</dd>
                                        </dl>
                                    </div>

                                </div>

                            </div>
                            <div class="bg"><img src="img/project/bg_ssd.png" alt=""></div>
                        </div>
                    </article>
                </div>
            </div>
            <div class="section" id="section3">
                <div class="content_box">
                    <div class="intro">
                        <h1>OUR SERVICE</h1>
                        <p>Use the power of images</p>
                    </div>
                </div>
            </div>
            <div class="section" id="section4">
                <div class="content_box">
                    <div class="intro">
                        <h1>Just terrific!</h1>
                        <p>Use the power of images</p>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </body>
</html>
