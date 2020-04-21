import React, { useState, useEffect, Fragment, useContext } from 'react';
import { getUsers , setFriendRequest } from '../api/user';
import { Card, Button } from 'semantic-ui-react';
import CustomImage from './Common/CustomImage';
import moment from 'moment';
import { UserContext } from '../context';

const ProfileDetails = ({profileId}) => {
    
    const {state} = useContext(UserContext)
    const [profile,setProfile] = useState()

    useEffect(() => {
        async function getProfile() {
            try {
                const response = await getUsers({ id:profileId })
                setProfile(response.data[0])
            } catch (error) {
                console.log(error)
            }
        }
        getProfile()
    },[profileId])

    const renderButton = () => {
        const friendsList = state.currentUser.friendsList
        const userIsFriend = friendsList.find(f => (f._id === profileId))
        if(userIsFriend) return <span>You and {profile.firstName} already friends</span>
            return <Button onClick={handleFriendRequestClick} primary content="Send Friend Request"/>
    }

    const handleFriendRequestClick = async () => {
        try {
            const response = await setFriendRequest({ friendId:profileId })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    
    return(
        profile ?
        <Fragment>
            {renderButton()}
            <Card>
                <CustomImage arraybuffer={profile.avatar.data} wrapped ui={false} />
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
        
        : null
    )
}

export default ProfileDetails