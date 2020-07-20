import React from 'react'
import "./App.css"

import GameOfLife from './components/GameOfLife'
import Title from './components/Title'

export default function App(): JSX.Element {
    return (
        <div className="App">
            <Title />
            <GameOfLife />
        </div>
    )
}
