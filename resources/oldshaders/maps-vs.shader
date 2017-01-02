attribute vec3 aVertexPosition;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;


uniform sampler2D uSampler;

attribute vec2 aTextureCoord;
varying vec2 vTextureCoord;

void main(void) {
    vTextureCoord = aTextureCoord;
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
    //gl_PointSize = 1.0;
}
