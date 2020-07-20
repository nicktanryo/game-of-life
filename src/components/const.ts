const GRID_ROW: number = 25;
const GRID_COLUMN: number = 50;
const CELL_SIZE: number = 25
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

const DELAY: number = 100

const GENERATE_POPULATION = (grid: number[][]): number[][] => {
    for (let i = 0; i < GRID_ROW; i++) {
        for (let j = 0; j < GRID_COLUMN; j++) {
            const chance: number = Math.random()
            if (chance > 0.5) grid[i][j] = 1
            else grid[i][j] = 0
        }
    }
    return grid
}

export { GRID_ROW, GRID_COLUMN, CELL_SIZE, BORDER_SIZE, OPERATION, DELAY, GENERATE_POPULATION };