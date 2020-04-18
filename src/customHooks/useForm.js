import { useState, useEffect, useCallback } from 'react';

const useForm = (stateSchema , validationSchema , callback) => {

    const [inputs,setInputs] = useState(stateSchema)
    const [disable,setDisable] = useState(true)
    const [isDirty,setIsDirty] = useState(false)

    const validateForm = useCallback(() => {
        const hasErrorInForm = Object.keys(inputs).some(input => {

            const isRequired =  validationSchema[input].required
            const hasValue = inputs[input].value
            const hasError = inputs[input].error

            return ((isRequired && !hasValue) || hasError)
            
        })
        return hasErrorInForm
    },[inputs,validationSchema])

    useEffect(() => {
        //if(isDirty){
            setDisable(validateForm())
        //}
    },[isDirty,inputs,validateForm])



    const handleInputChange = useCallback((event) => {
        setIsDirty(true)
        const name = event.target.name
        const value = event.target.value
        let error = ''

        if(validationSchema[name].required && !value){
            error = validationSchema[name].validator.error || ''
        }

        if(validationSchema[name].validator 
            && validationSchema[name].validator.isValid 
            && typeof(validationSchema[name].validator.isValid) === 'function'){
                const isValid = validationSchema[name].validator.isValid(value)
                if(!isValid){
                    error = validationSchema[name].validator.error || ''
                }
        }
        
        setInputs(inputs => {
            return {...inputs,[name]:{ value,error }}
        })
    },[validationSchema])

    
    const handleSubmit = useCallback(event => {
        if(event){
            event.preventDefault();
        }

        if(!validateForm()) callback()
    },[callback,validateForm])
    
    return {
        inputs,
        handleSubmit,
        handleInputChange,
        disable
    }
}

export default useForm