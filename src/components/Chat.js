import React , { useEffect , useState, useContext, Fragment } from 'react';
import { getUsers } from '../api/user';
import socket from '../socket';
import { List, Label, Grid, Modal } from 'semantic-ui-react';
import CustomImage from './Common/CustomImage';
import { UserContext } from '../context';
import Conversation from './Conversation';

const friendsInitialState = []
const conversationInitialState = {
    modalOpen:false,
    userConversation:null
}
const Chat = () => {

    const { state } = useContext(UserContext)
    const {currentUser} = state
    const [friends,setFriends] = useState(friendsInitialState)
    const [conversation,setConversation] = useState(conversationInitialState)

    useEffect(() => {
        async function getFriends(){
            try {
                const response = await getUsers()
                const friendsList = response.data.filter(f => f._id !== currentUser._id)
                setFriends(friendsList)
            } catch (error) {
                console.log(error)
            }
        }
        getFriends()
    },[currentUser])

    socket.on('userConnected' , user => {
        updateFriendsStatus(user)
    })

    socket.on('userDisconnected' , user => {
        updateFriendsStatus(user)
    })

    const updateFriendsStatus = user => {
        setFriends(prev => {
            prev.forEach(f => {
                if(f._id === user._id) f = Object.assign(f,user)
            })
            return [...prev]
         })
    }

    const openConversation = (user) => {
        setConversation({ modalOpen:true , userConversation:user })
    }

    const handleCloseModal = () => {
        setConversation({ modalOpen:false , userConversation:null })
    }

    return(
        <Fragment>
            <List selection verticalAlign='middle'>
                { 
                    friends.sort((a,b) => b.online - a.online).map(friend => {
                        return (
                            <List.Item key={friend._id} onClick={() => openConversation(friend)}>
                                <Grid>
                                    <Grid.Column width="3" style={{margin:'auto'}}>
                                        <CustomImage circular size="mini" arraybuffer={friend.avatar && friend.avatar.data} />
                                    </Grid.Column>
                                    <Grid.Column width="11" style={{margin:'auto'}}>
                                        <List.Content>
                                        <List.Header>{`${friend.firstName} ${friend.lastName}`}</List.Header>
                                        </List.Content>
                                    </Grid.Column>
                                    <Grid.Column width="2" style={{margin:'auto'}}>
                                        <Label circular color={friend.online ? 'green' : 'red'} empty />
                                    </Grid.Column>
                                </Grid>
                        </List.Item>
                        )
                    })
                }
            </List>
            <Modal size="tiny" open={conversation.modalOpen} onClose={handleCloseModal}>
                <Conversation user={conversation.userConversation} />
            </Modal>
        </Fragment>
    )
}

export default Chat    