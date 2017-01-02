uniform float uTime;
uniform vec3 uCenterPosition;
uniform vec3 uPosition;
uniform float uPointsize;


attribute vec3 aStartPosition;


varying float vLifetime;


void main(void) {

  gl_Position.xyz = aStartPosition;
  gl_Position.xyz += uPosition;
  gl_Position.w = 1.0;
  gl_PointSize = uPointsize;
}



