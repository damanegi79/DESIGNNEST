$(document).ready(function(){
    //(function() {

    'use strict';
    // 'To actually be able to display anything with Three.js, we need three things:
    // A scene, a camera, and a renderer so we can render the scene with the camera.'
    // - http://threejs.org/docs/#Manual/Introduction/Creating_a_scene

    var scene, camera, renderer,  particleContainer;

    // I guess we need this stuff too
    var container, HEIGHT,
        WIDTH, fieldOfView, aspectRatio,
        nearPlane, farPlane,
        geometry, particleCount,
        i, h, color, size,
        materials = [],
        mouseX = 0,
        mouseY = 0,
        windowHalfX, windowHalfY, cameraZ,
        fogHex, fogDensity, parameters = {},
        parameterCount, particles;

    init();
    animate();

    function init() {

        HEIGHT = window.innerHeight;
        WIDTH = window.innerWidth;
        windowHalfX = WIDTH / 2;
        windowHalfY = HEIGHT / 2;

        fieldOfView = 75;
        aspectRatio = WIDTH / HEIGHT;
        nearPlane = 1;
        farPlane = 2000;

        /*     fieldOfView — Camera frustum vertical field of view.
    aspectRatio — Camera frustum aspect ratio.
    nearPlane — Camera frustum near plane.
    farPlane — Camera frustum far plane.

    - http://threejs.org/docs/#Reference/Cameras/PerspectiveCamera

    In geometry, a frustum (plural: frusta or frustums)
    is the portion of a solid (normally a cone or pyramid)
    that lies between two parallel planes cutting it. - wikipedia.        */

        cameraZ = farPlane / 3; /*    So, 1000? Yes! move on!    */
        fogHex = 0x333333; /* As black as your heart.    */
        fogDensity = 0.0007; /* So not terribly dense?    */

        camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
        camera.position.z = cameraZ;

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(fogHex, fogDensity);

        container = document.createElement('div');
        document.body.appendChild(container);
//        document.body.style.margin = 0;
//        document.body.style.overflow = 'hidden';
        $(container).addClass('global_bg');
        $(container).html('<div class="bg"></div><canvas id="canvasOverlay"></canvas><canvas id="canvasWave"></canvas>')

        geometry = new THREE.Geometry(); /*    NO ONE SAID ANYTHING ABOUT MATH! UGH!    */

        particleContainer = new THREE.Object3D();
        scene.add(particleContainer);

        particleCount = 1000; /* Leagues under the sea */

        /*    Hope you took your motion sickness pills;
    We're about to get loopy.    */

        for (i = 0; i < particleCount; i++) {

            var vertex = new THREE.Vector3();
            vertex.x = Math.random() * 2000 - 1000;
            vertex.y = Math.random() * 2000 - 1000;
            vertex.z = Math.random() * 2000 - 1000;

            geometry.vertices.push(vertex);
        }

        /*    We can't stop here, this is bat country!    */

        parameters = [
            [
                [1, 0, 0.8], 5
            ],
            [
                [0.72, 0,0.5], 4
            ],
            [
                [0.69, 0,0.5], 3
            ],
//            [
//                [0.72, 1, 0.3], 4
//            ],
            //            [
            //                [0.80, 1, 0.5], 1
            //            ]
        ];
        parameterCount = parameters.length;

        /*    I told you to take those motion sickness pills.
    Clean that vommit up, we're going again!    */

        for (i = 0; i < parameterCount; i++) {

            color = parameters[i][0];
            size = parameters[i][1];
//            var materials = new THREE.PointCloudMaterial( {
//                size: size,
//                map : THREE.ImageUtils.loadTexture("../img/particle.png"),
//                transparent: true
//            } );
            materials[i] = new THREE.PointCloudMaterial({
                size: size
            });

            particles = new THREE.PointCloud(geometry, materials[i]);

            particles.rotation.x = Math.random() * 6;
            particles.rotation.y = Math.random() * 6;
            particles.rotation.z = Math.random() * 6;
            particleContainer.add(particles);
//            scene.add(particles);
        }

        /*    If my calculations are correct, when this baby hits 88 miles per hour...
    you're gonna see some serious shit.    */

        renderer = new THREE.WebGLRenderer( { alpha: true }); /*    Rendererererers particles.    */
        renderer.setPixelRatio(window.devicePixelRatio); /*    Probably 1; unless you're fancy.    */
        renderer.setSize(WIDTH, HEIGHT); /*    Full screen baby Wooooo!    */
        renderer.domElement.id = 'particles'; /* 아이디값 부여 */
        container.appendChild(renderer.domElement); /* Let's add all this crazy junk to the page.    */
//        container.getElementById('particles').appendChild(renderer.domElement);
//        $('#particles').append(renderer.domElement);

        /* Event Listeners */

        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);

    }

    function animate() {
        requestAnimationFrame(animate);
        render();
    }

    function render() {
        TWEEN.update();
        var time = Date.now() * 0.00005;
        //        var time = Date.now() * 0.00005;

        camera.position.x += (mouseX - camera.position.x) * 0.05;
        camera.position.y += (-mouseY - camera.position.y) * 0.05;

        camera.lookAt(scene.position);

        for (i = 0; i < particleContainer.children.length; i++) {

            var object = particleContainer.children[i];

            if (object instanceof THREE.PointCloud) {

                object.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
            }
        }

        for (i = 0; i < materials.length; i++) {

            color = parameters[i][0];
            //            var op = 0;
            //            var flag = false;
            //            setInterval(function (){
            //                if(!flag){
            //                    if(op == 100){
            //                        op--;
            //                        flag = true;
            //                    }else if(op < 100){
            //                        op++;
            //                    }
            //                }
            //                else{
            //                    if(op == 0){
            //                        op++;
            //                        flag = false;
            //                    }else if(op > 0){
            //                        op--;
            //                    }
            //                }
            //            });
            //            h = (360 * (color[0] + time) % 360) / 360;
            //            h = (360 * (color[0] + time) % 360) / 360
            materials[i].color.setHSL(color[0], color[1], color[2]);
        }

        renderer.render(scene, camera);
    }

    function onDocumentMouseMove(e) {
        mouseX = e.clientX - windowHalfX;
        mouseY = e.clientY - windowHalfY;
    }

    /*    Mobile users?  I got your back homey    */

    function onDocumentTouchStart(e) {

        if (e.touches.length === 1) {

            e.preventDefault();
            mouseX = e.touches[0].pageX - windowHalfX;
            mouseY = e.touches[0].pageY - windowHalfY;
        }
    }

    function onDocumentTouchMove(e) {

        if (e.touches.length === 1) {

            e.preventDefault();
            mouseX = e.touches[0].pageX - windowHalfX;
            mouseY = e.touches[0].pageY - windowHalfY;
        }
    }

    function onWindowResize() {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }

    $('.button').on('click',function(){
        new TWEEN.Tween( particleContainer.rotation).to( {x:particleContainer.rotation.x-(90*Math.PI/180), y: scene.rotation.y, z:scene.rotation.z}, 2000 )
            .easing( TWEEN.Easing.Exponential.InOut)
//            .easing( TWEEN.Easing.Quartic.InOut )
            .start();
    })


});
