import React from 'react';
import DatePicker from 'react-datepicker';

export const CustomDatePicker = props => {

    const format = "dd/MM/yyyy"

    const selectedDate = props.selected || null

    const handleOnChange = (date,event) => {
        console.log(event)
        const target = {...event.target}
        target.name = props.name
        target.value = date
        event.target = target
        props.onChange(event)
    }

    return(
        <DatePicker selected={selectedDate} dateFormat={format} onChange={handleOnChange} placeholderText={props.placeholderText}/>
    )
}