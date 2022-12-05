// load videos

vid = document.createElement('video')
vid.autoplay = true
vid.loop = true
vid1.muted=true
vid.src ='/Volumes/Backup\ Plus/2021Emil_cristina/Rite\ of\ Seduction,\ Diana\ Rotaru\ -\ 1.m4v'
s0.init({src: vid})

vid1 = document.createElement('video')
vid1.autoplay = true
vid1.loop = true
vid1.muted=false
vid1.src = '/Volumes/Backup\ Plus/2021Emil_cristina/dance_for_Rite/dance_rite.mp4'//'/Users/ags419/Movies/fall_dance_w_music.mov'
s1.init({src: vid1})

// restart videos
vid.currentTime=vid1.currentTime=0;console.log(vid.currentTime +" "+vid1.currentTime)
vid1.currentTime=0

vid.pause();
vid1.pause();

vid.play();

vid1.pause();
vid1.currentTime=0
vid1.play();

console.log(vid.currentTime +" "+vid1.currentTime)

// to see videos if you want
src(s0).out()
src(s1).out(o1)
// hide cursor
document.getElementById('hide_id').style.cursor = 'none';

// START ALL PROCESSING HERE
render(o1)
//kichan's 2nd video
src(s1).out(o0)
// src(s1).out(o4)
src(o0).diff(s1).slide(o1,5).out(o1)

// back from glitchflow
src(fromGlitch).out(o2)

render(o3)

// kiori likes sand version
//feedback, smoothing, blur, amt, pixelSize, diff, orig, blackWhite
glitch(o1,0.0, 0, .0, 0.1, 1., 0, 0.5, false)
// src(fromGlitch).add(s1).add(o2).out(o3)
src(fromGlitch).add(o2).add(s0).out(o3)
src(fromGlitch).add(o1).saturate(0).out(o3)

// cristina's video differenced & smoothed a little
src(s0).out(o0)
// src(s1).out(o4)
src(o0).diff(s0).slide(o1,5).out(o1)

// back from glitchflow
src(o1).saturate(0).out(o2)

// kiori likes sand version
//feedback, smoothing, blur, amt, pixelSize, diff, orig, blackWhite
glitch(o1,0.0, 10, .01, 0.1, 10., 1,.2,false)//glitch(o1,0.0, 10, .01, 0.1, 10., 0, 0.1, false)
// src(fromGlitch).add(s1).add(o2).out(o3)
src(fromGlitch).blend(o2).add(s1).out(o3)
src(fromGlitch).blend(o2).out(o3)

// kiori ice
//feedback, smoothing, blur, amt, pixelSize, diff, orig, blackWhite
glitch2videos(s1, o1, 0, 0, .001, 1, 1., 0, 0.2, false)
src(fromGlitch).out(o3)

//feedback, smoothing, blur, amt, pixelSize, diff, orig, blackWhite
glitch2videos(s1, o1, 0.0, 10, .01, 0.1, 1., 0, 0.1, true)
src(fromGlitch).add(o2).out(o3)

//feedback, smoothing, blur, amt, pixelSize, diff, orig, blackWhite
glitch(s0, 0.0, 10, .01, 0.1, 1., 0, 0.1, false)
src(fromGlitch).out(o3)

render(o3)

glitch2videos = (toGlitch, driverVideo, feedback, smoothing, blur, amt, pixelSize, diff, orig, bw)=>{
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

glitch = (toGlitch, feedback, smoothing, blur, amt, pixelSize, diff, orig, bw)=>{
  // uses o9-o15
  fromGlitch = o14;
  src(toGlitch).rgbluma(fromGlitch,feedback).out(o9)
  hsflow(o9,o15,500.,500.,5./window.innerWidth,5./window.innerHeight).slide(o13,smoothing).add(solid()).out(o10)
  cross(o10, blur).out(o11)
  cross(o11, blur*2).out(o12)
  cross(o12, blur*3).add(solid()).out(o13)
  repo(fromGlitch,o13,o9,o15,amt, amt, window.innerWidth/pixelSize, window.innerHeight/pixelSize,diff,orig,bw).out(fromGlitch)
  //rgbluma previous
  src(o9).out(o15)
}

// kichan no setting ice: s1 desert video: repo(s1,o4,amt, amt, window.innerWidth/pixelSize, window.innerHeight/pixelSize).out(o5)
