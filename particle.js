class Particle {

    constructor() {
        this.pos = p5.Vector.random2D().mult(150);
        this.vel = createVector(0, 0);
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001));

        this.w = random(3, 5);

        this.color = [random(200, 255), random(200, 255), random(200, 255)];
    }
    update(cond) {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if (cond) {
            this.pos.add(this.vel);
            this.pos.add(this.vel);
            this.pos.add(this.vel);
        }
    }
    edges() {
        if (this.pos.x < -width/2 || this.pos.x > width/2 ||this.pos.y < -height/2 || this.pos.y > height/2){
            return true;
        }
        else{
            return false;
        }
    }
    show() {
        noStroke();
        fill(this.color);
        ellipse(this.pos.x, this.pos.y, 5);
    }
}