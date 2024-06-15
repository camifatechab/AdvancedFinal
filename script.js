var song
var fft
var img
var particles = []
var colorchange = 10;

function preload(){
    song = loadSound('./bass.mp3');
    img = loadImage('./taylor.jpg')
}

function setup(){
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES)
    imageMode(CENTER)
    fft = new p5.FFT();
    img.filter(BLUR, 20);
    noLoop();
}

function draw(){
    background(0);
    stroke(colorchange, 180, 255);
    strokeWeight(3);
    noFill();
    translate(width/2, height/2);

    fft.analyze();
    amp = fft.getEnergy(20, 200);

    if (amp > 200){
        rotate(-0.8, 0.8);
    }

    var wave = fft.waveform();

    image(img, 0, 0, width, height);
    pop();

    for (var k=-1; k<=1; k+=2){
        beginShape();
        for (var i=0; i<=180; i+=0.2){
            var index = floor(map(i, 0, 180, 0, wave.length - 1));

            var r = map(wave[index], -1, 1, 50, 250)

            var x = r * sin(i) * k;
            var y = r * cos(i);

            vertex(x,y);
        }
        endShape();
    }

    var p = new Particle();
    particles.push(p);

    for (var i=particles.length - 1; i >= 0; i--) {
        if (amp > 200){
            colorchange += 1;
            if (colorchange > 255){
                colorchange = 5;
            }
        }
        if(!particles[i].edges()){
            particles[i].update(amp > 200);
            particles[i].show();
        }
        else{
            particles.splice(i, 1);
        }
        
    }
}

function mouseClicked(){
    if (song.isPlaying()){
        song.pause();
        noLoop();
    }
    else{
        song.play();
        loop();
    }
}

