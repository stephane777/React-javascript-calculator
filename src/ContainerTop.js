import React from 'react'
import Button from './Button'

const ContainerTop = (props) =>{
    
    return (
        <div id='container-top'>
            {props.labels_ids.map((label_id,i)=>(
                <Button key={label_id.label}
                        value={label_id.label}
                        id={label_id.id}/>
            ))}
        </div>
    )
}

export default ContainerTop;