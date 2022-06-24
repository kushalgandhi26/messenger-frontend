import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        height: "89.9%",
        justifyContent: "center",
        alignItems: "center",
        flexDirection:"column",
    },
}));



function Welcome() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <div>Welcome</div>
        </div>
    )
}

export default Welcome