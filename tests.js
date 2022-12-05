//"ctrl-shift-h": "atom-hydra:toggleVisibility"

s0.initScreen(0)
src(s0).scale(0.95).modulateScale(o0).blend(o0).modulateScale(noise(.2,.01)).blend(o0).blend(o0).blend(o0).blend(o0).out()

src(s0).scale(0.99).blend(o0).blend(o0).blend(o0).blend(o0).out()

src(s0).scale(1).modulate(noise(.51)).blend(o0).blend(o0).blend(o0).blend(o0).blend(o0).blend(o0).out()
solid().out()
solid().out()
src(s0).modulateScale(noise(1),.1).blend(o0).blend(s0).blend(s0).out()
noise(3,0.1)
  .thresh( ({time})=>Math.sin(time/2) , [0.04,0.25,0.75,1].fast(0.25) )
  .out(o0)

noise(1,0.1).out(o0)
solid().invert().out()
shape(100, 0.5, 0.5).invert().out()

n = 4
a= () => shape(400,0.5).repeat(n,n)
a().add(a().scrollX(0.5/n).invert().scrollY(0.5/n),1).out(o1)
render(o0)

// Changing the number in 'initScreen' lets you choose which window becomes the input
s0.initScreen(2)
src(s0).out()
flow().out(o3)
smoothed=0;
smoothed1=0;

smoothingA = (destValue, amount)=> { smoothed += (destValue-smoothed)*amount; return smoothed}

smoothingVM = (destValue, amount)=> { smoothed1 += (destValue-smoothed1)*amount; return smoothed1}

c = ()=>smoothingA(cc[16],0.001); noiseAmount = ()=>smoothingVM(cc[17]*10,0.001);noiseSpeed = ()=>cc[18];src(s0).modulate(noise(noiseAmount,noiseSpeed)).color(c,c,c,1).out()

c = ()=>smoothingA(cc[16],0.001); noiseAmount = ()=>smoothingVM(cc[17]*10,0.001);noiseSpeed = ()=>cc[18];

src(s0).modulateScale(o0).rotate(noiseSpeed).color(c,c,c).blend(o0).blend(o0).blend(o0).out()

src(s0).modulate(noise(noiseAmount,noiseSpeed)).color(c,c,c,1).blend(o0).blend(o0).blend(o0).blend(o0).out()

/////////////////////////////////////
c = ()=>cc[16]; noiseAmount = ()=>cc[17]*10;noiseSpeed = ()=>cc[18];src(s0).modulate(noise(noiseAmount,noiseSpeed)).color(c,c,c,1).out()

c = ()=>cc[16]; noiseAmount = ()=>cc[17]*10;noiseSpeed = ()=>cc[18];src(s0).modulate(noise(noiseAmount,noiseSpeed)).color(()=>( smoothed += (cc[16]-smoothed)*0.001),()=>( smoothed += (cc[16]-smoothed)*0.001),()=>( smoothed += (cc[16]-smoothed)*0.001),1).out()

////////////////////////////////////
noise().out()

osc(2, .5, 1.0).out()

src(s0).modulate(voronoi(2,.75,.961)).out()

src(s0).modulate(noise(({time}) => Math.sin(time/20)*3)).diff(gradient(2)).out()

src(s0).modulate(noise(3,.01)).mult(solid(0.5,0.5,0.5,1)).out()

src(s0).mult(gradient(2)).out()
gradient(2).out()
noise(10,.1).out()
osc(10,0.1,.3).out()
solid().invert().out()
shape(500,0.01,1).invert(({time})=>Math.sin(time)*2).out(o0)

