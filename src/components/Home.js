import React, { useContext } from 'react';
import { Context } from '../context';
import {  Feed, Grid } from 'semantic-ui-react';
import Post from './Post';


const Home = () => {
    const { state } = useContext(Context)
    const { posts } = state

    return(
        <Grid>
            <Grid.Column width="2">
            </Grid.Column>
            <Grid.Column width="14">
                <Feed>
                {
                    posts.map((item) => {
                        return <Post imageSize="medium" key={item._id} feed={item}/>
                    })
                }
            </Feed>
            </Grid.Column>        
        </Grid>
    )
}

export default Home