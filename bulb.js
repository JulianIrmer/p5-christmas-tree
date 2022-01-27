class Bulb {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.d = random(4, 7);
        this.colors = ['red', 'blue', 'yellow', 'pink', 'purple', 'white', 'black']
        this.color;
        this.isColorLocked;
    }

    show(color) {
        if (!this.isColorLocked) {
            this.color = color;
        };
        
        fill(this.color);
        circle(this.x, this.y, this.d);
    }

    lockColor() {
        this.isColorLocked = true;
    }

    unlockColor() {
        this.isColorLocked = false;
    }

    getRandomColor() {
        return this.colors[Math.floor(random(0, this.colors.length - 1))];
    }
}