import React from 'react'
import './splash.css'
import {
    useHistory
} from "react-router-dom";


export default function Splash() {
    const history =useHistory()
    function handleGo() {
        history.push('/login')
    }
    return (
        <div className="SplashContainer" >
            <div className="CenterdivSplash">
                <h5>Welcome to</h5>
                <p>PRODUCT COST SUITE</p>
                <button onClick={handleGo} style={{color:"white",pading:"20px"}}>Go</button>
                   
                
            </div>
        </div>
    )
}