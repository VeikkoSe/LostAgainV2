precision mediump float;

uniform sampler2D uSampler;
varying vec2 vTextureCoord;


void main(void) {

    gl_FragColor = texture2D(uSampler, vec2(vTextureCoord.s, vTextureCoord.t));
    //gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}

