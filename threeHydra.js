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

  t = new three()
  // create three js source on hydra
  s0.initTHREE(t)
  // output it
  src(s0).out()

                t.scene.remove(c.o3d);

                // another way to load the midi js file to enable WebMidi
                const s = document.createElement( 'script' )
                // change the next line to the file location on your computer
                s.src = '/Users/ags419/Documents/Code/hydraScripts/butterflies/Butterfly.js'
                document.querySelector( 'head' ).appendChild( s )

                // b = new Butterfly();
                // // butterflies.push(b);
                // t.scene.add(b.o3d);
                // b.move()
                // b.o3d.position.z=-50
                // b.velocity.x=0.001
                // b.velocity.y=0.001
                // b.velocity.z=0.001

                c = new Butterfly();
                // butterflies.push(b);
                t.scene.add(c.o3d);
                c.move()
                c.o3d.position.z=-40

                // c.velocity.x=0.001
                // c.velocity.y=0.001
                // c.velocity.z=0.001



butterflies =[]
                for (var i=0;i<10;i++){
                  b = new Butterfly();
                  butterflies.push(b);
                  t.scene.add(b.o3d);
                  b.move()
                  b.o3d.position.z=-20
                }

                for (var i=0;i<10;i++){
                  t.scene.remove(butterflies[i]);
                }

whichVisual = 0;
update =()=>{
  if (whichVisual != ccActual[9]){
    whichVisual = ccActual[9];
    visuals[whichVisual]()
  }
  // if (time%10==0){
  // b.move()
  // TWEEN.update();
  // b.shuffle()
  // }
  // console.log(c.o3d.position.z)
  c.move()
  // b.move()
      // TWEEN.update();
      // b.setWingRotation(b.wingRotation);
      c.setWingRotation(cc[4]*1.8-0.3);
      // b.setWingRotation(cc[4]*1.8-0.3);
      // b.o3d.position.z=-50
      destination.z = Math.sin(time*0.5)*25-35//0;//Math.random()*-100
      // for (var i=0;i<10;i++){
      //   butterflies[i].move();
      // }
      if (ccActual[10]==1){
        c.o3d.position.x=cc[6]*50-25;
        c.o3d.position.y=cc[7]*30-15;
      }
      //
      // c.o3d.position.x=cc[6]*5-2.5;
      // c.o3d.position.y=cc[7]*3-1.5;
      // c.o3d.position.z=cc[8]*20-10-40;
      v = new THREE.Vector3(ccActual[3]-64,100+ccActual[3],0)
      c.o3d.lookAt(v);
        // b.o3d.lookAt(v);
}

c.o3d.position.x=0

v = new THREE.Vector3(10,100,0)
c.o3d.lookAt(v);

speed =.1

src(s0).modulate(noise(),0.05).out()

shape(3,0.3,0.1).scale(1,innerHeight/innerWidth).invert().add(osc(30,0.01,0.5)).modulate(noise(3,0.05),.03).out(o1)

src(s0).out(o1)

src(o0)
  .modulate(
    osc(6,0,1.5).modulate(noise(3),1).brightness(-0.5)
  ,0.003)
  .blend(o1,()=>cc[5]*.495+0.005).out()

fb = 0.3
sm = 10
br = .001
at = .009
ps = 1.
df = .7
og = .1

fb = 0.0
sm = 0
br = .00
at = 0.0
ps = 2.
df = .000
og = 0.1

fb = 0.3
sm = 10
br = .001
at = .009
ps = 1.
df = .7
og = .1


glitch(o0, ()=>fb, ()=>sm, ()=>br, ()=>at, ()=>ps, ()=>df, ()=>og, true)

