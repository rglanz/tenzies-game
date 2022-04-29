import React from 'react'

function Dice(props) {
    return(
        <button 
            className={'die' + (props.isFrozen ? '-frozen' : '')}
            onClick={() => props.handleClick(props.id)}
        >{props.value}</button>
    )
}

export default Dice
