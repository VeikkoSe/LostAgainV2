//uniform mat4 uPMatrix;
//uniform vec3 uPosition;

attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;

varying vec2 vTextureCoord;

void main(void) {

// convert from 0->1 to 0->2
   vec3 zeroToTwo = aVertexPosition * 2.0;

   // convert from 0->2 to -1->+1 (clipspace)
   vec3 clipSpace = vec3(zeroToTwo.x - 1.0,zeroToTwo.y - 1.0,zeroToTwo.z - 1.0);



  gl_Position = vec4(clipSpace,1.0);
    vTextureCoord = aTextureCoord;
}



