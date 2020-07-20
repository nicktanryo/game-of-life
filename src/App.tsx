import React from 'react'
import "./App.css"

import GameOfLife from './components/GameOfLife'

export default function App(): JSX.Element {
    return (
        <div className="App">
            <GameOfLife />
        </div>
    )
}