gradient(5).mask(voronoi(),3,0.5).invert([0,1]).out()
flow().out()
// algae pulse
osc(10,-0.25,1).color(0,0,1).saturate(2).kaleid(50)
  .mask(noise(25,2).modulateScale(noise(0.25,0.05)))
  .modulateScale(osc(6,-0.5,2).kaleid(50))
  .mult(osc(3,-0.25,2).kaleid(50))
  .scale(0.5,0.5,0.75)
  .out()

  setFunction({
    name: 'sphere',type: 'coord',
    inputs: [
      {name: 'radius', type: 'float', default: 4.0},
      {name: 'rot', type: 'float', default: 0.0}
    ],
    glsl: `
    vec2 pos = _st-0.5;
    vec3 rpos = vec3(0.0, 0.0, -10.0);
    vec3 rdir = normalize(vec3(pos * 3.0, 1.0));
    float d = 0.0;
    for(int i = 0; i < 16; ++i){
      d = length(rpos) - radius;
      rpos += d * rdir;
      if (abs(d) < 0.001)break;
    }
    return vec2(atan(rpos.z, rpos.x)+rot, atan(length(rpos.xz), rpos.y));
  `})
  sphere(6)

  osc(2,.1,.5).sphere(6.0).scale(1,1,window.innerWidth/window.innerHeight).out()

setFunction({
name: 'm',type: 'util',
glsl: `mat2 m(float a){
float c=cos(a);
float s=sin(a);
return mat2(c,-s,s,c);
}
`})

_luminance: {
  type: 'util',
  glsl: `float _luminance(vec3 rgb){
    const vec3 W = vec3(0.2125, 0.7154, 0.0721);
    return dot(rgb, W);
  }`
}

setFunction({
name: 'map',type: 'src',
inputs: [{name: 'p', type: 'vec3', default: (0.,0.,0.)}],
glsl: `
p.xz*= mat2(cos(time*0.4),-sin(time*0.4),sin(time*0.4),cos(time*0.4));
p.xy*= mat2(cos(time*0.3),-sin(time*0.3),sin(time*0.3),cos(time*0.3)));
vec3 q = p*2.+time;
length(p+vec3(sin(time*0.7)))*log(length(p)+1.) + sin(q.x+sin(q.z+sin(q.y)))*5.5 - 1.);
`})


shape(4,.4, 0.02).color(1,1,1).out(o0)
src()
src(o0).yoyo(o1,o1).out(o1)
shape(4,.4, 0.02).add(shape(3,.4, 0.02)).out(o2)
yoyo(o0,o1).out(o1)

shape(5,.4, 0.02).color(0,1,1).out(o1)

src(o0).rgbluma(o1,.5).out()



render()

setFunction({
name: 'yoyo',
type: 'color',
inputs: [
  {
        type: 'bool',
        name: 'on',
        default: false,
      },
],
glsl: `
if (on)
  return vec4(1.,0.,1.,1.)*_c0.r;
  else
  return vec4(1.,1.,0.,1.);
`})
render()

shape(4).yoyo('true').out(o0)


setFunction({
    name: 'slide',
    type: 'combine',
    inputs: [
    {
      type: 'float',
      name: 'sld',
      default: 0,
    }
    ],
    glsl: `
    vec4 input0 = _c0;
    vec4 input1 = _c1;
    float d = max(1.0, abs(sld));
    vec4 sd = vec4(1.0 / d);
    return input1 + ((input0 - input1) * sd);

    `
})

