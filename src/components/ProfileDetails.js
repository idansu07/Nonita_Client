import React, { useState, useEffect } from 'react';
import { getUsers } from '../api/user';
import { Card } from 'semantic-ui-react';
import CustomImage from './Common/CustomImage';
import moment from 'moment';

const ProfileDetails = ({profileId}) => {
    
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
    
    return(
        profile ? 
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
        : null
    )
}

export default ProfileDetails