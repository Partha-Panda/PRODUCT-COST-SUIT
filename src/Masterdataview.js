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
import TableScrollbar from 'react-table-scrollbar';
import { Scrollbars } from 'react-custom-scrollbars';
import swal from 'sweetalert';
export default function Masterdataview() {
    const history = useHistory()
    const [tabledata, setTableData] = useState([])
    const renderThumb = ({ style, ...props }) => {
        const thumbStyle = {
          borderRadius: 6,
          backgroundColor: 'rgba(35, 49, 86, 0.8)'
        };
        return <div style={{ ...style, ...thumbStyle }} {...props} />;
    };
    const CustomScrollbars = props => (
        <Scrollbars
          renderThumbHorizontal={renderThumb}
          renderThumbVertical={renderThumb}
          {...props}
        />
      );
    function dlt(e) {
        //e.preventDefault()
        var obj = {
            SI: e
        }

        try {

            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this .",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            })
                .then((willDelete) => {
                    if (willDelete) {
                        axios.post("./delte.php", obj).then(res => {}).catch(err => swal("faild", "", "warning"))

                        window.location.reload();

                    } else {
                        swal("not deleted!");
                    }
                });
            
        }
        catch (rr) {

        }
    }
    function createItem() {
        history.push("/createitem")
    }
    function upadteItm(e) {
        

        history.push({
            pathname: '/updateitem',
            e
        })
    }
    function view(e) {
        history.push({
            pathname: '/viewitem',
            e
        })
    }
    useEffect(() => {

        axios.get("./view.php").then(res => {

            setTableData([...tabledata, ...res.data])
        }).catch(err => console.log(err, "in error view"))

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
                            <FontAwesomeIcon icon={faPlus} style={{ float: "right", color: "#f14627" }} onClick={createItem} />


                        </div>
                       
                        <div className="dashHeadTag" style={{height:"400px",flexDirection:"row",alignItems:"flex-start"}}  >
                        <CustomScrollbars autoHide autoHideTimeout={500} autoHideDuration={200}>
                            <Table  striped bordered hover >
                                <thead className="thd">
                                    <tr >
                                        
                                        <th className="thh" style={{background:"rgb(253 251 246)"}}>SI</th>
                                        <th className="thh" style={{background:"rgb(253 251 246)"}}>Metal Code</th>
                                        <th className="thh" style={{background:"rgb(253 251 246)"}}>Metal</th>
                                        <th className="thh" style={{background:"rgb(253 251 246)"}}>Category</th>
                                        <th className="thh" style={{background:"rgb(253 251 246)"}}>Grade</th>
                                        <th className="thh" style={{background:"rgb(253 251 246)"}}>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {tabledata.map((tabledata) => {

                                        return (<tr key={tabledata.SI}>
                                            
                                            <td>{tabledata['SI']}</td>
                                            <td>{tabledata['Metalcode']}</td>
                                            <td>{tabledata['Metal']}</td>
                                            <td>{tabledata['Category']}</td>
                                            <td>{tabledata['Grade']}</td>
                                            <td style={{display:"flex",justifyContent:"space-evenly"}}>
                                                <button onClick={(e) => {

                                                    view(tabledata.SI)
                                                }} style={{ border: "none" }} >  <FontAwesomeIcon icon={faEye} style={{ color: "#f14627" }} /> </button>

                                                <button style={{ border: "none" }} onClick={(e) => {
                                                    e.preventDefault()
                                                    upadteItm(tabledata.SI)
                                                }}>  <FontAwesomeIcon icon={faPenSquare} style={{ color: "#f14627" }} /> </button>
                                                <button onClick={(e) => {

                                                    dlt(tabledata.SI)
                                                }} style={{ border: "none" }}>
                                                    <FontAwesomeIcon icon={faTrashAlt} style={{ color: "#f14627" }} />

                                                </button>
                                            </td>
                                        </tr>)
                                    })
                                    }
                                </tbody>
                                </Table>
                                </CustomScrollbars>
                            </div>
                           

                    </div>
                </Grid>
            </Grid>
        </div>
    )
}
