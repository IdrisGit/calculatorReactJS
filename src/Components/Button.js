import React from "react";
import "./Button.css";

const Button =({className, onclick, value}) =>{
    return(
        <button className={className} onClick={onclick}>
            {value}
        </button>
    );
};

export default Button;