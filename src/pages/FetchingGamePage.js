import React from "react";
import robo from "./images/robo.png";
import gear from "./images/gear.png";
import "./Styles.css";

const FetchingGamePage = () => {

  return (
    <div className="loading_page">
      <div className="nav">
         <h2 class="" id="nav_head" data-text="THE TIMELESS SAGA"><span>THE TIMELESS SAGA</span></h2>
      </div>
        <div className="loading">
        <img className= 'robo' src={robo} />
        <img className= 'gear' src={gear} />
        </div>
      </div>
  );
};

export default FetchingGamePage;
