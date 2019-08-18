import React from 'react'
import Button from './Button'
import '../style/Buttons.css'

const Buttons = (props)=>{
    return (
      <div className='buttons'>
           {props.labels.map((label,i)=>(
            <Button
                key={label.label}
                value={label.label}
                id={label.id}
                clickButton={props.clickButton}
            />
        ))}
      </div>
    )
}

export default Buttons