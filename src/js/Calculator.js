import React from 'react';
import '../style/calculator.css';
import Output from './Output';
import labels from './calculator_labels';
import Buttons from './Buttons';

class Calculator extends React.Component {
     constructor(props) {
          super(props);
          this.state = {
               display: '0',
               formula: '',
               rotateDegree: 0
          };
          this.handleClickButton = this.handleClickButton.bind(this);
          this.rotateReactIcon = this.rotateReactIcon.bind(this);
          this.resetDisplay = this.resetDisplay.bind(this);
          this.rotateReactIconOnButtonClicked = this.rotateReactIconOnButtonClicked.bind(
               this
          );
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
          console.log('reset display!');
          this.rotateReactIcon(0);
          this.setState({
               display: '0',
               formula: '',
               rotateDegree: 0
          });
     }
     rotateReactIcon(degree) {
          // const rotateDegree = this.state.rotateDegree;
          console.log('rotateReactIcon!');
          const icon = document.getElementById('react_icon');
          icon.style = `transform:rotate(${degree}deg)`;
     }

     rotateReactIconOnButtonClicked() {
          this.rotateReactIcon(this.state.rotateDegree + 15);
          this.setState(state => ({
               rotateDegree: state.rotateDegree + 15
          }));
     }

     handleClickButton(e) {
          let buttonClicked = e.target.innerText;
          const isDigitClicked = this.digits.includes(buttonClicked);
          const isOperatorClicked = this.operand.includes(buttonClicked);
          const isDisplayANumber = !isNaN(this.state.display);
          const isDisplayAnOperand = this.operand.includes(this.state.display);
          const isDecimal = this.state.display.includes('.');

          // console.log(`button clicked! :${buttonClicked}`);
          if (buttonClicked === 'AC') {
               this.resetDisplay();
               return;
          } else {
               this.rotateReactIconOnButtonClicked();
          }

          // console.log(`typeof buttonClicked: ${typeof buttonClicked}`)
          if (isDisplayANumber && isDigitClicked) {
               // console.log(
               //      `isDisplayANumber:${isDisplayANumber} isDigitalClicked:${isDigitClicked}`
               // );

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

          if (isDisplayANumber && isOperatorClicked) {
               buttonClicked = buttonClicked === 'x' ? '*' : buttonClicked;
               const isComputed = this.state.formula.includes('=');
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
               buttonClicked = buttonClicked === 'x' ? '*' : buttonClicked;
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
               const regexp2 = new RegExp(/[-+*/]?-?\d+(\.\d+)?/g);
               // console.log(this.state.formula.split(regexp));
               // console.log(this.state.formula.match(regexp2));
               // "34+-*54-/*34"
               const cleanedFormula = this.state.formula.match(regexp2)
                    ? this.state.formula.match(regexp2).join('')
                    : this.state.formula;
               const isCleaned = cleanedFormula != this.state.formula;

               // console.log(isCleaned);
               // console.log(`cleanedFormula: ${cleanedFormula}`);
               // console.log(`this.state.formula: ${this.state.formula}`);

               if (regexp.test(this.state.formula)) {
                    this.setState(state => ({
                         display: isCleaned
                              ? String(eval(cleanedFormula))
                              : String(eval(state.formula)),
                         formula:
                              cleanedFormula +
                              buttonClicked +
                              (isCleaned
                                   ? String(eval(cleanedFormula))
                                   : String(eval(state.formula)))
                    }));
               } else {
                    // console.log("doesn't match anything!");
               }
          }
     }
     render() {
          return (
               <React.Fragment>
                    <Output
                         display={this.state.display}
                         formula={this.state.formula}
                    />
                    <Buttons
                         labels={labels}
                         clickButton={this.handleClickButton}
                    />
               </React.Fragment>
          );
     }
}

export default Calculator;
