import React from 'react'
import Button from './Button'

const ContainerLeft = (props) => {
    return (
        <div id='container-left'>
            <div id='digits'>
                {props.labels_ids.digits.map((digit,i)=>(
                    <Button key={digit.id}
                            value={digit.label}
                            id={digit.id}/>
                ))}
            </div>
            <div id='bottomRow'>
                {props.labels_ids.bottomRow.map((label_id)=>(
                    <Button key={label_id.label}
                            value={label_id.label}
                            id={label_id.id}/>
                ))}
                </div> 
        </div>
    )
}

export default ContainerLeft