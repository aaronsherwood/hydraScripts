//oscillator
osc().out()
//thresh will take pixels  above a certain brightness value and output white
//obelow the value will output black
osc().thresh().out()
//similar to thresh but with multiple bands
osc().posterize().out()
//pixelate works similarly
//second parameter for osc is the speed
osc(40,.1).pixelate().out()
//third param is color!
osc(40,.1,.75).out()

//kaleid
osc(40,.1,.75).kaleid(99).out()
//scale
osc(40,.1,.75).kaleid(99).scale(1,window.innerHeight/window.innerWidth,1).out()
// ()=> is a shorthand way to write a function in javascript
// if you want numbers to update you need to pass afunction instead of just a number
osc(40,.1,.75).kaleid(99).scale(1,()=>window.innerHeight/window.innerWidth,1).out()
//kaleid triangles with thresh
osc(40,.1,.75).thresh().kaleid(3).scale(1,()=>window.innerHeight/window.innerWidth,1).out()

//triangles grid on screen
//number of divisions (will be 4 X 4)
n = 4
//create a function that repeats the triangle 4x4 and has a random rotation for that whole grid
a = () => shape(3, .4).rotate(Math.random()*100,Math.random()*3-1.75).repeat(n,n)
//add in the same grid to itself, but slightly offest by using scroll
a().add(a().scrollX(.5/n).scrollY(.5/n)).scale(1,()=>window.innerHeight/window.innerWidth,1).out(o0)

//feedback with scale
shape(4,.9).diff(src(o0).scale(.95)).out(o0)
src(o1).diff(src(o0).scale(.99)).out()

//show all oututs
render()
//show one output
render(o0)

//clear the screen
solid().out()

//modulate
osc(40,0,1).modulate(noise(3,0.05)).out()
//conditional with luma
osc(40,0,1).modulate(noise(3,0.05).luma(0.5,.5)).out()
//amount of modulation
osc(40,0,1).modulate(noise(3,0.05),.5).out()

//modulate by a shape
//start with osc
osc(30,0.1,0.75).out(o0)
//let's rotate the osc
src(o0).rotate(0.3,0.1).out(o1)
//mult it by a triangle
src(o1).mult(shape(3,0.2,0.3)).out(o2)
//modulate the original osc by that triangle
src(o0).modulate(src(o2),0.15).out(o3)

//modulate pixelate
//doesn't seem very pixelated!
src(o0).modulate(src(o2),0.15).modulatePixelate(noise(2,0.01)).out(o3)
//need to pixelate the modulation source too for it to work
src(o0).modulate(src(o2),0.15).modulatePixelate(noise(2,0.01).pixelate(16,16)).out(o3)
//add a second argument to modulatePixelate and see what happens
src(o0).modulate(src(o2),0.15).modulatePixelate(noise(2,0.01).pixelate(16,16),1024).out(o3)

//feedback with modulation
//start with a shape
shape(4,0.5).out(o0)
//get a modulated osc. to use
osc(10,0,1).modulate(noise(2,0.1)).out(o1)
//take the final output as the input
//then modulate with our texture above
//and blend in the square (here is the feedback)
src(o2).modulate(src(o1)).blend(o0).out(o2)
//bring down the blend
src(o2).modulate(src(o1)).blend(o0,.1).out(o2)
//slow the modulation roll
src(o2).modulate(src(o1),.01).blend(o0,.1).out(o2)
//modulation is moving up and to the left, to fix, add an offset to the modulation source:
src(o2).modulate(src(o1).add(solid(1,1),-0.5),0.01).blend(o0,0.1).out(o2)
//blend it together
src(o2).mult(o1).out(o3)
//try with luma
src(o2).luma(.3,.3).mult(o1).out(o3)
