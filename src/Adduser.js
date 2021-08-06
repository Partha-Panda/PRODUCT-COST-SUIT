import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './masterdatainsert.css'
import Grid from '@material-ui/core/Grid';
import Dashboardsidemenu from './Dashboardsidemenu';
import Dashboardnav from './Dashboardnav';
import swal from 'sweetalert';
import "./masterdata.css"
import "./dashboard.css"
import axios from 'axios';
import { Button,Form,Row,Col } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faSitemap } from '@fortawesome/free-solid-svg-icons'


export default function Adduser() {
    
    function handaleSubmit(e) {
        e.preventDefault()
        
    }
    
    return (
        <div className="masterContainer">
            <Dashboardnav />
            <Grid container >
                <Dashboardsidemenu />
                <Grid container item xs={10}  direction="column" alignItems="center">
                    <div className="dashboardMidCont">
                        <div className="dashboardTag"><FontAwesomeIcon icon={faSitemap} style={{ width: "2.25em" }} />Create item</div>
                        <div className="dashHeadTag">

                            <Form style={{paddingTop:"5%"}} onSubmit={handaleSubmit} autoComplete="off">
                                
                               
                            </Form>
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}



// import React from 'react'

// export default function Adduser() {
//     return (
//         <div>
//             <h3>Add User</h3>
//             email:
//             password:
//         </div>
//     )
// }
