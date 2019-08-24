import React from 'react'
import '../style/output.css'

const Output = (props)=>{
    return (
        <div id='output'>
            <div id="formula">
                {props.formula}
            </div>
            <div id='display'>
                {props.display}
            </div>

        </div>
    )
}
export default Output;