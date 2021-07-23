import React, { useState, useEffect } from 'react'
import {
    useHistory
} from "react-router-dom";
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
import { StylesProvider } from "@material-ui/core/styles";
import { Button,Form,Row,Col } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faSitemap } from '@fortawesome/free-solid-svg-icons'


export default function OperationCostUpdate(props) {
    const [opName, setOpname] = useState()
    const [costHr, setcostHr] = useState()
    const [opCode,setopCode]=useState()
    const history=useHistory()
    useEffect(() => {
        if (props.location.e.SI === undefined) {
            history.push("./OperationCostView")
        }
        else {
            setOpname(props.location.e. OperationName)
            setcostHr(props.location.e.CostHr)
            setopCode(props.location.e.OperationCode)
           
        }
    }, [])
    function handaleSubmit(e) {
        e.preventDefault()
        const obj = {
            SI:props.location.e.SI,
            operation: opName,
            cost:costHr
        }
        console.log(obj)
        axios.post("operatincost/operationupdate.php",obj).then(res=> swal("success")).catch(err=> swal("faild", "", "warning"))
    }
    
    return (
        <div className="masterContainer">
            <Dashboardnav />
            <Grid container >
                <Dashboardsidemenu />
                <Grid container item xs={10}  direction="column" alignItems="center">
                    <div className="dashboardMidCont">
                        <div className="dashboardTag"><FontAwesomeIcon icon={faSitemap} style={{ width: "2.25em" }} />Update item</div>
                        <div className="dashHeadTag">

                            <Form style={{ paddingTop: "5%" }} onSubmit={handaleSubmit} autoComplete="off">
                                
                            <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="5">
                                        Operation Code:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control placeholder="" onChange={(e)=> setOpname(e.target.value)} value={opCode} readOnly/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="5">
                                        Operation Name:
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control placeholder="" onChange={(e)=> setOpname(e.target.value)} value={opName} />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    <Form.Label column sm="5">
                                        Cost/hr(₹):
                                    </Form.Label>
                                    <Col sm="7">
                                        <Form.Control  placeholder="" onChange={(e)=> setcostHr(e.target.value)} value={costHr} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" >
                                <Form.Label column sm="5">
                                        
                                    </Form.Label>
                                    <Col sm="7">
                                    <Button type="submit" variant="primary"><FontAwesomeIcon icon={faCloudUploadAlt} style={{ padding: "0px" ,margin: "0px 6px 0px 0px",}} />Update</Button>
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
