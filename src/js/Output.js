import React from 'react'
import '../style/output.css'

const Output = (props)=>{
    return (
        <div id='output'>
            <div id="history">
                {props.history}
            </div>
            <div id='display'>
                {props.display}
            </div>

        </div>
    )
}
export default Output;