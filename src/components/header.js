import React, { useContext, useState, Fragment } from 'react'
import { logout } from '../api/user';
import history from '../history';
import { Context,UserContext } from '../context';
import { SET_CURRENT_USER , POST_MODAL } from '../actionType';
import { Menu, Grid, Icon , Header } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import CustomImage from './Common/CustomImage';
const HeaderMenu = () => {

    const {state,dispatch} = useContext(UserContext)
    const {currentUser} = state
    const [activeTab,setActiveTab] = useState('home')
    const appContext = useContext(Context)
    const dispatchContext = appContext.dispatch


    const handleTabClick = (e, { name }) => {
        setActiveTab(name)
    }    

    const handleLogout = async () =>{
        try {
            const response = await logout()
            if(response){
                history.push('/signin')
            }
            dispatch({ type: SET_CURRENT_USER , payload:{} })
        } catch (error) {
            console.log(error)
        }
    }

    return(
        currentUser ?  
        <Fragment>
            <Grid>
                <Grid.Row>
                    <Grid.Column width="1">
                    </Grid.Column>
                    <Grid.Column width="3">
                        <Link to="/">
                            <Header as='h2' onClick={() => handleTabClick(null,{name:'home'})}>
                                <Icon name='users' />
                                <Header.Content>
                                    Halat
                                    <Header.Subheader>Social media network</Header.Subheader>
                                </Header.Content>
                            </Header>
                        </Link>
                    </Grid.Column>
                    <Grid.Column width="1"></Grid.Column>
                    <Grid.Column width="8">
                        <Menu secondary>
                            <Link 
                                to="/" 
                                className={activeTab === 'home' ? 'active item' : 'item'}
                                onClick={() => handleTabClick(null,{name:'home'})}>
                                Home
                            </Link>
                            <Menu.Item
                                position="left"
                                name='create'
                                onClick={() => { dispatchContext({ type:POST_MODAL,payload:{active:true} }) }}
                                icon="plus">
                            </Menu.Item>
                            <Link 
                                to={`/profile/${currentUser._id}`}
                                style={{position:'right'}}
                                className={activeTab === 'profile' ? 'active item' : 'item'}
                                onClick={() => handleTabClick(null,{name:'profile'})}>
                                <CustomImage arraybuffer={currentUser.avatar ? currentUser.avatar.data : null} size="mini" circular></CustomImage>
                                <span style={{ margin:"5px" }}>{currentUser && currentUser.firstName}</span>
                            </Link>
                            <Menu.Item
                                name='logout'
                                active={activeTab === 'logout'}
                                onClick={handleLogout}
                            />
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width="3">
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Fragment> : null
    )
}

export default HeaderMenu