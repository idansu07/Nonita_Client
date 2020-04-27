import React, {useContext , useState, useEffect } from 'react';
import EditProfile from './EditProfile';
import { Grid, Feed, Tab, Divider } from 'semantic-ui-react';
import { Context , UserContext } from '../context';
import Post from './Post';
import ProfileDetails from './ProfileDetails';
import { getUsers } from '../api/user';
import { Fragment } from 'react';
import CustomImage from './Common/CustomImage';

const profileInitialState = {
    _id:null
}
const Profile = props => {
    
    const userContext = useContext(UserContext)
    const { currentUser } = userContext.state
    const { state } = useContext(Context)
    const { posts  } = state
    const profileId = props.match.params.id
    const [profile,setProfile] = useState(profileInitialState)

    useEffect(() => {
        async function getProfile() {
            try {
                const response = await getUsers({ id:profileId })
                setProfile(response.data[0])
            } catch (error) {
                console.log(error)
            }
        }
        if(profileId !== currentUser._id) getProfile()
        else setProfile(currentUser)
    },[profileId,currentUser])

    const panes = [
        {
            menuItem: 'Posts',
            render: () => { 
                const profilePost = posts.filter(post => post.owner._id === profileId)
                return profilePost.length > 0 && <Tab.Pane attached={false}>
                    <Feed>
                    {
                        profilePost.map((item) => {
                            return <Post imageSize={"small"} key={item._id} feed={item}/>
                        })
                    }
                    </Feed>
                </Tab.Pane>
             }
        },
        {
            menuItem: 'Friends',
            render: () => 
                profile.friendsList.length > 0 && <Tab.Pane attached={false}>
                    <div>
                        {
                            profile.friendsList.map(friend => {
                                return (
                                    <Fragment key={friend._id}>
                                        <CustomImage arraybuffer={friend.avatar.data} size='tiny' verticalAlign='top' /> <span>{`${friend.firstName} ${friend.lastName}`}</span>
                                        <Divider />
                                    </Fragment>
                                    
                                )
                            })
                        }
                    </div>
                </Tab.Pane>,
        }
    ]

    return( 
        <Grid>
            <Grid.Column width="7">
            { profileId === currentUser._id ? <EditProfile /> : <ProfileDetails profile={profile} /> }
            </Grid.Column>
            <Grid.Column width="9">
                <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
            </Grid.Column>
        </Grid>
    )
}

export default Profile