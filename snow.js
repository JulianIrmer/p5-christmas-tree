class Snow {
    constructor(x, y, d, height, width) {
        this.height = height;
        this.x = x;
        this.y = y;
        this.d = d;
        this.vel = this.getVelocity();
        this.alpha = this.getAlpha();
        this.initialangle = random(0, 2 * PI);
        this.radius = sqrt(random(pow(width / 2, 2)));
    }

    show() {
        noStroke();
        fill(250, 250, 250, this.alpha);
        circle(this.x, this.y, this.d);
    }

    update(time) {
        this.y += this.vel;
        const w = 0.2;
        const angle = w * time + this.initialangle;
        this.x = width / 2 + this.radius * sin(angle);
    }

    isOutOfSight() {
        const maxVal = random(300, 4000);
        return this.y > maxVal;
    }

    getVelocity() {
        return 0.8 * this.d;
    }

    getAlpha() {
        return 3000 * (this.vel / 100);
    }
}