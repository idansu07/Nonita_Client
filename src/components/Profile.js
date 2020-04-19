import React, {useContext } from 'react';
import EditProfile from './EditProfile';
import { Grid, Feed } from 'semantic-ui-react';
import { Context , UserContext } from '../context';
import Post from './Post';
import ProfileDetails from './ProfileDetails';


const Profile = props => {
    
    const userContext = useContext(UserContext)
    const { currentUser } = userContext.state
    const { state } = useContext(Context)
    const { posts  } = state
    const profileId = props.match.params.id

    return(
        currentUser ? 
        <Grid>
            <Grid.Column width="7">
            { profileId === currentUser._id ? <EditProfile /> : <ProfileDetails profileId={profileId} /> }
            </Grid.Column>
            <Grid.Column width="9">
                <Feed>
                {
                    posts.filter(post => post.owner._id === profileId).map((item) => {
                        return <Post imageSize={"small"} key={item._id} feed={item}/>
                    })
                }
                </Feed>
            </Grid.Column>
        </Grid> : null
    )
}

export default Profile