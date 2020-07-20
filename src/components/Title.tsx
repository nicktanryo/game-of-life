import React from 'react'
import { AppBar, Toolbar, Typography, makeStyles, Grid, Button } from '@material-ui/core'

interface Props {
    running: boolean
    handleSimulation: () => void
    generatePopulation: () => void
}

const useStyles = makeStyles(() => ({
    appbar: {
        marginBottom: "30px"
    },
    title: {
        flex: 1,
        display: "inline",
        marginLeft: "10px"
    },
    button: {
        margin: "auto 10px auto auto"
    }
}))

export default function Title({ running, handleSimulation, generatePopulation }: Props): JSX.Element {
    const classes = useStyles()
    return (
        <AppBar position="static" className={classes.appbar}>
            <Toolbar>
                <Grid container justify="space-between">
                    <Grid item>
                        <Typography variant="h6" className={classes.title}>
                            GAME OF LIFE
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Button
                            variant="outlined"
                            className={classes.button}
                            color="inherit"
                            onClick={generatePopulation}
                        >
                            GENERATE CELLS
                        </Button>
                        <Button
                            color={running ? "secondary" : "inherit"}
                            onClick={handleSimulation}
                            variant="outlined"
                            className={classes.button}
                        >
                            {running ? "STOP" : "START"}
                        </Button>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
