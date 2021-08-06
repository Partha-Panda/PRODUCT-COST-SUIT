import React, { useEffect } from 'react'
import './splash.css'
import {
    useHistory
} from "react-router-dom";
import Lottie from 'react-lottie';
import { useState } from 'react';
import splashAnimate from "./assets/splashAnimate.json"

export default function Splash() {
    const history = useHistory()
    const [splashTime, setSplashTime] = useState(false)
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: splashAnimate,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    useEffect(() => {
        setTimeout(function () {
            setSplashTime(true)
            
        }, 2000);
    })
    function handleGo() {
        history.push('/login')
    }
    return (
        <>
            {splashTime ?  <div className="SplashContainer" >
            <div className="CenterdivSplash">
                <h5>Welcome to</h5>
                <p>PRODUCT COST SUITE</p>
                <button onClick={handleGo} style={{color:"white",pading:"20px"}}>Go</button>
                   
                
            </div>
        </div>: <Lottie 
	    options={defaultOptions}
        height={"100vh"}
        width={"65%"}
      />}
        </>
    )
}