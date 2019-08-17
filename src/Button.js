import React from 'react'

const Button = (props) =>{
    return (
        <button id={props.id}>
            {props.value}
        </button>
    )
}

export default Button;