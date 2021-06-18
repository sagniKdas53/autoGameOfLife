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
let resolution = 10;
let iterations = 0;

function setup() {
    createCanvas(200, 200);
    cols = width / resolution;
    rows = height / resolution;
    grid = make2DArray(cols, rows);
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            var cell = floor(random(2))
            grid[i][j] = cell;
        }
    }
    //gridsave(grid, cols, rows)
}

function refreshGrid() {
    iterations = 0;
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            var cell = floor(random(2))
            grid[i][j] = cell;
        }
    }
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
    console.log("Main Grid");
    gridsave(grid, cols, rows);
    console.log("Hold grid");
    gridsave(hold, cols, rows);
    console.log("next Grid");
    gridsave(next, cols, rows);
}

//the rows are on the x axis on sceeen and the colums are on y
function gridsave(intialGrid, cols, rows) {
    console.log("Grid after " + iterations);
    for (let i = 0; i < cols; i++) {
        var str = ''
        for (let j = 0; j < rows; j++) {
            str = str + intialGrid[i][j];
        }
        console.log(str)
    }
}

function draw() {
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
        hold = grid;
        grid = next;
    }
    if (equalGrids(hold, grid)) {
        console.log("lock averted")
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                var cell = floor(random(2))
                grid[i][j] = cell;
            }
        }
    }
    iterations += 1;
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