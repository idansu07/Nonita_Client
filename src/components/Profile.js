import React, { useEffect, useContext, useState } from 'react';
import EditProfile from './EditProfile';
import { Grid, Feed } from 'semantic-ui-react';
import { Context , UserContext } from '../context';
import Post from './Post';


const Profile = props => {
    
    const userContext = useContext(UserContext)
    const { currentUser } = userContext.state
    const { state } = useContext(Context)
    const { posts  } = state
    const [userPosts,setUserPosts] = useState([])
    const profileId = props.match.params.id


    useEffect(() => {
        function initPosts(){
            const userPosts = posts.filter(post => post.owner._id === profileId)
            setUserPosts(userPosts)
        }
        initPosts()
    
    },[posts,profileId])

    return(
        currentUser ? 
        <Grid>
            <Grid.Column width="7">
            { profileId === currentUser._id && <EditProfile /> }
            </Grid.Column>
            <Grid.Column width="9">
                <Feed>
                {
                    userPosts.map((item) => {
                        return <Post imageSize={"small"} key={item._id} feed={item}/>
                    })
                }
                </Feed>
            </Grid.Column>
        </Grid> : null
    )
}

export default Profile