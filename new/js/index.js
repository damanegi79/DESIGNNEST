

function Main () {

  // ----------------------------------------
  // Particle
  // ----------------------------------------

  function Particle( x, y, radius ) {
    this.init( x, y, radius );
  }

  Particle.prototype = {

    points: [],

    init: function( x, y, radius ) {

      this.alive = true;

      this.radius = radius || 10;
      this.wander = 0.15;
      this.theta = random( TWO_PI );
      this.drag = 0.92;
      this.color = '#fff';

      this.x = x || 0.0;
      this.y = y || 0.0;

      this.vx = 0.0;
      this.vy = 0.0;

    },

    move: function() {
      //this.points.push( {x: this.x, y: this.y } );

      this.x += this.vx;
      this.y += this.vy;

      this.vx *= this.drag;
      this.vy *= this.drag;

      this.theta += random( -0.5, 0.5 ) * this.wander;
      this.vx += sin( this.theta ) * 0.1;
      this.vy += cos( this.theta ) * 0.1;

      this.radius *= 0.96;
      this.alive = this.radius > 0.1;
    },

    draw: function( ctx ) {
      ctx.beginPath()
      ctx.arc( this.x, this.y, this.radius, 0, TWO_PI );
      ctx.fillStyle = this.color;
      ctx.strokeStyle = 'transparent';//this.color;
      ctx.fill();
      ctx.stroke();
    }
  };

  // ----------------------------------------
  // Example
  // ----------------------------------------

  var MAX_PARTICLES = 300;
  var COLORS = [
    'hsla(100,30%,60%,0.1)',
    'hsla(120,90%,80%,0.9)',
    'hsla(114,30%,60%,0.5)',
    'hsla(109,90%,40%,0.1)',
    'hsla(112,50%,60%,0.5)',
    'hsla(122,30%,20%,0.1)',
    'hsla(112,30%,10%,0.1)',
    'hsla(118,30%,100%,0.8)',
    'hsla(102,30%,100%,0.2)',
    'hsla(112,60%,60%,0.5)'
  ];
  var MODES = [
    'multiply',
    'lighten'
  ];

  var particles = [];
  var pool = [];

  var system = Sketch.create({
    autoclear: false,
    container: document.getElementById( 'container' )
  });

  var _currentColor = random( COLORS );

  function changeColors () {
    _currentColor = random( COLORS );
    system.globalCompositeOperation = random( MODES );
    setTimeout( changeColors, 1000 );
  }
  changeColors();

  function limit( _min, _max, _test ) {
    if ( _test < _min ) return _min;
    if ( _test > _max ) return _max;
    return _test;
  }

  system.setup = function() {

    // Set off some initial particles.
    var i, x, y;

    for ( i = 0; i < 20; i++ ) {
      x = ( system.width * 0.5 ) + random( -10, 100 );
      y = ( system.height * 0.5 ) + random( -10, 100 );
      system.spawn( x, y );
    }
    system.autowander();
  };

  system.spawn = function( x, y ) {

    if ( particles.length >= MAX_PARTICLES )
      pool.push( particles.shift() );

    particle = pool.length ? pool.pop() : new Particle();
    particle.init( x, y, random( 5, 30 ) );

    particle.wander = random( 5.0, 10.0 );
    particle.color = _currentColor;
    particle.drag = random( 0.5, 0.99 );

    theta = random( TWO_PI );
    force = random( 2, 8 );

    particle.vx = sin( theta ) * force;
    particle.vy = cos( theta ) * force;

    particles.push( particle );
  };

  system.update = function() {

    var i, particle;

    for ( i = particles.length - 1; i >= 0; i-- ) {

      particle = particles[i];

      if ( particle.alive ) particle.move();
      else pool.push( particles.splice( i, 1 )[0] );
    }
  };

  system.draw = function() {

    //system.globalCompositeOperation  = 'lighter';
    //system.globalCompositeOperation  = 'darker';

    for ( var i = particles.length - 1; i >= 0; i-- ) {
      particles[i].draw( system );
    }
  };
  system.fade = function () {
        ctx.fillStyle = 'rgba(255,255,255,0.03)';
        ctx.fill();
  }

  system.mousemove = function() {

    var particle, theta, force, touch, max, i, j, n;

    for ( i = 0, n = system.touches.length; i < n; i++ ) {

      touch = system.touches[i], max = random( 1, 4 );
      for ( j = 0; j < max; j++ ) {
        system.spawn( touch.x, touch.y );
      }

    }
  };

  system.autowander = function () {
      var wanderpos = { x: Math.round( system.width/2 ), y: Math.round( system.height/2 ) };
      TweenMax.ticker.addEventListener('tick', function () {
        var j, max = random( 1, 4 );
          for ( j = 0; j < max; j++ ) {
            system.spawn( wanderpos.x, wanderpos.y );
          }
      });
      system.newautowander(wanderpos);
  }
  system.newautowander = function ( wanderpos ) {
    var _wanderdist = 300;
    var _x = limit( 0, system.width, wanderpos.x + Math.round( (Math.random()*_wanderdist*2)-_wanderdist ) );
    var _y = limit( 0, system.height, wanderpos.y + Math.round( (Math.random()*_wanderdist*2)-_wanderdist ) );
      TweenMax.to( wanderpos, (Math.round( (Math.random()+0.2) * 100 ) / 100), {
          x: _x,
          y: _y,
          onComplete: system.newautowander,
          onCompleteParams: [ wanderpos ]
      });
      console.log('draw')
  }

};
