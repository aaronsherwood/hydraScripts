osc(2,.1,.3).rotate(()=>time*.001).out(o2)
noise(3,.001).out(o2)
flow().out(o2)

offset = 50/window.innerHeight;//40/window.innerHeight;
bright = 1.04;
dark =	0.0099;
power =	0.0055;
shift =	1.5/window.innerHeight;
warp =	2.5/window.innerHeight;
mixin =	0.1;
mixinsat = .9;
aspect = window.innerWidth/window.innerHeight;


heightflow(o0,o1,o1).out(o0)
heightflow(o0,o1,o2,()=>offset,()=>bright,()=>dark,()=>power,()=>shift,()=>warp,()=>mixin,()=>mixinsat,()=>aspect).out(o0)
src(o0).blend(s0,.01).out(o3)
render(o0)

vid = document.createElement('video')
vid.autoplay = true
vid.loop = true
vid.muted=false
vid.src ='/Users/ags419/Movies/cliffjump.mov'
s0.init({src: vid})

vid1 = document.createElement('video')
vid1.autoplay = true
vid1.loop = true
vid1.muted=false
vid1.src ='/Users/ags419/Movies/fall_dance_latest_w_musicNew.mov'
s1.init({src: vid1})

src(s0).out(o1)

src(s1).out(o1)
