import React, { useState, useCallback, useRef } from 'react'
import { Button } from "@material-ui/core"
import produce from "immer"

import { GRID_COLUMN, GRID_ROW, CELL_SIZE, BORDER_SIZE, OPERATION } from './const'

export default function GameOfLife(): JSX.Element {

    const [grid, setGrid]: [number[][], React.Dispatch<React.SetStateAction<number[][]>>] = useState<number[][]>(() => {
        const rows = []
        for (let i = 0; i < GRID_ROW; i++) {
            rows.push(Array.from(Array(GRID_COLUMN), () => 0))
        }
        return rows
    })
    const [mouseDown, setMouseDown]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false)
    const [previousCell, setPreviousCell]: [number[], React.Dispatch<React.SetStateAction<number[]>>] = useState<number[]>([-1, -1])
    const [running, setRunning]: [boolean, React.Dispatch<React.SetStateAction<boolean>>] = useState<boolean>(false)
    const runningRef = useRef<boolean>(running)
    runningRef.current = running

    function toggleCell(i: number, j: number): void {
        const newGrid = produce(grid, prevGrid => {
            prevGrid[i][j] = prevGrid[i][j] === 1 ? 0 : 1
        })
        setGrid(newGrid)
    }

    function handleMouseDown(i: number, j: number): void {
        setMouseDown(true)
        setPreviousCell([i, j])
        toggleCell(i, j)
    }

    function handleMouseEnter(i: number, j: number): void {
        if (!mouseDown) return
        setPreviousCell([i, j])
        toggleCell(i, j)
    }

    function handleMouseUp(i: number, j: number): void {
        if (i === previousCell[0] && j === previousCell[1]) setMouseDown(false)
        else {
            toggleCell(i, j)
            setMouseDown(false)
        }

    }

    const runSimulation: () => void = useCallback(() => {
        if (!runningRef.current) return

        setGrid((prevGrid) => {
            return produce(prevGrid, gridCopy => {
                console.log(gridCopy);
                for (let i = 0; i < GRID_ROW; i++) {
                    for (let j = 0; j < GRID_COLUMN; j++) {
                        let neighboursAlive: number = 0

                        OPERATION.forEach(([deltaI, deltaJ]) => {
                            const newI = i + deltaI;
                            const newJ = j + deltaJ;
                            if (newI >= 0 && newI < GRID_ROW && newJ >= 0 && newJ < GRID_COLUMN) {
                                neighboursAlive += prevGrid[newI][newJ];
                            }
                        })

                        if (neighboursAlive < 2 || neighboursAlive > 3) {
                            gridCopy[i][j] = 0;
                        } else if (prevGrid[i][j] === 0 && neighboursAlive === 3) {
                            gridCopy[i][j] = 1;
                        }

                    }
                }
                return gridCopy
            })
        })

        setTimeout(runSimulation, 500)
    }, [])

    function handleSimulation(): void {
        setRunning(!running)
        if (!running) {
            runningRef.current = true
            runSimulation()
        }
    }

    return (
        <>
            <Button
                color={running ? "secondary" : "primary"}
                onClick={handleSimulation}
                variant="contained"
            >
                {running ? "STOP" : "START"}
            </Button>
            <div style={{
            }}
            >
                {grid.map((row, indexI) =>
                    <div
                        key={`row-${indexI}`}
                        style={{
                            height: CELL_SIZE + (2 * BORDER_SIZE)
                        }}
                    >
                        {row.map((cell, indexJ) =>
                            <div
                                key={`cell-${indexI}-${indexJ}`}
                                style={{
                                    display: "inline-block", border: `${BORDER_SIZE}px solid lightblue`,
                                    width: CELL_SIZE, height: CELL_SIZE, backgroundColor: cell ? "#120136" : "white"
                                }}
                                onMouseDown={() => handleMouseDown(indexI, indexJ)}
                                onMouseEnter={() => handleMouseEnter(indexI, indexJ)}
                                onMouseUp={() => handleMouseUp(indexI, indexJ)}
                                onClick={() => toggleCell(indexI, indexJ)}
                            ></div>
                        )}
                    </div>
                )}
            </div>
        </>
    )
}
