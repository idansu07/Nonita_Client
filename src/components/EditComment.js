import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';

const EditComment = ({ value , handleSubmit , closeButton }) => {

    const [input,setInput] = useState(value)

    const handleOnSubmit = () => {
        handleSubmit(input)
        setInput('')
    }

    const handleClose = () => {
        closeButton()
        setInput('')
    }

    return(
        <Form className="ui form" style={{marginTop: 'inherit'}}>
            <Form.TextArea rows="2" value={input} onChange={event => setInput(event.target.value)}/>
            <Button size="tiny" onClick={handleOnSubmit} content='Edti Comment' labelPosition='left' icon='edit' primary />
            {closeButton && <Button onClick={handleClose} size='tiny' content='close' />}
        </Form>
    )
}

export default EditComment