import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

export default function Title(): JSX.Element {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6">
                    GAME OF LIFE
                </Typography>
            </Toolbar>
        </AppBar>
    )
}
