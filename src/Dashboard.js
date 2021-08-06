import React, { useEffect, useState } from 'react'
import { Redirect } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTh } from '@fortawesome/free-solid-svg-icons'
import "./dashboard.css"
import Dashboardnav from './Dashboardnav';
import Dashboardsidemenu from './Dashboardsidemenu';
import landing1 from "./assets/dash.png"
export default function Dashboard() {
    
    const [logedinn, setLogedinn] = useState(false)
   
    useEffect(() => {
        console.log('emaillll', localStorage.getItem("email"))
        var x = localStorage.getItem("email")
        if (x === undefined || x === null) {
            
            setLogedinn(true)

        }
        
    }, [])
    const style = makeStyles({
        typo: {

            background: "rgb(247, 247, 247)"
        },
        grd: {

            background: "rgb(247, 247, 247)"
        },
        grdd: {
            backgroundImage: `url(${landing1})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat"
        },
        listText: {
            paddingBottom: "0",
            paddingTop: "0",
            borderBottom: "1px solid rgb(224, 220, 220)"
        },
        dashIn: {
            border: "1px solid rgb(224, 220, 220)",
            width: "80vw"
        }

    })
    
    const classes = style()
    return (
        <div className="DashoardCont">
            {logedinn ? <Redirect to="./login"></Redirect> : <div></div>}
            <Dashboardnav></Dashboardnav>
            <Grid container >
               <Dashboardsidemenu/>
                <Grid container item xs={10} className={classes.grdd} direction="column" alignItems="center">
                    <div className="dashboardMidCont">
                        <div className="dashboardTag"><FontAwesomeIcon icon={faTh} /> Dashboard</div>
                        <div className="dashHeadTag">
                            <p>Welcome</p>
                            <h1>Product Cost Suite</h1>
                        </div>
                        
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
