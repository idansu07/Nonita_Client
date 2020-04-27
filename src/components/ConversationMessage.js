import React from 'react';
import { Feed, Label } from 'semantic-ui-react';
import CustomImage from './Common/CustomImage';

const ConversationMessage = ({ message , user }) => {

    const renderMessage = () => {
        if(user._id === message.sender){
            return (
                <Feed.Event>
                    <Feed.Label>
                        <CustomImage arraybuffer={user.avatar.data} />
                    </Feed.Label>
                    <Label.Group color='teal' circular>
                        <Label>{message.message.text}</Label>
                    </Label.Group>
                </Feed.Event>
            )
        }
        else{
            return (
                <Label.Group circular color='blue' style={{textAlign:'right'}}>
                    <Label>{message.message.text}</Label>
                </Label.Group>
            )
        }
    }

    return(
        renderMessage()
    )
}

export default ConversationMessage