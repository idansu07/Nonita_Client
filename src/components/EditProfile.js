import React , { useContext, useState } from 'react';
import { UserContext } from '../context';
import useForm from '../customHooks/useForm';
import { Form, Button, Segment, Header } from 'semantic-ui-react';
import { CustomDatePicker as DatePicker } from '././Common/DatePicker';
import { stateSchema , validationSchema } from '../schemas/signupSchema';
import moment from 'moment';
import { SET_CURRENT_USER , SET_LOADER } from '../actionType';
import CustomImage from './Common/CustomImage';
import _ from 'lodash';

import { editUser } from '../api/user';

const EditProfile = () => {

    const inputEl = React.useRef()
    const { state , dispatch  } = useContext(UserContext)
    const user = state.currentUser

    const [image,setImage] = useState()

    const onProfileUpdated = async () => {
        const userForm = { 
            firstName: inputs.firstName.value,
            lastName: inputs.lastName.value,
            userName:inputs.userName.value,
            email:inputs.email.value,
            password:inputs.password.value ? inputs.password.value :undefined,
            birthday:inputs.birthday.value
        }
        const data = new FormData()
        if(image){
            data.append('avatar',image)
        }
        Object.keys(userForm).forEach(key => {
            if(userForm[key]){
                data.append(key , userForm[key])
            }
        })
        
        try {
            const response = await editUser(data)
            dispatch({ type:SET_CURRENT_USER , payload:response.data })
        } catch (error) {
            console.log(error)
            dispatch({ type:SET_LOADER,payload:false })
        }
    }

    Object.keys(stateSchema).forEach(key => {
        stateSchema[key].value = user[key] ? user[key] : ''
        if(key === 'birthday'){
            stateSchema[key].value = stateSchema[key].value ? moment(stateSchema[key].value).toDate() : null
        }
    })

    validationSchema.password.required = false

    const {inputs,handleSubmit ,handleInputChange ,disable} = useForm(stateSchema,validationSchema , onProfileUpdated)

    const onUploadImage = async (event) => {
        setImage(_.last(event.target.files))
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Segment color="purple">
            <Header as='h3' block color="blue">
               Edit your profile
            </Header>
                <input ref={inputEl} type="file" style={{ display:"none" }} onChange={onUploadImage} /> 
                <CustomImage style={{ marginLeft:"auto", marginRight:"auto" , marginBottom:"14px" }} 
                    circular 
                    arraybuffer={user.avatar ? user.avatar.data : null}
                    onClick={() => { inputEl.current.click() }}
                />
            <Form.Group>
                <Form.Field width="8">
                    <Form.Input
                        error={inputs['firstName'].error ? inputs['firstName'].error : undefined}
                        name="firstName" 
                        onChange={handleInputChange} 
                        placeholder="First name"
                        value={inputs['firstName'].value}
                    />
                </Form.Field>
                <Form.Field width="8">
                    <Form.Input
                        error={inputs['lastName'].error ? inputs['lastName'].error : undefined} 
                        name="lastName" 
                        onChange={handleInputChange} 
                        placeholder="Last name"
                        value={inputs['lastName'].value} 
                    />
                </Form.Field>
            </Form.Group>
            <Form.Group>
            <Form.Field width="8">
                    <Form.Input
                        error={inputs['userName'].error ? inputs['userName'].error : undefined} 
                        name="userName" 
                        onChange={handleInputChange} 
                        placeholder="Username"
                        value={inputs['userName'].value}
                    />
                </Form.Field>
                <Form.Field width="8">
                    <Form.Input
                        error={inputs['email'].error ? inputs['email'].error : undefined}
                        name="email" 
                        onChange={handleInputChange} 
                        placeholder="Email"
                        value={inputs['email'].value} />
                </Form.Field>
            </Form.Group>
            <Form.Group>
            <Form.Field width="8">
                    <Form.Input
                        error={inputs['password'].error ? inputs['password'].error : undefined} 
                        name="password" 
                        onChange={handleInputChange} 
                        type='password' 
                        placeholder="Password"
                        value={inputs['password'].value} 
                    />
                </Form.Field>
                <Form.Field width="8">
                    <DatePicker
                        error={inputs['birthday'].error ? inputs['birthday'].error : undefined}  
                        selected={inputs['birthday'].value} 
                        name="birthday" 
                        onChange={handleInputChange} 
                        placeholderText="Birthday"
                    />
                </Form.Field>
            </Form.Group>
            <Button primary fluid disabled={disable}>Submit</Button>
            </Segment>
            
            
        </Form>
    )
}

export default EditProfile
