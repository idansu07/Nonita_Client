import React, { useEffect, useState, useContext, Fragment, useRef }  from 'react';
import { getMessages } from '../api/message';
import { UserContext } from '../context';
import socket from '../socket';
import ConversationForm from './ConversationForm';
import { Modal, Feed } from 'semantic-ui-react';
import ConversationMessage from './ConversationMessage';

const Conversation = ({ user }) => {
    const {state} = useContext(UserContext)
    const {currentUser} = state
    const [conversation,setConversation] = useState([])
    const messagesEnd = useRef(null);

    useEffect(() => { 
        async function getConversation(){
            try {
                const response = await getMessages(user._id)
                setConversation(response.data)
                scrollToBottom()
            } catch (error) {
                console.log(error)
            }
        }
        getConversation()
    },[user])

    useEffect(() => {
        socket.on('messageAdded' , message => {
            addMessage(message)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const handleSendMessage = (value) => {
        const message = {
            message:{text:value},
            sender:currentUser,
            reciver:user
        }
        socket.emit('addMessage' , message)
    }

    const addMessage = message => {
        setConversation(prev => {
            return [...prev,message]
        })
        scrollToBottom()
    }

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" });
    }

    return(
        <Fragment>
            <Modal.Header>
                You and { user.firstName }
            </Modal.Header>
            <Modal.Content style={{backgroundColor:'#f7f7f7 '}} scrolling>
                <Feed>
                    {
                    conversation.map(message => {
                        return <ConversationMessage message={message} user={user} key={message._id}/>  
                    })
                    }
                </Feed>
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { messagesEnd.current = el; }}>
                </div>
            </Modal.Content>
            <ConversationForm sendMessage={handleSendMessage} />
        </Fragment>
    )
}

export default Conversation

