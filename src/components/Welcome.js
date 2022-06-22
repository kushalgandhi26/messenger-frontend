import React from 'react'
// import Container from '@material-ui/core/Container';
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
            {/* <img src='https://www.designbombs.com/wp-content/uploads/2017/01/live-chat-apps-1280x720.jpg'></img> */}
            <div>Welcome</div>
        </div>
    )
}

export default Welcome