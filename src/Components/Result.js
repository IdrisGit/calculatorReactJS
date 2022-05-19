import React from "react";
import {Textfit} from "react-textfit";
import './Result.css'


const Result = ({result}) =>{
    if (result === ""){
        return (
            <div className="result" max = {30}>
                <p>Result Screen</p>
            </div>
        )
    } else {
    return(
        <div>
            <Textfit className="result" mode="single" max={30}>
                 {result}
            </Textfit>
        </div>
    );
    }
}

export default Result;