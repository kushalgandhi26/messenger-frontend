import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
    root: {
        textAlign: "center",
        margin: "24px 0px 16px",
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}));

function Loading({size}) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <CircularProgress size={size}/>
        </div>
    )
}

export default Loading