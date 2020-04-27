import React, { useState } from 'react';
import { Form, Grid , Button, Segment, Header, Message } from 'semantic-ui-react';
import { signup } from '../../api/user';
import { stateSchema , validationSchema } from '../../schemas/signupSchema';
import { CustomDatePicker as DatePicker } from '../Common/DatePicker';
import useForm from '../../customHooks/useForm';
import { CustomLoader as Loader } from '.././Common/Loader';
import history from '../../history'
import { Link } from 'react-router-dom';
import { setToken } from '../../api/http';
const Signup = () => {

    const [loaderVisible,setLoaderVisible] = useState(false)
    const [error,setError] = useState(null)

    const signUp = async () => {
        const userForm = { 
            firstName: inputs.firstName.value,
            lastName: inputs.lastName.value,
            userName:inputs.userName.value,
            email:inputs.email.value,
            password:inputs.password.value,
            birthday:inputs.birthday.value,
            online:false
        }
        
        try {
            setLoaderVisible(true)
            const response = await signup(userForm)
            localStorage.setItem('token', response.data.token);
            setToken()
            setLoaderVisible(false)
            history.push('/')
        } catch (error) {
            if(!error) {
                setLoaderVisible(false)
                setError('Internal server error , Please try again later')
            }
            else{
                setLoaderVisible(false)
                setError(error.data)
            }
        }
    }

    const { inputs, handleSubmit, handleInputChange, disable } = useForm(stateSchema ,validationSchema , signUp)

    return(
        <div>
            <Grid verticalAlign='middle' centered>
                <Grid.Row style={{ top:"25%" , position:"fixed" }} >
                    <Grid.Column style={{maxWidth: "450px"}}>
                    <Header textAlign='center' as='h2'>Sign-up</Header>
                        <Segment>
                            <Form error onSubmit={handleSubmit}>
                                <Form.Group widths="2">
                                    <Form.Field>
                                        <Form.Input
                                            error={inputs['firstName'].error ? inputs['firstName'].error : undefined}
                                            name="firstName" 
                                            onChange={handleInputChange} 
                                            placeholder="First name" />
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input
                                            error={inputs['lastName'].error ? inputs['lastName'].error : undefined} 
                                            name="lastName" onChange={handleInputChange} placeholder="Last name" />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths="2">
                                    <Form.Field>
                                        <Form.Input
                                            error={inputs['userName'].error ? inputs['userName'].error : undefined} 
                                            name="userName" onChange={handleInputChange} placeholder="Username" />
                                    </Form.Field>
                                    <Form.Field>
                                        <Form.Input
                                            error={inputs['email'].error ? inputs['email'].error : undefined}
                                            name="email" onChange={handleInputChange} placeholder="Email" />
                                    </Form.Field>
                                </Form.Group>
                                <Form.Group widths="2">
                                    <Form.Field>
                                        <Form.Input
                                            error={inputs['password'].error ? inputs['password'].error : undefined} 
                                            name="password" onChange={handleInputChange} type='password' placeholder="Password" />
                                    </Form.Field>
                                    <Form.Field>
                                        <DatePicker
                                            error={inputs['birthday'].error ? inputs['birthday'].error : undefined}  
                                            selected={inputs.birthday.value} name="birthday" onChange={handleInputChange} placeholderText="Birthday" />
                                    </Form.Field>
                                </Form.Group>
                                <Button disabled={disable} primary type='submit'>Submit</Button>
                                <Message
                                    error
                                    header={error}
                                />
                            </Form>
                        </Segment>
                        <Segment>
                            <Link to="/signin">Already have an account? Log In</Link>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Loader active={loaderVisible} />
        </div>
        
        
    )
}

export default Signup