import axios from 'axios'
import React, { useState, useEffect } from 'react'
import logo from './assets/logo.png'
import swal from 'sweetalert';
import {
     useHistory
} from "react-router-dom";
import './login.css'

export default function Login() {
    
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const history = useHistory()


    useEffect(() => {
        localStorage.clear();
    }, [])
    function handaleLogin(e) {
        e.preventDefault()
        
        if (email===undefined || email==="") {
            swal("enter email and password", "", "warning")
        }
        else {
            const obj = {
                email: email,
                password: password
            }
            const request = axios.post("/insert.php", obj).then(res => {
                history.push("./dashboard")
                localStorage.setItem("email", res.data)
                console.log(res.data)
            }
            )
                .catch(error => {
    
                    swal("invaild email or password", "", "warning")
                }
                )
       }


    }
    function emailChng(e) {
        setEmail(e.target.value)
    }
    function passwordChng(e) {
        setPassword(e.target.value)

    }

    return (
        <div className="loginContainer">
            <div className="navlogin">
                <img src={logo} alt="" />
                <h3 className="loginnavHeading">PRODUCT COST SUITE</h3>
            </div>
            <div className="loginFormCont">
                <div className="loginFormHeading">   <h2>Login</h2></div>
                <div className="loginCenter">
                    <form action="">
                        <div className="emaildiv">
                            <label for="email" id="emaillabel">E-mail Address</label>
                            <input type="email" placeholder="" name="email" id="email" onChange={emailChng} value={email} required={true} />
                        </div>
                        <div className="emaildiv">
                            <label for='ps' id="psl">Password</label>
                            <input type="text" id="ps" onChange={passwordChng} value={password} required={true} />
                        </div>


                        <button onClick={handaleLogin} type="submit" id="loginbtn" >Logn</button>
                    </form>
                </div>
            </div>

        </div>

    )
}
