import React, {useState} from "react";

import Wrapper from "./Components/Wrapper";
import Screen from "./Components/Screen";
import ButtonBox from "./Components/ButtonBox";
import Button from "./Components/Button";
import Result from "./Components/Result";

const btnValues = [
  ["C", "+-", "%", "/"],
  [7, 8, 9, "X"],
  [4, 5, 6, "+"],
  [1, 2, 3, "-"],
  [0, ".", "="],
];

const thousandMarkSpaces = (num) => {
 return String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");
};

const removeSpaces = (num) => num.toString().replace(/\s/g, "");


const App =() =>{
    
  let [calc, setCalc] = useState({
    sign : "",
    num : 0,
    result : "",
  });

  //numClickHandler
  const numClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    if (removeSpaces(calc.num).length < 16){
      setCalc({
       ...calc,
       num : 
          calc.num === 0 && value === "0"
            ? "0"
            : removeSpaces(calc.num)  % 1 === 0 
            ? thousandMarkSpaces(Number(removeSpaces(calc.num + value))) 
            : thousandMarkSpaces(calc.num + value),
        result : !calc.sign ? "" : calc.result,
      });
    }
  };

  //commaClickHandler
  const commaClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;

    setCalc({
      ...calc,
      num : !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  //signClickHandler
  const signClickHandler = (e) => {
    e.preventDefault();
    const value = e.target.innerHTML;
    setCalc({
      ...calc,
      sign : value,
      result : !calc.result && calc.num ? calc.num : calc.result,
      num : "",
    });
  };

  //equalsClickHandler
  const equalsClickHandler = () => {
    if (calc.sign && calc.num) {
      const math = (a, b, sign) =>
        sign === "+"
          ? a + b
          : sign === "-"
          ? a - b
          : sign === "X"
          ? a * b
          : a / b;

      setCalc({
        ...calc,
        result : calc.num === "0" && calc.sign === "/"
                ? "Math Error"
                : thousandMarkSpaces(
                    math (
                      Number(removeSpaces(calc.result)), 
                      Number(removeSpaces(calc.num)), 
                      calc.sign
                    )
                  ),
        sign : "",
        num : "",
      });
    }
  };

  //invertClickHandler
  const invertClickHandler = () => {
    setCalc ({
      ...calc,
      num : calc.num ? thousandMarkSpaces(removeSpaces(calc.num) * -1 ) : 0,
      result : calc.result ? thousandMarkSpaces(removeSpaces(calc.result * -1 )) : 0,
      sign : "",
    });
  };

  //percerntClickHandler
  const percentClickHandler = () => {
    let num = calc.num ? parseFloat(calc.num) : 0;
    let result = calc.result ? parseFloat(calc.result) : 0;

    setCalc({
      ...calc,
      num : (num /= Math.pow(100,1)),
      result : (result /= Math.pow(100,1)),
      sign : "",
    });
  };

  //resetClickHandler
  const resetClickHandler = () => {
    setCalc({
      ...calc,
      sign : "",
      num : 0,
      result : "",
    });
  };

  return(
    <Wrapper>
      <Screen value = {calc.num} sign = {calc.sign} result = {calc.result} />
      <Result result={calc.result} />
      <ButtonBox>
      {
        btnValues.flat().map((btn, i) => {
            return(
              <Button
                key ={i}
                className={btn === "=" ? "equals" : ""}
                value={btn}
                onclick= {
                  btn === "C"
                    ? resetClickHandler
                    : btn === "+-"
                    ? invertClickHandler
                    : btn === "%"
                    ? percentClickHandler
                    : btn === "="
                    ? equalsClickHandler
                    : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                    ? signClickHandler
                    : btn === "."
                    ? commaClickHandler
                    : numClickHandler
                }
              />
            );
          })
        }
      </ButtonBox>
    </Wrapper>
  );
};


export default App;