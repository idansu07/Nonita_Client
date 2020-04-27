import React, { useState } from 'react';

const ConversationForm = ({ sendMessage }) => {

    const [value,setValue] = useState('')

    const handleSendClick = () => {
        sendMessage(value)
        setValue('')
    }

    return(
        <div className='ui fluid action input'>
            <input onChange={event => setValue(event.target.value)} value={value} placeholder='Write your message' type='text'/>
            <button className='ui blue button' onClick={handleSendClick}>Send</button>
        </div>
    )
}

export default ConversationForm