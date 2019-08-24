import React from 'react';
import '../style/calculator.css';
import Output from './Output';
import labels from './calculator_labels';
import Buttons from './Buttons';

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: '27',
      formula: '43'
    };
    this.handleClickButton = this.handleClickButton.bind(this);
    this.resetDisplay = this.resetDisplay.bind(this);
    this.digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
    this.operand = ['/', 'x', '-', '+', '*'];
  }
  componentDidMount() {
    // const buttons = document.querySelector('.buttons')
    // Array.from(buttons.childNodes).map(button=>{
    //     button.addEventListener('click',)
    // })
  }
  resetDisplay() {
    this.setState({
      display: '0',
      formula: ''
    });
  }
  handleClickButton(e) {
    let buttonClicked = e.target.innerText;
    const isDigitClicked = this.digits.includes(buttonClicked);
    const isOperatorClicked = this.operand.includes(buttonClicked);
    const isDisplayANumber = !isNaN(this.state.display);
    const isDisplayAnOperand = this.operand.includes(this.state.display);
    const isDecimal = this.state.display.includes('.');

    buttonClicked === 'AC' ? this.resetDisplay() : '';
    // console.log(`typeof buttonClicked: ${typeof buttonClicked}`)
    if (isDisplayANumber && isDigitClicked) {
      console.log(
        `isDisplayANumber:${isDisplayANumber} isDigitalClicked:${isDigitClicked}`
      );

      if (!isDecimal || (isDecimal && buttonClicked != '.')) {
        this.setState(state => {
          return state.display === '0' && buttonClicked === '.'
            ? {
                display: state.display + buttonClicked,
                formula: state.display + buttonClicked
              }
            : {
                display:
                  state.display === '0'
                    ? buttonClicked
                    : state.display + buttonClicked,
                formula:
                  state.formula === '0'
                    ? buttonClicked
                    : state.formula + buttonClicked
              };
        });
      }

      //  concat the new digit in display : "234" + "5" => "2345"
    }
    // if  (isDisplayAnOperand && buttonClicked ==='.'){
    //     this.setState(state=>({
    //         display: state.display+'0.',
    //         formula: state.formula + '0.'
    //     }))
    // }
    if (isDisplayANumber && isOperatorClicked) {
      buttonClicked = buttonClicked === 'x' ? '*' : buttonClicked;
      this.setState(state => ({
        display: buttonClicked,
        formula: state.formula + buttonClicked
      }));
    }
    if (isDisplayAnOperand) {
      this.setState(state => {
        return buttonClicked === '.'
          ? {
              display: '0.',
              formula: state.formula + '0.'
            }
          : {
              display: buttonClicked,
              formula: state.formula + buttonClicked
            };
      });
    }
    if (buttonClicked === '=') {
      const regexp = new RegExp(/\+|\-|\*|\//g);
      // const regexp2 = new RegExp(/[-+*/]?\d+/g)
      // console.log(this.state.formula.split(regexp))

      // "34+-*54-/*34"

      if (regexp.test(this.state.formula)) {
        // window.open('https://www.google.com/search?q=sexy+italian+men')
        this.setState(state => ({
          display: String(eval(state.formula)),
          formula: state.formula + buttonClicked + String(eval(state.formula))
        }));
      } else {
        console.log("doesn't match anything!");
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
