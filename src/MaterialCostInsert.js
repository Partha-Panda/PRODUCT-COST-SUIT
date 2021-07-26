import React, { useState, useEffect } from 'react'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import axios from 'axios';
import {
    useHistory
} from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Dashboardsidemenu from './Dashboardsidemenu';
import Dashboardnav from './Dashboardnav';
import swal from 'sweetalert';
import "./masterdata.css"
import "./dashboard.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt, faSitemap } from '@fortawesome/free-solid-svg-icons'

import { Button, Form, Row, Col } from "react-bootstrap"

export default function MaterialCostInsert() {
    const [topCode, setTop] = useState()
    const [metal, setMetal] = useState("")
    const [category, setCetagory] = useState("")
    const [volume, setVolume] = useState("")
    const [density, setDensity] = useState("")
    const [weight, setWeight] = useState("")
    const [rate, SetRate] = useState()
    const [quantity, setQuantity] = useState()
    const [gst, SetGST] = useState()
    const [transportation, setStransportation] = useState()
    const [masterData, setMaster] = useState()
    const history = useHistory()
    useEffect(() => {

        axios.get("./viewcost.php").then(res => {

            setTop([...res.data])
            console.log(topCode)
        }).catch(err => console.log(err, "in error view"))

    }, [])
    function metalCodeChng(event, value) {
        console.log(value.SI)

        if (value.SI === undefined) {
            history.push("./masterdata")
        }
        else {
            axios.get(`./viewsingle.php?SI=${value.SI}`).then(res => {
                const ob = { ...res.data[0] }
                //setTableData([...tabledata, ...res.data])
                //setTableData([...tabledata, ...res.data])
                //console.log(tabledata)
                setMaster(ob)
                setMetal(ob.Metal)
                setCetagory(ob.Category)
                setDensity(ob.Density)
                setVolume(ob.Volume)
                setWeight(ob.Weight)
                console.log(metal)
            }).catch(err => console.log(err, "in error view"))
        }

    }
    function handaleCostdata(e) {
        e.preventDefault()
        console.log(masterData)
        const amount = masterData.Weight * rate * quantity
        const gstAmount = (amount * gst) / 100
        const amountgst = amount + gstAmount
        const totalcost = parseInt(amountgst) + parseInt(transportation)
        const Si=masterData.SI
        const obj = {
            amount,
            gstAmount,
            amountgst,
            totalcost,
            rate,
            quantity,
            gst,
            transportation,
            Si
        }
        axios.post("cost/updateinsert.php",obj).then(res=> swal("successfully Created!", "","success")).catch(err=> swal("faild", "", "warning"))
        console.log(obj)
    }
    return (

        <div className="masterContainer">
            <Dashboardnav />
            <Grid container >
                <Dashboardsidemenu />
                <Grid container item xs={10} direction="column" alignItems="center">
                    <div className="dashboardMidCont">
                        <div className="dashboardTag"><FontAwesomeIcon icon={faSitemap} style={{ width: "2.25em" }} />Create item</div>
                        <div className="dashHeadTag">
                            <Form style={{ paddingTop: "5%",width:"50%" }} autoComplete="off" onSubmit={handaleCostdata}>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">
                                        Metal Code:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Autocomplete
                                            onChange={metalCodeChng}
                                            id="combo-box-demo"
                                            options={topCode}
                                            getOptionLabel={(option) => option.Metalcode}

                                            style={{ width: "90%" }}
                                            renderInput={(params) => <TextField {...params} variant="outlined" />}
                                        />
                                    </Col>
                                </Form.Group>


                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">
                                        Metal:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="" value={metal} readOnly />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">
                                        Category:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="" value={category} readOnly />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">
                                        Volume:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="" value={volume} readOnly />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">
                                        Density:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="" value={density} readOnly />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">
                                        Weight:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="" value={weight} readOnly />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">
                                        Rate:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="" value={rate} onChange={(e) => SetRate(e.target.value)} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">
                                        Quantity:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column md="4">
                                        GST %:
                                    </Form.Label>
                                    <Col md="8">
                                        <Form.Control placeholder="" value={gst} onChange={(e) => SetGST(e.target.value)} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                    <Form.Label column sm="4">
                                        transportation:
                                    </Form.Label>
                                    <Col sm="8">
                                        <Form.Control placeholder="" value={transportation} onChange={(e) => setStransportation(e.target.value)} />
                                    </Col>
                                </Form.Group>







                                <Form.Group as={Row} className="mb-3" >
                                    <Form.Label column sm="4">

                                    </Form.Label>
                                    <Col sm="8">
                                        <Button type="submit" variant="primary"><FontAwesomeIcon icon={faCloudUploadAlt} style={{ padding: "0px", margin: "0px 6px 0px 0px", }} />Create</Button>
                                    </Col>
                                </Form.Group>

                            </Form>
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>

        // <div>
        //     {/* <Autocomplete
        //         onChange={(event, value) => console.log(value)}
        //         id="combo-box-demo"
        //         options={topCode}
        //         getOptionLabel={(option) => option.Metalcode}
        //         style={{ width: 300 }}
        //         renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
        //     /> */}
        // </div>
    )
}
