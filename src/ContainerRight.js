import React from 'react'
import Button from './Button'

const ContainerRight = (props)=>{
    return (
        <div id='container-right'>
            {props.labels_ids.map((label_id,id)=>(
                <Button key={label_id.label}
                        value={label_id.label}
                        id={label_id.id} 
                />
            ))}
        </div>
    )
}
export default ContainerRight;