setFunction({
    name: 'hsflow',
    type: 'src',
    inputs: [
    {
      type: 'sampler2D',
      name: 'tex0',
      default: NaN,
    },
    {
      type: 'sampler2D',
      name: 'tex1',
      default: NaN,
    },
    {
      type: 'float',
      name: 'scaleX',
      default: 1,
    },
    {
      type: 'float',
      name: 'scaleY',
      default: 1,
    },
    {
      type: 'float',
      name: 'offsetX',
      default: 1,
    },
    {
      type: 'float',
      name: 'offsetY',
      default: 1,
    }
    ],
    glsl: `
    vec2 scale = vec2(scaleX, scaleY);
    vec2 offset = vec2(offsetX, offsetY);
    vec2 tc = _st;
    vec4 a = texture2D(tex0, tc);
			vec4 b = texture2D(tex1, tc);
			vec2 x1 = vec2(offset.x,0.);
			vec2 y1 = vec2(0.,offset.y);
			vec4 curdif = b-a;
			vec4 gradx = texture2D(tex1, tc+x1)-texture2D(tex1, tc-x1);
			gradx += texture2D(tex0, tc+x1)-texture2D(tex0, tc-x1);
			vec4 grady = texture2D(tex1, tc+y1)-texture2D(tex1, tc-y1);
			grady += texture2D(tex0, tc+y1)-texture2D(tex0, tc-y1);
			float gradmag1 = distance(gradx.r,grady.r);
			float gradmag = mix(gradmag1,0.00000000000001,float(gradmag1==0.));
			//float vxd = curdif.x*(gradx.x/gradmag);
			float vxd = curdif.x*(gradx.x);
			vec2 xout = vec2(max(vxd,0.),abs(min(vxd,0.)))*scale.x;
			//float vyd = curdif.x*(grady.x/gradmag);
			float vyd = curdif.x*(grady.x);
			vec2 yout = vec2(max(vyd,0.),abs(min(vyd,0.)))*scale.y;
			vec4 pout = vec4(xout.xy,yout.xy);
			//float within = float(abs(length(vec2(vxd,vyd)))<1.)*float(abs(length(vec2(vxd,vyd)))>0.);
			return mix(pout,vec4(0.),float(gradmag1==0.));

    `
})

setFunction({
    name: 'repo',
    type: 'src',
    inputs: [
    {
      type: 'sampler2D',
      name: 'tex0',
      default: NaN,
    },
    {
      type: 'sampler2D',
      name: 'tex1',
      default: NaN,
    },
    {
      type: 'sampler2D',
      name: 'tex2',
      default: NaN,
    },
    {
      type: 'sampler2D',
      name: 'tex3',
      default: NaN,
    },
    {
      type: 'float',
      name: 'amtX',
      default: 1,
    },
    {
      type: 'float',
      name: 'amtY',
      default: 1,
    },
    {
      type: 'float',
      name: 'pixelsX',
      default: 1,
    },
    {
      type: 'float',
      name: 'pixelsY',
      default: 1,
    },
    {
      type: 'float',
      name: 'diff',
      default: 0,
    },
    {
      type: 'float',
      name: 'orig',
      default: 0,
    },
    {
      type: 'bool',
      name: 'bw',
      default: false,
    }
    ],
    glsl: `
    vec2 tc = _st;
    vec2 amt = vec2(amtX, amtY);
    vec2 pixels = vec2(pixelsX, pixelsY);



    vec2 pix = pixels*0.5;
		vec2 pcord = floor(tc*pixels)/pixels;
  	vec4 look = texture2D(tex1,pcord);

  	vec2 offs = (look.y-look.xz)*amt;

    float len = length(offs);

//     float lmap(float val, float inMin, float inMax, float outMin, float outMax)
// {
//     return outMin + ((outMax - outMin) * (val - inMin)) / (inMax - inMin);
// }
// lmap(len,.0001,.001,0.,1.);

    float mixAmount=0. + ((1. - 0.) * (len - .0001)) / (.001 - .0001);
    mixAmount=clamp(mixAmount,0.,1.);

  	vec2 coord = offs+tc;

    vec4 v1 = texture2D(tex0, coord);

    float col=v1.x+repos.y+repos.z;
        col/=3.;
        vec4 mixed = mix(vec4(col,col,col,1.),repos,mixAmount);
        vec4 oColor = vec4(0.,0.,0.,1.);
        // output texture
        if (bw){
            //here for fadeing from color to black and white
            oColor = mixed; //THIS IS WHERE THE MIXING HAPPENS
            //here for straight up black and white
            //oColor = vec4(col,col,col,1.);
        } else
            oColor = repos;

    vec4 v0 = texture2D(tex2, coord)-texture2D(tex3, coord);
    vec4 differenced = v0*diff + v1;
    vec4 original = mix(v1,texture2D(tex2, tc),orig);
    vec4 result = differenced + original;
    result*=.5;
    return vec4(result.rgb,1.);

    `
})

