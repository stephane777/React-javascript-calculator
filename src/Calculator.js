import React from 'react'
import './calculator.css'
import TextOutput from './TextOutput'
import ContainerTop from './ContainerTop'
import ContainerLeft from './ContainerLeft'
import ContainerRight from './ContainerRight'

class Calculator extends React.Component{
    constructor(props){
        super(props)

    }
    render(){
        const containerTop_labels = [ {label: 'AC', id:'clear'},
                                      {label: '/', id:'divide'},
                                      {label: 'X', id:'multiply'} ];
        const containerLeft_labels = {
            digits: [ 
                    {label: '7', id: 'seven'},{label: '8', id: 'eight'},{label: '9', id: 'nine'},
                    {label: '4', id: 'four'},{label: '5', id: 'five'},{label: '6', id: 'six'},
                    {label: '1', id: 'one'},{label: '2', id: 'two'},{label: '3', id: 'three'},
                     ],
            bottomRow: [
                {label: '0', id:'zero'},
                {label: '.',id: 'decimal'}
            ]
        }
        const containerRight_labels = [
            {label: '-', id:'subtract'},
            {label: '+',id:'add'},
            {label: '=',id:'equals'}
        ]


        return (
            <React.Fragment>
                {/* <div id='text-output'>text output</div> */}
                <TextOutput />
                {/* <div id='container-top'>container-top</div> */}
                <ContainerTop labels_ids={containerTop_labels}/>
                {/* <div id='container-left'></div> */}
                <ContainerLeft labels_ids={containerLeft_labels}/>
                {/* <div id='container-right'></div> */}
                <ContainerRight labels_ids={containerRight_labels}/>
            </React.Fragment>
        )
    }
}

export default Calculator;