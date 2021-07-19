import React from 'react'
import {
     useHistory
} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import logo from './assets/logo.png'
export default function Dashboardnav() {
    const history=useHistory()
    function logoutfun(e) {
        e.preventDefault()
        history.push("./login")
        localStorage.clear()
    }
    const style = makeStyles({
        typo: {

            background: "rgb(247, 247, 247)"
        },
        logout: {
            background:"rgb(45, 147, 243)"
        }
    })
    const classes=style()
    return (
        <AppBar position="sticky" className={classes.typo}>
        <Toolbar>
            <img src={logo} alt="" srcset="" />
            <Typography variant="h5" align='center' style={{ width: "100%", alignItems: "center", color: "rgb(245, 90, 0)",fontWeight:"600" }}>
            PRODUCT COST SUITE
            </Typography>
            <IconButton color="primary" onClick={logoutfun}>
                < AccountCircleIcon ></AccountCircleIcon>
            </IconButton>
        </Toolbar>
    </AppBar>
    )
}
