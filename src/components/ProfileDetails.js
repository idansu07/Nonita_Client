import React, { Fragment, useContext } from 'react';
import {  setFriendRequest } from '../api/user';
import { Card, Button } from 'semantic-ui-react';
import CustomImage from './Common/CustomImage';
import moment from 'moment';
import { UserContext } from '../context';
//import socket from '../socket';
const ProfileDetails = ({profile}) => {
    
    const {state} = useContext(UserContext)
    
    const renderButton = () => {
        const friendsList = state.currentUser.friendsList
        const userIsFriend = friendsList.find(f => (f._id === profile._id))
        if(userIsFriend) return <span>You and {profile.firstName} already friends</span>
            return <Button onClick={handleFriendRequestClick} primary content="Send Friend Request"/>
    }

    
    const handleFriendRequestClick = async () => {
        try {            
            const response = await setFriendRequest({ friendId:profile._id , socketId:localStorage.getItem('socketId') })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        <Fragment>
            {renderButton()}
            <Card>
                <CustomImage arraybuffer={profile.avatar ? profile.avatar.data : null} wrapped ui={false} />
                <Card.Content>
                    <Card.Header>{profile.firstName} {profile.lastName}</Card.Header>
                    <Card.Meta>
                        <span className='date'>Joined in {moment(profile.createdAt).format('MMMM YYYY')}</span>
                    </Card.Meta>
                    <Card.Description>
                        {profile.birthday && `Birthday: ${moment(profile.birthday).format('MMMM Do YYYY')}`}
                    </Card.Description>
                </Card.Content>
                <Card.Content extra>
                </Card.Content>
            </Card>
        </Fragment>
    )
}

export default ProfileDetails