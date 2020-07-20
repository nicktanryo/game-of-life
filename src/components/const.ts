const GRID_ROW: number = 20;
const GRID_COLUMN: number = 40;
const CELL_SIZE: number = 30
const BORDER_SIZE = 1

const OPERATION: number[][] = [
    [0, 1],
    [0, -1],
    [1, -1],
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0]
];

export { GRID_ROW, GRID_COLUMN, CELL_SIZE, BORDER_SIZE, OPERATION };