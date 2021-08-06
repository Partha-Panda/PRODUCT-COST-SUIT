
import React, { useEffect, useState } from 'react'
import {
    useHistory
} from "react-router-dom";
import Dashboardsidemenu from './Dashboardsidemenu';
import Dashboardnav from './Dashboardnav';
import Grid from '@material-ui/core/Grid';
import { Table } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSitemap } from "@fortawesome/free-solid-svg-icons"
import "./dashboard.css"


export default function OperationSingleView(props) {
    const SI = props.location.e
    const history = useHistory()
    const [tabledata, setTableData] = useState([])
    useEffect(() => {
        if (SI === undefined) {
            history.push("./OperationCostView")
        }
        else {
            setTableData([...tabledata, SI])
            console.log(SI)
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
                                        <th>Operation Code</th>
                                        <th>Operation Name</th>
                                        <th>Cost/hr(₹)</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabledata.map((tabledata) => {

                                        return (
                                            <tr key={tabledata.SI}>
                                                <td>{tabledata.SI}</td>
                                                <td>{ tabledata.OperationCode}</td>
                                                <td>{tabledata.OperationName}</td>
                                                <td>{tabledata.CostHr}</td>
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
