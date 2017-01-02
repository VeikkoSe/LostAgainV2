precision mediump float;

//uniform vec4 uColor;
uniform sampler2D uSampler;
varying vec2 vTextureCoord;

void main(void) {
    gl_FragColor =  texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y))*vec4(1.0, 1.0, 1.0, 1.0);
    //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

