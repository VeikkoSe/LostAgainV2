  precision mediump float;

  uniform vec4 uColor;


  uniform sampler2D sTexture;


  void main(void) {
    vec4 texColor;
    texColor = texture2D(sTexture, gl_PointCoord);

    gl_FragColor = vec4(uColor) * texColor;
   // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);

  }