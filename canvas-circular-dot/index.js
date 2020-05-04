var canvas = document.createElement( 'canvas' ),
    ctx = canvas.getContext( '2d' ),
    size = 300,
    padding = size * 0.1,
    size1_3 = size / 3,
    size2_3 = size1_3 * 2,
    PI = Math.PI,
    HALFPI = PI / 2,
    TWOPI = PI * 2,
    points = [
      { 
        cx: size1_3, 
        cy: size1_3,
        angle: 0
      },
      { 
        cx: size2_3,
        cy: size1_3,
        angle: HALFPI
      },
      { 
        cx: size2_3,
        cy: size2_3,
        angle: PI
      },
      { 
        cx: size1_3,
        cy: size2_3,
        angle: HALFPI * 3
      }
    ],
    lineColor = '#333';
    pointColor = '#212120';

function loop() {
  requestAnimationFrame( loop );
  ctx.clearRect( -padding, -padding, size + padding * 2, size + padding * 2 );
  
  var i = points.length;
  ctx.strokeStyle = lineColor;
  while( i-- ) {
    var p = points[ i ];
    p.angle += i % 2 == 0 ? 0.05 : -0.05;
    p.x = p.cx + Math.cos( p.angle ) * size1_3,
    p.y = p.cy + Math.sin( p.angle ) * size1_3;
    ctx.beginPath();
    ctx.arc( p.cx, p.cy, size1_3, 0, TWOPI );
    ctx.stroke();
  }
  
  i = points.length;
  ctx.beginPath();
  while( i-- ) {
    var p = points[ i ];
    ctx.moveTo( p.cx, p.cy );
    ctx.lineTo( p.x, p.y );
  }
  ctx.stroke();
  
  i = points.length;
  ctx.beginPath();
  while( i-- ) {
    if( i == 0 ) {
      ctx.closePath();
    } else {
      var p1 = points[ i ],
          p2 = points[ i - 1 ];
      if( i == points.length - 1 ) {
        ctx.moveTo( p1.x, p1.y );
        ctx.lineTo( p2.x, p2.y );
      } else {
        ctx.lineTo( p2.x, p2.y );
      }
    }
  }
  ctx.stroke();
  
  i = points.length;
  ctx.fillStyle = pointColor;
  ctx.beginPath();
  while( i-- ) {
    var p = points[ i ];
    ctx.moveTo( p.x, p.y );
    ctx.arc( p.x, p.y, size * 0.02, 0, TWOPI );
  }
  ctx.fill();
}

canvas.width = size + padding * 2;
canvas.height = size + padding * 2;
ctx.translate( padding, padding );
document.body.appendChild( canvas );
loop();
