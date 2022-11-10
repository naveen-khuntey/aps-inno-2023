import React, { useState } from "react";
import {Link} from "react-router-dom";
import Hanger from "./images/hanger.png";
import "./Styles.css";

function Home(){
    return (
        <>
        <section id="home">
        <div class="hero-container">
            <div className = "environment"></div>
            <img className= 'hanger' src={Hanger} />
            <div className="rect-1">
                <div className="glow3">
                <div className="glow2">
                    <h2 class="hero glitch layers glow" id="head" data-text="THE TIMELESS SAGA"><span>THE TIMELESS SAGA</span></h2>
                </div>
                </div>
                <div className="subhead">
                    <h3>"Time waits for no one."</h3>
                </div>
            </div>
            <div className="rect-2">
            <div className="para">
                    <h4>We Algorithmic and Programming Society (APS) of NITR present to you The Timeless Saga, survival of the fittest game where you must navigate the perks and challenges of time while putting your technical expertise to the test.</h4>
            </div>
            <br />
            <Link className="btn" to="/login753778214125442A462D4A614E645267556B58703273357638792F423F4528482B4B6250655368566D597133743677397A24432646294A404E635166546A576E5A7234753778214125442A472D4B6150645367556B58703273357638792F423F4528482B4D6251655468576D597133743677397A24432646294A404E635266556A586E327234753778214125442A472D4B6150645367566B59703373367638792F423F4528482B4D6251655468576D5A7134743777217A24432646294A404E635266556A586E3272357538782F413F442A472D4B6150645367566B59703373367639792442264529482B4D6251655468576D5A7134743777217A25432A462D4A">Let's Begin →</Link>
            </div>
        </div>
        </section>
        </>
    )
}
export default Home;

