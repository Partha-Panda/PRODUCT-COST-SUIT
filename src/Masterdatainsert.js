import React, { useState ,useEffect} from 'react'
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
import { Button } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudUploadAlt,faSitemap  } from '@fortawesome/free-solid-svg-icons'


function Volume(metal, category, grade, length, Dia1, Dia2, Width1, Width2, Thick) {
    switch (metal) {
        case 'Plate':
            if (length !== undefined && Width2 !== undefined && Thick !== undefined && length.trim()  && Width2.trim() && Thick.trim())
                return parseInt(length) * parseFloat(Width2) * parseFloat(Thick)
            else
                throw new Error("jj")

        case 'Steel Rod':
            if ((length !== undefined && Dia1!==undefined) && (length.trim() && Dia1.trim()) )
                return parseInt(length) * ( ( parseFloat(Dia1) * parseFloat(Dia1) )/2 )
            else
                throw new Error("jj")
        case 'Hollow Cylinder Pipe':
            if ((length !== undefined && Dia1!==undefined && Dia2!==undefined) && (length.trim() && Dia1.trim() && Dia2.trim()))
                return 3.14 * parseInt(length) * ( ( ( parseFloat(Dia1))/2 * (parseFloat(Dia1))/2 )    - ( ( parseFloat(Dia2))/2 * (parseFloat(Dia2))/2 ))
            else
                throw new Error("jj")
        case 'Square Pipe Solid':
            if ((length !== undefined && Width2 !== undefined && Width2 !== undefined) && (length.trim() && Width2.trim() && Width2.trim() ))
                return parseInt(length) * (parseFloat(Width2) * parseFloat(Width2))
            else
                throw new Error("jj")
        case 'I Channel':
            if ((length !== undefined && Width2 !== undefined && Thick !== undefined) && (length.trim() && Width2.trim() && Thick.trim()))
                return 10
            else
                throw new Error("jj")
        case 'Rectangular Pipe Hollow':
            console.log(Width1,".................")
            if (length !== undefined && Width2 !== undefined && Thick !== undefined && Width1 !== undefined && length.trim() && Width1.trim() && Width2.trim() && Thick.trim() )
                return ( parseInt(length) * parseFloat(Width2) * parseFloat(Width1) )-( (parseFloat(Width1) - parseFloat(Thick)) * (parseFloat(Width2) - parseFloat(Thick)) * parseInt(length) )
            else
                throw new Error("jj")
        case 'Angular Channel':
            return 10
    }
}
function Density(grade) {
    console.log("in density ", grade)
    if (grade === "MS")
        return 0.79
    else
        return 0.89
}
export default function Masterdatainsert() {
    const [metal, setMetal] = useState("")
    const [category, setCategory] = useState("")
    const [grade, setGrade] = useState("")
    const [length, setLength] = useState("")
    const [Dia1, setDia1] = useState("")
    const [Dia2, setDia2] = useState("")
    const [Width1, setWidth1] = useState("")
    const [Width2, setWidth2] = useState("")
    const [Thick, setThick] = useState("")
    useEffect(() => {
       
   },[])
    const handaleSubmit = (e) => {
        e.preventDefault()
        try {
            console.log("metal ", metal, "grade", grade, "catagory", category)
            const volume = Volume(metal, category, grade, length, Dia1, Dia2, Width1, Width2, Thick)
            const density = Density(grade)
            const weight = (volume * density)
            const obj = {
                metal: metal,
                category: category,
                grade: grade,
                length: length,
                Dia1: Dia1,
                Dia2: Dia2,
                Width1: Width1,
                Width2: Width2,
                Thick: Thick,
                volume: volume,
                density: density,
                weight:weight
            }
            console.log(obj)
            axios.post("/insertmasterdata.php",obj).then(res=> swal("success")).catch(err=> swal("faild", "", "warning"))
        }
        catch (err) {
            swal("enter requirded", "", "warning")
        }
    }
    const useStyle = makeStyles(
        {
            grditm: {
                marginBottom: "10px"
            },
            txtfld: {
                width: "400px",
                height: "30px",
                marginBottom: "30px",
                padding: "2px 14px"

            },
            frm: {
                marginTop: "30px"
            }
        }
    )
    const metals = [
        {
            value: '',
            label: '',
        },
        {
            value: 'Plate',
            label: 'Plate',
        },
        {
            value: 'Steel Rod',
            label: 'Steel Rod',
        },
        {
            value: 'Hollow Cylinder Pipe',
            label: 'Hollow Cylinder Pipe',
        },
        {
            value: 'Square Pipe Solid',
            label: 'Square Pipe Solid',
        },
        {
            value: 'I Channel',
            label: 'I Channel',
        },
        {
            value: 'Rectangular Pipe Hollow',
            label: 'Rectangular Pipe Hollow',
        },
        {
            value: 'Angular Channel',
            label: 'Angular Channel',
        }
    ];
    const Categores = [
        {
            value: '',
            label: '',
        },
        {
            value: 'Casted',
            label: 'Casted',
        },
        {
            value: 'Forged',
            label: 'Forged',
        }
    ]
    const Grade = [
        {
            value: '',
            label: '',
        },
        {
            value: 'Brass',
            label: 'Brass',
        },
        {
            value: 'MS',
            label: 'MS',
        }

    ]
    const handleChange = (event) => {

        setMetal(event.target.value);

    };
    const classes = useStyle()
    return (
        <div className="masterContainer">
            <Dashboardnav />
            <Grid container >
                <Dashboardsidemenu />
                <Grid container item xs={10} className={classes.grdd} direction="column" alignItems="center">
                    <div className="dashboardMidCont">
                        <div className="dashboardTag"><FontAwesomeIcon icon={faSitemap} style={{ width: "2.25em" }} />Create item</div>
                        <div className="dashHeadTag">
                        <StylesProvider injectFirst>
                            <form action="" className={classes.frm} onSubmit={handaleSubmit} autoComplete="off">
                                <Grid container className={classes.grditm}>
                                    <Grid item xs={4}><h5>Metal*</h5></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.txtfld}
                                            required
                                            id="outlined-select-currency-native"
                                            select
                                           
                                            value={metal}
                                            onChange={handleChange}
                                            SelectProps={{
                                                native: true,
                                            }}

                                            variant="outlined"
                                        >
                                            {metals.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.grditm}>
                                    <Grid item xs={4}><h5>Category*</h5></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.txtfld}
                                            required
                                            id="outlined-select-currency-native"
                                            select
                                            
                                            value={category}
                                            onChange={(event) => setCategory(event.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}

                                            variant="outlined"
                                        >
                                            {Categores.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container className={classes.grditm}>
                                    <Grid item xs={4}><h5>Grade*</h5></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.txtfld}
                                            required
                                            id="outlined-select-currency-native"
                                            select
                                            
                                            value={grade}
                                            onChange={(event) => setGrade(event.target.value)}
                                            SelectProps={{
                                                native: true,
                                            }}

                                            variant="outlined"
                                        >
                                            {Grade.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </TextField>
                                    </Grid>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={4}><h5>Length(cm)</h5></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.txtfld}
                                                
                                            id="outlined-required"
                                            label=""
                                            value={length}
                                            variant="outlined" onChange={(e) => setLength(e.target.value)} /></Grid>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={4}><h5>Outer Dia</h5></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.txtfld}

                                            id="outlined-required"
                                            label=""
                                            value={Dia1}
                                            variant="outlined" onChange={(e) => setDia1(e.target.value)} /></Grid>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={4}><h5>Inner Dia</h5></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.txtfld}
                                            id="outlined-required"
                                            label=""
                                            value={Dia2}
                                            variant="outlined" onChange={(e) => setDia2(e.target.value)} /></Grid>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={4}><h5>Width1 </h5></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.txtfld}
                                            id="outlined-required"
                                            label=""
                                            value={Width1}
                                            variant="outlined" onChange={(e) => setWidth1(e.target.value)} /></Grid>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={4}><h5>Width2 </h5></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            className={classes.txtfld}
                                            id="outlined-required"
                                            label=""
                                            value={Width2}
                                            variant="outlined" onChange={(e) => setWidth2(e.target.value)} /></Grid>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={4}><h5>Thick </h5></Grid>
                                    <Grid item xs={8}>
                                        <TextField
                                            
                                            className={classes.txtfld}
                                            id="outlined-required"
                                            label=""
                                            value={Thick}
                                            variant="outlined" onChange={(e) => setThick(e.target.value)} /></Grid>
                                </Grid>
                                <Grid container >
                                    <Grid item xs={4}></Grid>
                                    <Grid item xs={8} >
                                    <Button type="submit" variant="primary" style={{float:"center",marginLeft:"15px",marginBottom:"10px"}}> <FontAwesomeIcon icon={faCloudUploadAlt} style={{ padding: "0px" ,margin: "0px 6px 0px 0px",}} />Create</Button>
                                           
                                    </Grid>
                                </Grid>

                                </form>
                                </StylesProvider>
                        </div>

                    </div>
                </Grid>
            </Grid>
        </div>


    )
}