visuals = [
  ()=> {src(s0).out()
    render(o0)
  },
  ()=>{
    src(s0).out(o1)
    src(o0)
      .modulate(
        osc(6,0,1.5).modulate(noise(3),1).brightness(-0.5)
      ,0.003)
      .blend(o1,()=>cc[5]*.495+0.005).out()
    render(o0);
  },
  ()=>{
    src(s0).out(o0)
    glitch(o0,  0.0, 0, .007, 0.005, 50., 2.9, 0.9, true)
    src(fromGlitch).out(o1);
    render(o1);
  },
  ()=>{
    src(s0).out(o0)
    glitch(o0,  0.5, 1, .01, 0.1, 1, 1.5, 0.4, false)
    src(fromGlitch).out(o1);
    render(o1);
  },
  ()=>{
    //here
    src(s0).out(o0)
    glitch(o0,  0.5, 1, .01, 0.1, 1, 1.5, 0.4, false)
    // src(fromGlitch).out(o1);
    src(fromGlitch).blend(o0,.7).out(o1)
    render(o1);
  },
  ()=>{
    src(s0).out(o0)
    glitch(o0,  0.5, 100, .01, 0.1, 1, 1.5, 0.34, false)
    src(fromGlitch).out(o1);
    render(o1);
  },
  ()=>{
    src(s0).out(o0)
    glitch(o0,  0.5, 100, .01, 0.1, 1, 1.8, 0.34, false)
    src(fromGlitch).out(o1);
    render(o1);
  },
  ()=>{
    src(s0).out(o0)
    glitch(o0,  0.0, 14, .007, 0.1, 35., .5, 0.3, false)
    src(fromGlitch).out(o1);
    render(o1);
  },
  ()=>{
    src(s0).out(o0)
    glitch(o0,  0.0, 3, .007, 0.008, 20., .9, 0.1, true)
    src(fromGlitch).out(o1);
    render(o1);
  },
  ()=>{
    src(s0).out(o0)
    glitch(o0,  0.0, 14, .7, 0.1, 10., .5, 0.2, false)
    src(fromGlitch).out(o1);
    render(o1);
  },
  ()=>{
    src(s0).out(o0)
    glitch(o0,  0.0, 3, .007, 0.008, 20., .9, 0.1, true)
    src(fromGlitch).out(o1);
    render(o1);
  },
  ()=>{
    // src(s0).out(o0)
    glitch(o0,  0.0, 3, .007, 0.008, 20., .9, 0.1, true)
    src(fromGlitch).out(o1);
    src(o0)
      .modulate(
        osc(6,0,1.5).modulate(noise(3),1).brightness(-0.5)
      ,0.003)
      .blend(o1,()=>cc[5]*.495+0.005).out()
    render(o1);
  },
  ()=>{
    src(s0).out(o0)
    glitch(o0,  0.3, 10, .001, 0.009, 1, .7, 0.1, false)
    src(fromGlitch).out(o1);
    render(o1);
  },
  ()=>{
    src(s0).out(o0)
    glitch(o0,  0.7, 100, .01, 0.009, 1, .7, 0.3, false)
    src(fromGlitch).out(o1);
    render(o1);
  },
  ()=>{
    src(s0).out(o0)
    glitch(o0,  0.7, 100, .01, 0.009, 1, .7, 0.4, false)
    src(fromGlitch).out(o1);
    render(o1);
  }
]

visuals[4]() //11 max

  //feedback, smoothing, blur, amt, pixelSize, diff, orig, bw



  glitch(o0,  0.0, 3, .007, 0.008, 20., .9, 0.1, true)
  glitch(o0,  0.3, 10, .001, 0.009, 1, .7, 0.1, false)
  glitch(o0,  0.7, 100, .01, 0.009, 1, .7, 0.3, false)
  glitch(o0,  0.7, 100, .01, 0.009, 1, .7, 0.4, false)
  src(fromGlitch).out(o1)
  src(fromGlitch).blend(o0,.7).out(o1)
  src(fromGlitch).blend(o0,.6).layer(src(s0).luma(0.1)).out(o1)
  src(fromGlitch).layer(src(s0).luma(0.1)).out(o1)

    src(fromGlitch).layer(src(o0).thresh()).out(o1)

solid(1,1,1).layer(src(s0).luma(.1)).out(o0)
    src(s0).out(o0)

    src(s0).invert().out(o0)

    src(s0).invert().thresh().out(o0)
    src(s0).thresh().out(o0)

  render(o1)
hush()

src(s0)
  .diff(src(o0).scale(1.01).luma(0.05))
  .out()

  src(s0).invert().thresh()
    .diff(src(o0).scale(1.01).luma(0.05))
    .out()

src(s0).out(o0)
render(o0)
osc().out()

TWEEN.update();
b.setWingRotation(b.wingRotation);

        b.move()
            TWEEN.update();

                c.shuffle()



                b.move()
                b.o3d.position.z=-50

                b.o3d.position.x=-50
                b.o3d.position.y=-40


  wingRight = new THREE.Mesh(new THREE.PlaneGeometry(200, 200, 1, 1), material);


  t.scene.add(wingRight)

  t.camera.zoom = 1//0.015
  console.log(t.camera.zoom)
  t.camera.updateProjectionMatrix();

  t.camera.fov = 75//0.015
  // console.log(t.camera.zoom)
  t.camera.updateProjectionMatrix();
