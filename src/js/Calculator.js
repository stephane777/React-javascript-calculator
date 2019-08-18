import React from 'react'
import '../style/calculator.css'
import Output from './Output'
import labels from './calculator_labels'
import Buttons from './Buttons'

class Calculator extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            display:'27',
            formula:'21+2+4'
        }
        this.handleClickButton = this.handleClickButton.bind(this)
        this.resetDisplay = this.resetDisplay.bind(this)
    }
    componentDidMount(){
        // const buttons = document.querySelector('.buttons')
        // Array.from(buttons.childNodes).map(button=>{
        //     button.addEventListener('click',)
        // })
    }
    resetDisplay(){
        this.setState({
            display:'0',
            formula: '',
        })
    }
    handleClickButton(e){
        const buttonClicked = e.target.innerText;
        buttonClicked ==='AC' ? this.resetDisplay() : ''
    }
    render(){
    

        return (
            <React.Fragment>
                <Output display={this.state.display}
                        history={this.state.formula}/>
                <Buttons labels={labels} 
                          clickButton={this.handleClickButton}/>
            </React.Fragment>
        )
    }
}

export default Calculator;