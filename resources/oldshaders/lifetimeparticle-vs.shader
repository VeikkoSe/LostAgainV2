  uniform float uTime;
  uniform vec3 uCenterPosition;

  attribute float aLifetime;
  attribute vec3 aStartPosition;
  attribute vec3 aEndPosition;

  varying float vLifetime;

  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;



  void main(void) {
    if (uTime <= aLifetime) {
      vec3 calcPos = aStartPosition + (uTime * aEndPosition);
      calcPos += uCenterPosition;

      //gl_Position.xyz = aStartPosition + (uTime * aEndPosition);
      //gl_Position.xyz += uCenterPosition;
      //gl_Position.w = 1.0;
      gl_Position = uPMatrix * uMVMatrix * vec4(calcPos,1.0);

    } else {
      gl_Position = vec4(-1000, -1000, 0, 0);
    }

    vLifetime = 1.0 - (uTime / aLifetime);
    vLifetime = clamp(vLifetime, 0.0, 1.0);
    gl_PointSize = (vLifetime * vLifetime) * 10.0;
  }



