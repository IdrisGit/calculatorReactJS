import React from "react";
import {Textfit} from "react-textfit";
import "./Screen.css";

const Screen = ({value, result, sign}) => {
    return(
        <div>
            <Textfit className="screen" mode="single" max={70}>
                 {result + sign + value}
            </Textfit>
        </div>
    );
};

export default Screen;
