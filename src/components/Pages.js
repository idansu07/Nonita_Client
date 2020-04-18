import React , { useReducer, useEffect } from 'react';
import { reducer } from '../reducer';
import Header from './header';
import { Context } from '../context';
import Home from './Home';
import { getPosts } from '../api/post';
import { LOAD_POSTS } from '../actionType';
import { Grid, Loader } from 'semantic-ui-react';
import Chat from './Chat';
import Profile from './Profile';
import ImageModal from './ImageModal';

const Pages = props => {
    
    const initAppState = { loader:false , openPostModel:false , posts:[] , imageModal:{ active:false }}
    const [state, dispatch] = useReducer(reducer,initAppState)

    const { page } = props

    const pages = {
        home:Home,
        profile:Profile
    }
    const Page = pages[page]


    useEffect(() => {
        async function initPosts(){
            try {
                const response = await getPosts({})
                if(response.data){
                    dispatch({ type:LOAD_POSTS , payload:response.data })
                }
            } catch (error) {
                console.log(error)
            }
        }
        initPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return(
        <Context.Provider value={{ state,dispatch }}>
            <Grid>
                <Grid.Column width="16">
                <Grid.Row>
                    <Header />
                </Grid.Row>
                <Grid.Row style={{minHeight:"30px"}}></Grid.Row>
                <Grid.Row>
                <Grid celled='internally'>
                        <Grid.Column width="12">
                            <Page {...props} />
                        </Grid.Column>
                        <Grid.Column width="4">
                            <Grid.Row stretched style={{height:"88vh"}}> 
                                <Chat />
                            </Grid.Row>
                        </Grid.Column>
                    </Grid>
                </Grid.Row>
                </Grid.Column>
                <Loader active={state.loader} style={{ position:"fixed" , top:"50%"  , left:"50%"}} inline='centered'/>
                <ImageModal arrayBuffer={state.imageModal.image} active={state.imageModal.active} />
            </Grid>
        </Context.Provider>
    )
}

export default Pages