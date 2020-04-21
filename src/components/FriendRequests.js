import React from 'react';
import { List , Icon, Header, Segment } from 'semantic-ui-react';

const FriendRequests = props => {

    const { requests , handleAcceptClick } = props

    return(
        <Segment>
            <Header content="Notifications"></Header>
            <List>
                {
                    requests.map(request => (
                        <List.Item key={request._id}>
                        <Icon name="add user" />
                        <List.Content>
                            <List.Header>New friend request</List.Header>
                            <List.Description>
                            {' '}
                            <a href={`/profile/${request.user}`}>
                                <b>{request.userName}</b>
                            </a>{' '}
                            sent you a friend request
                            </List.Description>
                        </List.Content>
                        <Icon onClick={() => handleAcceptClick(request)} name="add" size='large' color="blue" link />
                        </List.Item> 
                    ))
                }
            
            </List>
        </Segment>
    )
}

export default FriendRequests