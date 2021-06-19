// Acknowldegemnt:
// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain

// Game of Life
// Video: https://youtu.be/FWSR_7kZuYg

// add this in later : https://github.com/eligrey/FileSaver.js


function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

let grid;
let next;
let hold;
let cols;
let rows;
let sizex = 200;
let sizey = 200;
let resolution = 10;
let iterations = 0;
let show = 0;
let fr = 1;

function getOffset(el) {
    var padding = 30;
    const rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.scrollX + padding,
        top: rect.top + window.scrollY
    };
}

function onRes() {
    var pos = getOffset(anchor);
    console.log(pos);
    can.position(pos.left, pos.top)
}

function setup() {
    frameRate(fr);
    let can = createCanvas(sizex, sizey);
    can.parent("cnv_div");
    var anchor = document.getElementById("cnv_div");
    var candiv = document.getElementById("cnv_div");
    candiv.style.maxWidth = sizex;
    candiv.style.maxHeight = sizey;
    var pos = getOffset(anchor);
    console.log(pos);
    can.position(pos.left, pos.top);
    cols = width / resolution;
    rows = height / resolution;
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            var cell = floor(random(2))
            grid[i][j] = cell;
        }
    }

    background('rgb(0,0,0)');
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 1) {
                //fill('rgb(3, 180, 98)');
                fill('rgb(0, 255, 0)');
                stroke(0);
                rect(x, y, resolution - 1, resolution - 1);
            }
        }
    }
    //gridsave(grid, cols, rows)
}

function faster() {
    fr = fr * 2;
    if (fr > 32) {
        fr = 32;
    }
    frameRate(fr);
}

function slower() {
    fr = fr / 2;
    if (fr <= 0) {
        fr = 1;
    }
    frameRate(fr);
}

function refreshGrid() {
    iterations = 0;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            var cell = floor(random(2))
            grid[i][j] = cell;
        }
    }
    fr = 1;
}

function equalGrids(gridOld, gridNew) {
    var res = true;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (gridOld[i][j] != gridNew[i][j]) {
                res = false;
                break;
            }
        }
    }
    return res;
}

function showGrid() {
    var result = "";
    result += "Grid after " + iterations + " iterations:\n" + "Main Grid=\n";
    result += gridsave(grid, cols, rows);
    //console.log("Hold grid");
    //gridsave(hold, cols, rows);
    result += "Next Grid=\n";
    result += gridsave(next, cols, rows);
    addText(result);
}

function addText(text) {
    document.getElementById("output").value += text;
}

//the rows are on the x axis on sceeen and the colums are on y
function gridsave(intialGrid, cols, rows) {
    var str_full = '['
    for (let i = 0; i < cols; i++) {
        var str = '['
        for (let j = 0; j < rows; j++) {
            str = str + intialGrid[i][j] + ",";
        }
        str = str.slice(0, -1) + "],"
        str_full += "\n" + str;
    }
    str_full = str_full.slice(0, -1) + "]\n"; //+= "]\n";
    return str_full;
}

function draw() {
    if (show != 0) {


        background('rgb(0,0,0)');
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let x = i * resolution;
                let y = j * resolution;
                if (grid[i][j] == 1) {
                    //fill('rgb(3, 180, 98)');
                    fill('rgb(0, 255, 0)');
                    stroke(0);
                    rect(x, y, resolution - 1, resolution - 1);
                }
            }
        }

        next = make2DArray(cols, rows);
        hold = make2DArray(cols, rows);
        // Compute next based on grid
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j];
                // Count live neighbors!
                let sum = 0;
                let neighbors = countNeighbors(grid, i, j);

                if (state == 0 && neighbors == 3) {
                    next[i][j] = 1;
                } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
                    next[i][j] = 0;
                } else {
                    next[i][j] = state;
                }
            }
        }
        if (equalGrids(grid, next)) {
            console.log("refreshed")
            for (let i = 0; i < cols; i++) {
                for (let j = 0; j < rows; j++) {
                    var cell = floor(random(2))
                    grid[i][j] = cell;
                }
            }
        } else {
            grid = next;
        }
        iterations += 1;

    }
}

function countNeighbors(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

window.onresize = function() {
    onRes();
}