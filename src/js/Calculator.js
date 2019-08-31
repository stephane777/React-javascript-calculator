import React from "react";
import "../style/calculator.css";
import Output from "./Output";
import labels from "./calculator_labels";
import Buttons from "./Buttons";

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      formula: "0",
      rotateDegree: 0
    };
    this.handleClickButton = this.handleClickButton.bind(this);
    this.rotateReactIcon = this.rotateReactIcon.bind(this);
    this.resetDisplay = this.resetDisplay.bind(this);
    this.rotateReactIconOnButtonClicked = this.rotateReactIconOnButtonClicked.bind(
      this
    );
    this.checkNumberOfDigitTyped = this.checkNumberOfDigitTyped.bind(this);
    this.digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "."];
    this.operand = ["/", "x", "-", "+", "*"];
  }
  componentDidMount() {
    // const buttons = document.querySelector('.buttons')
    // Array.from(buttons.childNodes).map(button=>{
    //     button.addEventListener('click',)
    // })
  }
  resetDisplay() {
    this.rotateReactIcon(0);
    this.setState({
      display: "0",
      formula: "0",
      rotateDegree: 0
    });
  }
  rotateReactIcon(degree) {
    const icon = document.getElementById("react_icon");
    icon.style = `transform:rotate(${degree}deg)`;
    icon.style.transitionDuration = ".5s";
  }

  rotateReactIconOnButtonClicked() {
    this.rotateReactIcon(this.state.rotateDegree + 15);
    this.setState(state => ({
      rotateDegree: state.rotateDegree + 15
    }));
  }

  checkNumberOfDigitTyped() {
    const digit = this.state.display.length;
    if (digit > 20) {
      const limitEntered = this.state.display;
      this.setState({
        display: "digit limit met"
      });
      setTimeout(() => {
        this.setState({
          display: limitEntered
        });
      }, 1000);
      return true;
    }
    return false;
  }

  handleClickButton(e) {
    let buttonClicked = e.target.innerText;
    const isDigitClicked = this.digits.includes(buttonClicked);
    const isOperatorClicked = this.operand.includes(buttonClicked);
    const isDisplayANumber = !isNaN(this.state.display);
    const isDisplayAnOperand = this.operand.includes(this.state.display);
    const isDecimal = this.state.display.includes(".");
    const isInfinity = this.state.display.toLowerCase() === "infinity";

    if (isDigitClicked) {
      if (this.checkNumberOfDigitTyped()) {
        return;
      }
    }
    if (isInfinity && isDigitClicked) {
      this.setState({
        display: "",
        formula: ""
      });
    }
    if (buttonClicked === "AC") {
      this.resetDisplay();
      return;
    } else if (buttonClicked === "=") {
      this.rotateReactIcon(0);
    } else {
      this.rotateReactIconOnButtonClicked();
    }

    if (isDisplayANumber && isDigitClicked) {
      if (!isDecimal || (isDecimal && buttonClicked != ".")) {
        this.setState(state => {
          return state.display === "0" && buttonClicked === "."
            ? {
                display: state.display + buttonClicked,
                formula: state.display + buttonClicked
              }
            : {
                display:
                  state.display === "0"
                    ? buttonClicked
                    : state.display + buttonClicked,
                formula:
                  state.formula === "0"
                    ? buttonClicked
                    : state.formula + buttonClicked
              };
        });
      }
    }

    if (isDisplayANumber && isOperatorClicked) {
      buttonClicked = buttonClicked === "x" ? "*" : buttonClicked;
      const isComputed = this.state.formula.includes("=");

      if (isComputed) {
        this.setState(state => ({
          display: buttonClicked,
          formula: state.display + buttonClicked
        }));
      } else {
        this.setState(state => ({
          display: buttonClicked,
          formula: state.formula + buttonClicked
        }));
      }
    }
    if (isDisplayAnOperand) {
      buttonClicked = buttonClicked === "x" ? "*" : buttonClicked;
      const regex = new RegExp(/0\/$/);
      if (regex.test(this.state.formula) && buttonClicked === "0") return;
      this.setState(state => {
        return buttonClicked === "."
          ? {
              display: "0.",
              formula: state.formula + "0."
            }
          : {
              display: buttonClicked,
              formula: state.formula + buttonClicked
            };
      });
    }
    if (buttonClicked === "=") {
      const regexp = new RegExp(/\+|\-|\*|\//g);
      const regexp2 = new RegExp(/[-+*/]?-?\d+(\.\d+)?/g);
      const regex3 = new RegExp(/=/);
      const regex4 = new RegExp(/[-+/*][-+]?\d+(\.\d+)?$/);
      // remove extra operator
      let cleanedFormula = this.state.formula.match(regexp2)
        ? this.state.formula.match(regexp2).join("")
        : this.state.formula;
      // replace -- with +
      /--/.test(cleanedFormula)
        ? (cleanedFormula = cleanedFormula.replace("--", "+"))
        : cleanedFormula;
      const isCleaned = cleanedFormula != this.state.formula;
      // pressing = multiple times should add the latest entry to the result of formula
      const isComputed = regex3.test(this.state.formula);
      let valueToAdd, newFormula;
      if (isComputed) {
        newFormula = this.state.formula.split("=")[0];
        valueToAdd = newFormula.match(regex4)[0];
      }
      if (regexp.test(this.state.formula)) {
        this.setState(state => {
          return isComputed
            ? {
                display: String(eval(newFormula + valueToAdd)),

                formula:
                  newFormula +
                  valueToAdd +
                  buttonClicked +
                  String(eval(newFormula + valueToAdd))
              }
            : {
                display: isCleaned
                  ? String(eval(cleanedFormula))
                  : String(eval(state.formula)),
                formula:
                  cleanedFormula +
                  buttonClicked +
                  (isCleaned
                    ? String(eval(cleanedFormula))
                    : String(eval(state.formula)))
              };
        });
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        <Output display={this.state.display} formula={this.state.formula} />
        <Buttons labels={labels} clickButton={this.handleClickButton} />
      </React.Fragment>
    );
  }
}

export default Calculator;