setFunction({
    name: 'addsss',
    type: 'src',
    inputs: [
    {
      type: 'sampler2D',
      name: 'tex0',
      default: NaN,
    },
    {
      type: 'sampler2D',
      name: 'tex1',
      default: NaN,
    },
    {
      type: 'sampler2D',
      name: 'tex2',
      default: NaN,
    },
    {
      type: 'float',
      name: 'diff',
      default: 0,
    },
    {
      type: 'float',
      name: 'orig',
      default: 0,
    }
    ],
    glsl: `
    vec2 tc = _st;
    vec4 v0 = texture2D(tex2, tc)-texture2D(tex1, tc);
    vec4 v1 = texture2D(tex0, tc);
    vec4 v2 = texture2D(tex1, tc);
    vec4 result = v0*vec4(diff) + v1;

    return vec4(result.rgb,1.);
    `
})

src(o5).add(o7).add(solid()).out(o6)

src(o5).add(o0).add(o0).out(o13)

render(o5)

src(s1).out(o1)

src(o1).diff(s1).slide(o2,5).out(o2)
render()

src(s0).out(o10)

src(o10).diff(s0).slide(o11,5).out(o11)

feedback =0
src(o11).add(solid()).rgbluma(o6,feedback).out(o0)
hsflow(o0,o7,500.,500.,5./window.innerWidth,5./window.innerHeight).add(solid()).slide(o4,10).add(solid()).out(o1)
blur = .01;
cross(o1, blur).add(solid()).out(o2)
cross(o2, blur*2).out(o3)
cross(o3, blur*3).out(o4)
//src(o4).add(solid()).out(o8)
amt = 0.10//5101;
pixelSize = 1.;
src(o5).add(solid()).out(o13)
repo(o5,o4,o0,o7,amt, amt, window.innerWidth/pixelSize, window.innerHeight/pixelSize,0.0,0.1, false).add(solid()).out(o5)
diff=3
orig = .1
src(s0).out(o13)
addsss(o5,o14,s0,diff,orig).out(o6)
src(o0).out(o7)
src(s1).out(o14)
render(o15)
src(o5).add(o9).add(s1).out(o15)
src(o0).saturate(0).out(o9)

// kichan no setting ice: s1 desert video: repo(s1,o4,amt, amt, window.innerWidth/pixelSize, window.innerHeight/pixelSize).out(o5)

repo(s1,o4,s1,o4,.1,.1, window.innerWidth/pixelSize, window.innerHeight/pixelSize,0.0,0.0, false).out(o12)

// run this line to start recording
vidRecorder.start()

// stop recording
vidRecorder.stop()

// set the output video as a source
s0.init({src: vidRecorder.output})

// display the source
src(s0).out(o3)
render()
// run this line to start recording
vidRecorder.start()

// stop recording
vidRecorder.stop()


render(o5)

src(o1).out(o2)

src(o0).modulatePixelate(o2).out(o4)


render()



setFunction({
  name: 'cccc',
  type: 'color',
  inputs: [
    ],
  glsl: `
   float maxrb = max( _c0.r, _c0.b );
   float k = clamp( (_c0.g-maxrb)*5.0, 0.0, 1.0 );
   float dg = _c0.g;
   _c0.g = min( _c0.g, maxrb*0.8 );
   _c0 += vec4(dg - _c0.g);
   return vec4(_c0.rgb, 1.0 - k);
`})

// s0.initCam()
// src(s0).out(o0)
solid(0,1,0).layer(shape(5,0.3,0.3).luma()).out(o0)
osc(30, 0, 1).layer(src(o0).chroma()).out(o1)
render()

