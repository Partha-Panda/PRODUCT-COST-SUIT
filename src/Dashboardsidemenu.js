import React from 'react'
import {
    useHistory
} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { StylesProvider } from "@material-ui/core/styles";
import { List, ListItem, ListItemText } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTh, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import "./dashboard.css"
import "./masterdata.css"
import { Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboardsidemenu() {
    const history = useHistory()
    const style = makeStyles({
        typo: {

            background: "rgb(247, 247, 247)"
        },
        grd: {

            background: "rgb(247, 247, 247)"
        },
        grdd: {
            background: "white"
        },
        listText: {
            color: "rgb(45, 147, 243)",
            paddingTop: "1px",
            paddingBottom: "1px",
            fontSize: "83%"
        },
        dashIn: {
            border: "1px solid rgb(224, 220, 220)",
            width: "80vw"
        },
        Acc: {
            background: "rgb(247, 247, 247)",
            width: "16.3vw",

        },
        AccDtl: {
            fontSize: "2px"
        },
        dashTagOnmenu: {
            fontSize: "180%"
        }


    })
    function handaleii(e) {
        e.preventDefault();
        history.push("/masterdata")
    }
    function dashClk(e) {
        e.preventDefault()
        history.push("./dashboard")
    }
    const classes = style()
    return (
        <Grid container item xs={2} className={classes.grd} style={{ height: "150vh", border: "1px solid rgb(224, 220, 220)" }} height="100%">
            <div className="dashBoardListCont" style={{ width: "100%" }}>

                <List dense={true}>

                    <ListItem className={classes.dashTagOnmenu} onClick={dashClk} >
                        <StylesProvider injectFirst>
                            <ListItemText  ><FontAwesomeIcon icon={faTh} /> Dashboard</ListItemText>
                        </StylesProvider >
                    </ListItem>

                    <Accordion>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0" style={{ fontSize: "115%" }}>
                                <FontAwesomeIcon icon={faCheck} style={{ padding: "2px" }} /> Master Data
                                <FontAwesomeIcon style={{ float: "right", margin: "0" }} icon={faCaretDown} />
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="0" >
                                <div style={{ background: "rgb(247, 247, 247)", padding: " 3px 0px 4px 47px", fontSize: "110%" }}>
                                    <Card.Body style={{ padding: "4px" }} onClick={handaleii}><FontAwesomeIcon icon={faPlusSquare} style={{ padding: "2px" }} />Material Operation </Card.Body>
                                    <Card.Body style={{ padding: "4px" }} onClick={()=> history.push("/OperationCostView")} ><FontAwesomeIcon icon={faPlusSquare} style={{ padding: "2px" }} />Cost Operation</Card.Body>
                                </div>
                            </Accordion.Collapse>
                        </Card>

                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1" style={{ fontSize: "115%" }}>
                                <FontAwesomeIcon icon={faCheck} style={{ padding: "2px" }} /> Calculation for Amount
                                <FontAwesomeIcon style={{ float: "right", margin: "0" }} icon={faCaretDown} />
                            </Accordion.Toggle>

                            <Accordion.Collapse eventKey="1">
                                <div style={{ background: "rgb(247, 247, 247)", padding: " 3px 0px 4px 47px", fontSize: "110%" }}>
                                    <Card.Body style={{ padding: "4px" }} onClick={()=> history.push("./Cosview")}> <FontAwesomeIcon icon={faPlusSquare} style={{ padding: "2px" }} />Material Cost </Card.Body>
                                    <Card.Body style={{ padding: "4px" }}><FontAwesomeIcon icon={faPlusSquare} style={{ padding: "2px" }} /> Operation Cost</Card.Body>
                                </div>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </List>

            </div>

        </Grid>
    )
}
