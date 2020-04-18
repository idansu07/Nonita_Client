import React, { useState } from 'react';
import useForm from '../../customHooks/useForm';
import { login } from '../../api/user';
import { Form, Grid , Button, Segment, Header } from 'semantic-ui-react';
import { stateSchema , validationSchema } from '../../schemas/signinSchema';
import { CustomLoader as Loader } from '.././Common/Loader';
import history from '../../history';
import { Link } from 'react-router-dom';
import { setToken } from '../../api/http';
const SignIn = () => {
    
    const [loaderVisible,setLoaderVisible] = useState(false)

    const signin = async () => {
        const formData = { email: inputs.email.value , password: inputs.password.value }
        try {
            setLoaderVisible(true)
            const response = await login(formData)
            localStorage.setItem('token', response.data.token);
            setLoaderVisible(false)
            setToken()
            history.push('/')
        } catch (error) {
            console.log(error)
            setLoaderVisible(false)
        }
    }

    const {inputs, handleInputChange, handleSubmit , disable} = useForm(stateSchema,validationSchema,signin);
    
    return(
        <div>
            <Grid verticalAlign='middle' centered>
                <Grid.Row style={{ top:"25%" , position:"fixed" }} >
                    <Grid.Column style={{maxWidth: "450px"}}>
                    <Header textAlign='center' as='h2'>Log-in to your account</Header>
                        <Segment>
                            <Form onSubmit={handleSubmit}>
                                <Form.Field>
                                    <Form.Input
                                        error={inputs['email'].error ? inputs['email'].error : undefined}
                                        onChange={handleInputChange} 
                                        name="email" 
                                        iconPosition='left' 
                                        icon='user' 
                                        placeholder="Username"
                                    />
                                    
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        error={inputs['password'].error ? inputs['password'].error : undefined}
                                        onChange={handleInputChange}
                                        name="password"
                                        iconPosition='left' 
                                        icon='lock' 
                                        placeholder="Password"
                                        type="password"
                                    />
                                </Form.Field>
                                <Button disabled={disable} primary fluid type='submit'>Login</Button>
                            </Form>
                        </Segment>
                        <Segment>
                            <Link to="/signup">Sign Up</Link>
                        </Segment>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
            <Loader active={loaderVisible} />
        </div>
    )
}

export default SignIn