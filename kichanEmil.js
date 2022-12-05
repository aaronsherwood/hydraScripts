//line
fb = .0 //feedback glitch2videos(s0, o2, 0.0, 3, .001, .1, 1, .1, 1, false)
sm = 3 //smoothing
br = .001 //blur
at = 0.1 //amount
ps = 1 //pixel size
df = .1 // difference
og = 1 // original

//linesolo
fb = .0 //feedback glitch2videos(s0, o2, 0.0, 3, .001, .1, 1, .1, 1, false)
sm = 3 //smoothing
br = .001 //blur
at = 0.1 //amount
ps = 1 //pixel size
df = 10.1 // difference
og = 1 // original

//ice
fb = .0 //feedback glitch2videos(s0, o2, 0.0, 3, .001, .1, 1, .1, 1, false)
sm = 0 //smoothing
br = .001 //blur
at = 1 //amount
ps = 1 //pixel size
df = 0 // difference
og = 1 // original

// sand 0.0, 10, .01, 0.1, 10., 1,.2
fb = .0 //feedback glitch2videos(s0, o2, 0.0, 3, .001, .1, 1, .1, 1, false)
sm = 10 //smoothing
br = .01 //blur
at = .1 //amount
ps = 10 //pixel size
df = 0 // difference
og = 1 // original

src(s1).diff(o1).slide(o2,5).out(o2)
glitch(o2, ()=>fb, ()=>sm, ()=>br, ()=>at, ()=>ps, ()=>df, ()=>og, false)
glitch2videos(s0, o2, ()=>fb, ()=>sm, ()=>br, ()=>at, ()=>ps, ()=>df, ()=>og, false)
src(fromGlitch).add(o2).out(o3)

render(o3)

loadVideo = ()=>{
  //sax
  vid = document.createElement('video')
  vid.autoplay = true
  vid.loop = true
  vid.muted = false
  vid0.src ='/Users/ags419/Documents/Code/cinder_0.9.2_mac/myApps/Mahakala/assets/media/meta_dance1080.mov'
  //kichan
  vid1 = document.createElement('video')
  vid1.autoplay = true
  vid1.loop = true
  vid1.muted = true
  vid1.src ='/Users/ags419/Documents/Code/cinder_0.9.2_mac/myApps/Mahakala/assets/media/meta_sax_small1080.mov'
}

startVideo = ()=>{
  //base
  s0.init({src: vid}); src(s0).out(o0);
  //kichan
  s1.init({src: vid1}); src(s1).out(o1);
  vid.pause();vid1.pause();vid.currentTime = vid1.currentTime = 9*60;
  vid.play();
  vid1.play();
}

loadVideo()
startVideo()

render()//render(o3)


//video to be glitched, driverVideo,
//feedback, smoothing, blur, amt, pixelSize, diff, orig, bw
// glitch2videos(o0, o2, 0.0, 3, .01, 0.4, 1, 0.01, 0.1, true)
// glitch2videos(s0, o2, 0.0, 3, .001, .1, 1, .1, 1, false)


glitch = (toGlitch, feedback, smoothing, blr, amt, pixelSize, diff, orig, bw)=>{
  // uses o9-o15
  fromGlitch = o14;
  src(toGlitch).rgbluma(fromGlitch,feedback).out(o9);
  hsflow(o9,o15,500.,500.,5./window.innerWidth,5./window.innerHeight).slide(o13,smoothing).add(solid()).out(o10);
  cross(o10, ()=>blr()).out(o11);
  cross(o11, ()=>blr()*2).out(o12);
  cross(o12, ()=>blr()*3).add(solid()).out(o13);
  repo(fromGlitch,o13,o9,o15,amt, amt, ()=>window.innerWidth/pixelSize(), ()=>window.innerHeight/pixelSize(),diff,orig,bw).out(fromGlitch);
  src(o9).out(o15);
}

glitch2videos = (toGlitch, driverVideo, feedback, smoothing, blr, amt, pixelSize, diff, orig, bw)=>{
  // uses o9-o15
  fromGlitch = o14;
  src(toGlitch).rgbluma(fromGlitch,feedback).out(o9)
  hsflow(driverVideo,o15,500.,500.,5./window.innerWidth,5./window.innerHeight).slide(o13,smoothing).add(solid()).out(o10)
  cross(o10, ()=>blr()).out(o11)
  cross(o11, ()=>blr()*2).out(o12)
  cross(o12, ()=>blr()*3).add(solid()).out(o13)
  repo(fromGlitch,o13,o9,o15,amt, amt, ()=>window.innerWidth/pixelSize(), ()=>window.innerHeight/pixelSize(),diff,orig, bw).out(fromGlitch)
  //rgbluma previous
  src(driverVideo).out(o15)
}

glitch2videosOrg = (toGlitch, driverVideo, feedback, smoothing, blur, amt, pixelSize, diff, orig, bw)=>{
  // uses o9-o15
  fromGlitch = o14;
  src(toGlitch).rgbluma(fromGlitch,feedback).out(o9)
  hsflow(driverVideo,o15,500.,500.,5./window.innerWidth,5./window.innerHeight).slide(o13,smoothing).add(solid()).out(o10)
  cross(o10, blur).out(o11)
  cross(o11, blur*2).out(o12)
  cross(o12, blur*3).add(solid()).out(o13)
  repo(fromGlitch,o13,o9,o15,amt, amt, window.innerWidth/pixelSize, window.innerHeight/pixelSize,diff,orig, bw).out(fromGlitch)
  //rgbluma previous
  src(driverVideo).out(o15)
}
