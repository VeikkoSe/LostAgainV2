precision mediump float;



uniform sampler2D uSampler; // this should hold the texture rendered by the horizontal blur pass
varying vec2 vTexCoord;

float blurSize = 1.0/512.0;

void main(void)
{
   vec4 sum = vec4(0.0);

   // blur in y (vertical)
   // take nine samples, with the distance blurSize between them
   sum += texture2D(uSampler, vec2(vTexCoord.x, vTexCoord.y - 4.0*blurSize)) * 0.05;
   sum += texture2D(uSampler, vec2(vTexCoord.x, vTexCoord.y - 3.0*blurSize)) * 0.09;
   sum += texture2D(uSampler, vec2(vTexCoord.x, vTexCoord.y - 2.0*blurSize)) * 0.12;
   sum += texture2D(uSampler, vec2(vTexCoord.x, vTexCoord.y - blurSize)) * 0.3;
   sum += texture2D(uSampler, vec2(vTexCoord.x, vTexCoord.y)) * 1.0;
   sum += texture2D(uSampler, vec2(vTexCoord.x, vTexCoord.y + blurSize)) * 0.3;
   sum += texture2D(uSampler, vec2(vTexCoord.x, vTexCoord.y + 2.0*blurSize)) * 0.12;
   sum += texture2D(uSampler, vec2(vTexCoord.x, vTexCoord.y + 3.0*blurSize)) * 0.09;
   sum += texture2D(uSampler, vec2(vTexCoord.x, vTexCoord.y + 4.0*blurSize)) * 0.05;

   gl_FragColor = sum;
}