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


export default function MaterialCostSingleView(props) {
    const SI = props.location.e
    const history = useHistory()
    const [tabledata, setTableData] = useState([])
    useEffect(() => {
        if (SI === undefined) {
            history.push("./masterdata")
        }
        else {
            axios.get(`./viewsingle.php?SI=${SI}`).then(res => {
                const ob = { ...res.data[0] }
                //setTableData([...tabledata, ...res.data])
                setTableData([...tabledata, ...res.data])
                console.log(tabledata)
            }).catch(err => console.log(err, "in error view"))
        }

    }, [])
    return (
        <div>
            <Dashboardnav></Dashboardnav>
            <Grid container >
                <Dashboardsidemenu />
                <Grid container item xs={10} direction="column" alignItems="center">
                    <div className="dashboardMidCont">
                        <div className="dashboardTag">
                            <FontAwesomeIcon icon={faSitemap} style={{ width: "2.25em" }} />Items

                        </div>
                        <div className="dashHeadTag">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>SI</th>
                                        <th>Metal Code</th>
                                        <th>Rate</th>
                                        <th>Quntity</th>
                                        <th>Amount</th>
                                        <th>GST %</th>
                                        <th>Gst Amount</th>
                                        <th>Amount with GST</th>
                                        <th>Transportation</th>
                                        <th>Totall Cost</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabledata.map((tabledata) => {

                                        return (
                                            <tr key={tabledata.SI}>
                                                <td>{tabledata.SI}</td>
                                                <td>{ tabledata.Metalcode}</td>
                                                <td>{tabledata.Rate}</td>
                                                <td>{tabledata.Quantity}</td>
                                                <td>{tabledata.Amount}</td>
                                                <td>{tabledata.GST}</td>
                                                <td>{tabledata.GstAmount}</td>
                                                <td>{tabledata.AmountGST}</td>
                                                <td>{tabledata.Transportation}</td>
                                                <td>{tabledata.TotalCost}</td>
                                                
                                            </tr>)
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
