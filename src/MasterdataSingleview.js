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



export default function MasterdataSingleview(props) {
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
                                        <th>Metal</th>
                                        <th>Category</th>
                                        <th>Grade</th>
                                        <th>Length</th>
                                        <th>Dia1</th>
                                        <th>Dia2</th>
                                        <th>Width1</th>
                                        <th>Width2</th>
                                        <th>Thick</th>
                                        <th>Volume</th>
                                        <th>Density</th>
                                        <th>Weight</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabledata.map((tabledata) => {

                                        return (
                                            <tr key={tabledata.SI}>
                                                <td>{tabledata.SI}</td>
                                                <td>{ tabledata.Metalcode}</td>
                                                <td>{tabledata.Metal}</td>
                                                <td>{tabledata.Category}</td>
                                                <td>{tabledata.Grade}</td>
                                                <td>{tabledata.Length}</td>
                                                <td>{tabledata.Dia1}</td>
                                                <td>{tabledata.Dia2}</td>
                                                <td>{tabledata.Width1}</td>
                                                <td>{tabledata.Width2}</td>
                                                <td>{tabledata.Thick}</td>
                                                <td>{tabledata.Volume}</td>
                                                <td>{tabledata.Density}</td>
                                                <td>{tabledata.Weight}</td>

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
