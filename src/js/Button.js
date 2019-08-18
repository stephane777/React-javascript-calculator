import React from 'react'
import '../style/button.css'

const Button = (props) =>{
    return (
        <button id={props.id} 
                onClick={()=>props.clickButton(event)}>
            {props.value}
        </button>
    )
}

export default Button;