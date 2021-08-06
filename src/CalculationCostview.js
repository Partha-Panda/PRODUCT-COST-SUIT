import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
    useHistory
} from "react-router-dom";
import Dashboardsidemenu from './Dashboardsidemenu';
import Dashboardnav from './Dashboardnav';
import Grid from '@material-ui/core/Grid';
import { Table } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSitemap, faPlus, faTrashAlt, faPenSquare, faEye } from "@fortawesome/free-solid-svg-icons"
import "./dashboard.css"

import swal from 'sweetalert';

export default function CalculationCostview() {
    const history = useHistory()
    const [tabledata, setTableData] = useState([])
    useEffect(() => {

        axios.get("operatincost/operationview.php").then(res => {

            setTableData([...tabledata, ...res.data])
        }).catch(err => console.log(err, "in error view"))

    }, [])

    function dlt(e) {
        //e.preventDefault()
        var obj = {
            SI: e
        }

        try {
            axios.post("operatincost/operationcostdelete.php", obj).then(res => {
                swal({
                    title: "Are you sure?",
                    text: "Once deleted, you will not be able to recover this .",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            window.location.reload();

                        } else {
                            swal("not deleted!");
                        }
                    });

            }).catch(err => swal("faild", "", "warning"))

        }
        catch (rr) {

        }
    }
    function createItem() {
        history.push("/calculationCost")
    }
    function upadteItm(e) {
        console.log(e)

        history.push({
            pathname: '/calculationCostUpdate',
            e
        })
    }
    function view(e) {

        history.push({
            pathname: '/calculationSCostView',
            e
        })
    }

    return (
        <div>
            <Dashboardnav></Dashboardnav>
            <Grid container >
                <Dashboardsidemenu />
                <Grid container item xs={10} direction="column" alignItems="center">
                    <div className="dashboardMidCont">
                        <div className="dashboardTag">
                            <FontAwesomeIcon icon={faSitemap} style={{ width: "2.25em" }} />Items
                            <FontAwesomeIcon icon={faPlus} style={{ float: "right", color: "#f14627" }} onClick={createItem} />


                        </div>
                        <div className="dashHeadTag">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>

                                        <th>SI</th>
                                        <th>Operation Code</th>
                                        <th>OperationName</th>
                                        <th>OperationTime(hr)</th>
                                        <th>Total Cost</th>
                                        <th>Action</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabledata.map((tabledata) => {

                                        if (tabledata["OperationTime"] !== 0) {
                                            return (<tr key={tabledata.SI}>

                                                <td>{tabledata['SI']}</td>
                                                <td>{tabledata['OperationCode']}</td>
                                                <td>{tabledata['OperationName']}</td>
                                                <td>{tabledata['OperationTime']}</td>
                                                <td>{ tabledata['TotalCost']}</td>
                                                
                                                <td style={{display:"flex",justifyContent:"space-evenly"}}>
                                                    <button onClick={(e) => {
    
                                                        view(tabledata)
                                                    }} style={{ border: "none" }} >  <FontAwesomeIcon icon={faEye} style={{ color: "#f14627" }} /> </button>
    
                                                    <button style={{ border: "none" }} onClick={(e) => {
                                                        e.preventDefault()
                                                        upadteItm(tabledata)
                                                    }}>  <FontAwesomeIcon icon={faPenSquare} style={{ color: "#f14627" }} /> </button>
                                                    <button onClick={(e) => {
    
                                                        dlt(tabledata.SI)
                                                    }} style={{ border: "none" }}>
                                                        <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#f14627" }} />
    
                                                    </button>
                                                </td>
                                            </tr>)
                                        }
                                    })
                                    }
                                </tbody>
                            </Table>
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
