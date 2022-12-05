p5 = new P5()

// use the p5 canvas as a source for hydra
s0.init({src: p5.canvas})
// p5 out
src(s0).out()
// in a browser you'll want to hide the canvas
p5.hide();
tileCount = 20;
actRandomSeed = 0;
circleAlpha = 130;
p5.noFill();
circleColor = p5.color(0, 0, 0, circleAlpha);
p5.draw =()=> {
  p5.translate(p5.width / tileCount / 2, p5.height / tileCount / 2);
  p5.background(255);
  p5.randomSeed(actRandomSeed);
  p5.stroke(circleColor);
  p5.strokeWeight((300) / 60);
  //p5.strokeWeight((300+700*cc[1]) / 60);
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var posX = p5.width / tileCount * gridX;
      var posY = p5.height / tileCount * gridY;
      var shiftX = p5.random(-cc[0]*500, cc[0]*500) / 20;
      var shiftY = p5.random(-cc[0]*500, cc[0]*500) / 20;
      // p5.ellipse(posX + shiftX, posY + shiftY, (300) / 15, (300) / 15);
      p5.ellipse(posX + shiftX, posY + shiftY, (300+700*cc[1]) / 15, (300+700*cc[1]) / 15);
    }
  }
}

/*
TIDAL CODE

d1 $ sound "[<808bd:4(3,8) 808bd:4(5,8) 808bd:4(3,8) 808bd:4>, ~ 808:3]" # room 0.95 # krush 9 # speed (slow 4 ("<1.5 1>"))
d2 $ struct "<t(3,8) t(5,8) t(3,8) t*128>" $ ccv ((segment 128 (range 127 0 saw))) # ccn 0 # s "midi"

d3  $ ccv (slow 4 (segment 128 (range 0 127 saw))) # ccn 1 # s "midi"

*/
