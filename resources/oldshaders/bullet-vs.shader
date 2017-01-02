precision mediump float;

attribute vec3 aVertexPosition;
//attribute vec3 aPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;

//uniform mat3 uNMatrix;


void main(void) {
    vTextureCoord = aTextureCoord;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0); //* vec4(aPosition, 1.0);

}
