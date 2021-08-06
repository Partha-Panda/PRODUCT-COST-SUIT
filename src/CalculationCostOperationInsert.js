import React, { useState,useEffect } from 'react'

import {
    useHistory
} from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
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


export default function CalculationCostOperationInsert() {
    const [top100Films, setTop] = useState()
    const [opName, setOpname] = useState()
    const [costHr, setcostHr] = useState()
    const [operationTime, setcostOpTime] = useState()
    const [global,setGlobal]=useState()
    const history=useHistory()
    useEffect(() => {

        axios.get("operatincost/viewOpcode.php").then(res => {

            setTop([...res.data])
           
        }).catch(err => console.log(err, "in error view"))

    }, [])
    function operationCodeChng(event, value) {
        if (value.SI === undefined) {
            history.push("./masterdata")
        }
        else {
            setGlobal(value)
            setOpname(value.OperationName)
            setcostHr(value.CostHr)
        }
    }
    function handaleSubmit(e) {
        e.preventDefault()
        const totalCost = global.CostHr * operationTime
        const Si=global.SI
        const obj = {
            operationTime,
            totalCost,
            Si
        }
        axios.post("calcultion/calculationcostupdateinsert.php",obj).then(res=> swal("successfully Created!", "","success")).catch(err=> swal("faild", "", "warning"))
        console.log(obj)
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

                            <Form style={{ paddingTop: "5%" }} onSubmit={handaleSubmit} 
                                autoComplete="off">
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="5">
                                        Operation Code:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Autocomplete
                                            onChange={operationCodeChng}
                                            id="combo-box-demo"
                                            options={top100Films}
                                            getOptionLabel={(option) => option.OperationCode}

                                            style={{ width: "90%" }}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="5">
                                        Operation Name:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control placeholder="" onChange={(e)=> setOpname(e.target.value)} value={opName} readOnly />
                                    </Col>
                                </Form.Group>

                              
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="5">
                                    Cost/hr(₹):
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control  placeholder="" onChange={(e)=> setcostHr(e.target.value)} value={costHr} readOnly/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="5">
                                    Operation time(hr):
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control  placeholder="" onChange={(e)=> setcostOpTime(e.target.value)}  value={operationTime} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="5">
                                        
                                    </Form.Label>
                                    <Col sm="7">
                                    <Button type="submit" variant="primary"><FontAwesomeIcon icon={faCloudUploadAlt} style={{ padding: "0px" ,margin: "0px 6px 0px 0px",}} />Create</Button>
                                    </Col>
                                </Form.Group>
                               
                            </Form>
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
