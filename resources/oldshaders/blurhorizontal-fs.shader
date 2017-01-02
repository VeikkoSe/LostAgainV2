precision mediump float;

uniform sampler2D uSampler; // the texture with the scene you want to blur
uniform sampler2D uSampler2; // the texture with the scene you want to blur
varying vec2 vTexCoord;

float blurSize = 1.0/512.0; // I've chosen this size because this will result in that every step will be one pixel wide if the RTScene texture is of size 512x512

void main(void)
{
   vec4 sum = vec4(0.0);
   vec4 origImage = texture2D(uSampler2, vTexCoord);

   //vec4 origImage2 = texture2D(uSampler, vTexCoord);


   // blur in y (vertical)
   // take nine samples, with the distance blurSize between them



   sum += texture2D(uSampler, vec2(vTexCoord.x - 4.0*blurSize, vTexCoord.y)) * 0.05;
   sum += texture2D(uSampler, vec2(vTexCoord.x - 3.0*blurSize, vTexCoord.y)) * 0.09;
   sum += texture2D(uSampler, vec2(vTexCoord.x - 2.0*blurSize, vTexCoord.y)) * 0.12;
   sum += texture2D(uSampler, vec2(vTexCoord.x - blurSize, vTexCoord.y)) * 0.3;
   sum += texture2D(uSampler, vec2(vTexCoord.x, vTexCoord.y)) * 1.0;
   sum += texture2D(uSampler, vec2(vTexCoord.x + blurSize, vTexCoord.y)) * 0.3;
   sum += texture2D(uSampler, vec2(vTexCoord.x + 2.0*blurSize, vTexCoord.y)) * 0.12;
   sum += texture2D(uSampler, vec2(vTexCoord.x + 3.0*blurSize, vTexCoord.y)) * 0.09;
   sum += texture2D(uSampler, vec2(vTexCoord.x + 4.0*blurSize, vTexCoord.y)) * 0.05;

   gl_FragColor = sum + origImage;


}