yo().out()






flow().out()
  osc(40,0.1,43).modulate(noise(1,1)).pixelate(30,30).blur().out(o2)

src(o1).out(o2)

render()

setFunction({
  name: 'chromaaa',
  type: 'color',
  inputs: [
    ],
  glsl: `
   float maxrb = max( _c0.r, _c0.b );
   float k = clamp( (_c0.g-maxrb)*5.0, 0.0, 1.0 );
   float dg = _c0.g;
   _c0.g = min( _c0.g, maxrb*0.8 );
   _c0 += vec4(dg - _c0.g);
   return vec4(_c0.rgb, 1.0 - k);
`})

// s0.initCam()
// src(s0).out(o0)
solid(0,1,0).layer(shape(5,0.3,0.9).luma()).out(o0)
osc(300, 0, 1).layer(src(o0).chroma()).out(o1)
render()






setFunction(  {
name: 'flow',type: 'src',
inputs: [
],
glsl: `

  vec2 p = _st - vec2(.9,.5);
  vec3 cl = vec3(0.);
  float d = .9;
  for(int i=0; i<=5; i++)	{
    vec3 pp = vec3(0,0,5.) + normalize(vec3(p, -1.))*d;
    pp.xz*= mat2(cos(time*0.4),-sin(time*0.4),sin(time*0.4),cos(time*0.4));
    pp.xy*= mat2(cos(time*0.3),-sin(time*0.3),sin(time*0.3),cos(time*0.3));
    vec3 q = pp*2.+time;
     float rz = length(pp+vec3(sin(time*0.7)))*log(length(pp)+1.) + sin(q.x+sin(q.z+sin(q.y)))*5.5 - 1.;

     pp = vec3(0,0,5.) + normalize(vec3(p, -1.))*d;
     pp+=.1;
     pp.xz*= mat2(cos(time*0.4),-sin(time*0.4),sin(time*0.4),cos(time*0.4));
     pp.xy*= mat2(cos(time*0.3),-sin(time*0.3),sin(time*0.3),cos(time*0.3));
     q = pp*2.+time;
      float map2 = length(pp+vec3(sin(time*0.7)))*log(length(pp)+1.) + sin(q.x+sin(q.z+sin(q.y)))*5.5 - 1.;

    float f =  clamp((rz - map2)*0.5, -.1, 1. );
    vec3 l = vec3(0.1,0.3,.4) + vec3(5., 2.5, 3.)*f;
    cl = cl*l + (1.-smoothstep(0., 2.5, rz))*.7*l;
    d += min(rz, 1.);
  }

  return vec4(cl, 1.);
`})
s0.initScreen(0)
src(s0).modulate(flow(0.1)).blend(flow(0.1),0.2).out()

solid().out()


osc(10,0,2).sphereDisplacement(noise(2,0,3).color(0.5,0.5,0.5), 6.0).out()

solid().out()


  ////////////////////
  navigator.requestMIDIAccess()
      .then(onMIDISuccess, onMIDIFailure);

  function onMIDISuccess(midiAccess) {
      console.log(midiAccess);
      var inputs = midiAccess.inputs;
      var outputs = midiAccess.outputs;
      for (var input of midiAccess.inputs.values()){
          input.onmidimessage = getMIDIMessage;
      }
  }

  function onMIDIFailure() {
      console.log('Could not access your MIDI devices.');
  }

  //create an array to hold our cc values and init to a normalized value
  var cc=Array(128).fill(0.5)

  getMIDIMessage = function(midiMessage) {
      var arr = midiMessage.data
      var index = arr[1]
      //console.log('Midi received on cc#' + index + ' value:' + arr[2])    // uncomment to monitor incoming Midi
      var val = (arr[2]+1)/128.0  // normalize CC values to 0.0 - 1.0
      cc[index]=val
  }
