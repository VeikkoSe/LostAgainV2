  precision mediump float;


varying vec2 vTextureCoord;
  uniform sampler2D uSampler;


  void main(void) {
    //vec4 texColor;
    //texColor = texture2D(sTexture, gl_PointCoord);

    gl_FragColor =  texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y))*vec4(1.0, 1.0, 1.0, 1.0);
     //gl_FragColor = vec4(0.0, 1.0, 0.0, 1.0);


  }