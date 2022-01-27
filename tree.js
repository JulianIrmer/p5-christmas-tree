class Tree {
    constructor(p1, p2, p3, numOfBulbs, color) {
        this.p1 = p1; 
        this.p2 = p2; 
        this.p3 = p3;
        this.numOfBulbs = numOfBulbs;
        this.bulbs = [];
        this.color = color;
        this.addBulbs();
    }

    show() {
        noStroke();
        fill(this.color);
        triangle(this.p1.x, this.p1.y, this.p2.x, this.p2.y, this.p3.x, this.p3.y);
        this.addTreeTrunk();
    }

    addTreeTrunk() {
        fill('brown');
        const x = ((this.p3.x - this.p1.x) / 2) + this.p1.x - 10;
        const y = this.p3.y;
        const a = 30;
        const b = 40;
        rect(x, y, a, b);
    }

    addBulbs() {
        for (let i = 0; i < this.numOfBulbs; i++) {
            let bulbCoords = {x: null, y: null}

            while(!bulbCoords.x && !bulbCoords.y) {
                const x = random(0, this.p3.x);
                const y = random(0, this.p3.y);

                if (this.arePointsInTriangle(this.p1, this.p2, this.p3, x, y)) {
                    bulbCoords.x = x;
                    bulbCoords.y = y;
                }
            }

            const bulb = new Bulb(bulbCoords.x, bulbCoords.y);
            this.bulbs.push(bulb);
        }

        this.sortBulbs();
    }

    sortBulbs() {
        const arr = ['x', 'y'];
        const index = Math.floor(random(0, arr.length));
        this.bulbs.sort((a, b) => {
            return a[arr[index]] - b[arr[index]];
        });
    }

    arePointsInTriangle(p0, p1, p2, x, y) {
        var A = 1/2 * (-p1.y * p2.x + p0.y * (-p1.x + p2.x) + p0.x * (p1.y - p2.y) + p1.x * p2.y);
        var sign = A < 0 ? -1 : 1;
        var s = (p0.y * p2.x - p0.x * p2.y + (p2.y - p0.y) * x + (p0.x - p2.x) * y) * sign;
        var t = (p0.x * p1.y - p0.y * p1.x + (p0.y - p1.y) * x + (p1.x - p0.x) * y) * sign;
        
        return s > 0 && t > 0 && (s + t) < 2 * A * sign;
    }

    create2DArray() {
        const arr = [];
    }
}