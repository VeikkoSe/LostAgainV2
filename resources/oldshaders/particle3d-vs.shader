uniform float uTime;
uniform vec3 uCenterPosition;
//uniform vec3 uPosition;
uniform float uPointsize;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

attribute vec3 aVertexPosition;


varying float vLifetime;


void main(void) {


  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition.x,aVertexPosition.y,aVertexPosition.z,1.0);
  gl_PointSize = uPointsize;
}



