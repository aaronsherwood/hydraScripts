//click mouse for sound

s0.initVideo("https://media0.giphy.com/media/jDnPnKisan00o/giphy.mp4")

src(s0).out()

speed = 0.7

mod=0
pcc = 0

update = () => {
  if(cc[0]!=pcc){
    mod=0;
    console.log("yo")
  }
  mod-=.001;
  console.log(mod)
  pcc=cc[0]
 // mod=tidal[4].pat("-.1 .1 -.1 -.1 -.1 .1 .1 -.1")*.5
}



// glow circle
setFunction({
  name: 'glowCircle',
  type: 'src',
  inputs: [
    {
      type: 'float',
      name: 'locX',
      default: 0.,
    },
    {
      type: 'float',
      name: 'locY',
      default: 0.,
    },
    {
      type: 'float',
      name: 'glowAmount',
      default: 50.,
    },
    {
      type: 'float',
      name: 'r',
      default: 0.6,
    },
    {
      type: 'float',
      name: 'g',
      default: 0.3,
    },
    {
      type: 'float',
      name: 'b',
      default: 0.5,
    },
    ],
  glsl: `
  vec2 loc = vec2(locX,locY);
  // loc is in screen spaces, but _st is in normalized space
  float dist = glowAmount/distance(_st*resolution, loc);
  return vec4(r*dist,g*dist,b*dist,1.);
`})

p5=new P5()

particle = (offset)=>glowCircle(()=>p5.noise(time*.5+offset) * width, ()=>p5.noise(time*.5-offset)*height, 15)

//particle system
howMany=30
new Array(howMany).fill().reduce((a,b)=>
  a.add(particle(Math.random()*howMany)) // a is previous and then use hydra's add function to add another particle
,
  particle(Math.random()*howMany) //this is the original
).modulate(src(o0).brightness(-1),()=>mod).blend(src(o0).scale(1.01),2.2).diff(s0).out() // send out

//change 2.2 to 1.5 for kichan
