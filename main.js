const canvasHeight = 800;
const canvasWidth = 1400;
const trees = [];
const snowArr = [];
const animationObject = {};
let frameCount = 0;

function setup() {
    const start = Date.now();
    frameRate(60);
    createCanvas(canvasWidth, canvasHeight);
    generateTrees();
    generateSnow();
    console.log(Date.now() - start)
}


function draw() {
    background(50, 20, 190);
    fill(220, 220, 220);
    rect(0, canvasHeight - 400, canvasWidth, canvasHeight);

    const time = frameCount / 60;
    
    for (let i = 0; i < trees.length; i++) {
        trees[i].show();
        
        for(let j = 0; j < trees[i].bulbs.length; j++) {
            const bulb = trees[i].bulbs[j];
            bulb.show('red');
        }
    }

    setupAnimation(30);

    displaySnow(time);
    
    frameCount++;
}

function setupAnimation(num) {
    for (let i = 0; i <= num; i++) {
        if (!animationObject.hasOwnProperty('treeIndex' + i)) {
            animationObject['treeIndex' + i] = 0;
            animationObject['bulbIndex' + i] = 0;
        }

        if (!animationObject.hasOwnProperty('color' + i)) {
            animationObject['color' + i] = getRandomColor('multiple');
        }

        if (!animationObject.hasOwnProperty('delay' + i)) {
            animationObject['delay' + i] = i * 50;
        }

        animate(i);
    }
}

function displaySnow(time) {
    for (let i = 0; i < snowArr.length; i++) {
        const snow = snowArr[i];
        snow.update(time);
        snow.show();

        if (snow.isOutOfSight()) {
            snowArr.splice(i, 1);

            const x = Math.floor(random(canvasWidth));
            const y = Math.floor(random(-750));
            const d = Math.floor(random(3, 10));
            snowArr.push(new Snow(x, y, d, canvasHeight, canvasWidth))
        }
    }
}

function animate(i) {   
    if (animationObject['delay' + i] === 0 || frameCount > animationObject['delay' + i]) {
        if (animationObject['treeIndex' + i] < trees.length) {
            if (animationObject['delay' + i] > 0) {
                trees[animationObject['treeIndex' + i]].bulbs[animationObject['bulbIndex' + i]].unlockColor();
            }
    
            trees[animationObject['treeIndex' + i]].bulbs[animationObject['bulbIndex' + i]].show(animationObject['color' + i]);
            trees[animationObject['treeIndex' + i]].bulbs[animationObject['bulbIndex' + i]].lockColor();
            animationObject['bulbIndex' + i] += 1;
    
            if (animationObject['bulbIndex' + i] === trees[animationObject['treeIndex' + i]].bulbs.length - 1) {
                trees[animationObject['treeIndex' + i]].bulbs[animationObject['bulbIndex' + i] ].unlockColor();
                animationObject['treeIndex' + i] += 1;
                animationObject['bulbIndex' + i] = 0;
                animationObject['color' + i] = getRandomColor('multiple');
            }
        }
    
        if (animationObject['treeIndex' + i] === trees.length) {
            delete animationObject['treeIndex' + i];
            delete animationObject['bulbIndex' + i];
        }
    } 
}

function generateTrees() {
    let oldWidth = 0;

    for (let i = 0; i < 4; i++) {
        const offsetTop = Math.floor(random(0, 150));
        const height = Math.floor(random(400, 500));
        const width = Math.floor(random(200, 500));
        const numOfBulbs = ((height * width) / 2) / 600;
        const p1 = createVector(0 + oldWidth, height);
        const p2 = createVector((width / 2) + oldWidth, offsetTop);
        const p3 = createVector(width + oldWidth, height);
        const color = getRandomColor('green');
        const tree = new Tree(p1, p2, p3, numOfBulbs, color);

        trees.push(tree);
        const offset = Math.floor(random(-100, 100));
        oldWidth += width + offset;
    }
}

function generateSnow() {
    const numOfSnow = canvasWidth * canvasHeight / 2000;

    for (let i = 0; i < numOfSnow; i++) {
        const x = Math.floor(random(canvasWidth));
        const y = canvasHeight - 1;
        const d = Math.floor(random(3, 10));
        snow = new Snow(x, y, d, canvasHeight, canvasWidth);
        snow.show();
        snowArr.push(snow);
    }
}

function getRandomColor(color) {
    const colors = {
        green: ['#228B22', '#008000', '#556B2F', '#6B8E23', '#8FBC8F'],
        multiple: ['blue', 'yellow', '#EA4630', 'purple', 'white', '#BB2528', '#BB2528', '#DA9101', '#CA302F', '#9CFFFA', '#E2C2FF', '#F7F06D', '#EEE5E9']
    };

    return colors[color][Math.floor(random(0, colors[color].length))];
}