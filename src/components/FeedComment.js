import React, { useState } from 'react';
import { Comment, Icon } from 'semantic-ui-react';
import CustomImage from './Common/CustomImage';
import moment from 'moment';
import { Link } from 'react-router-dom';
import EditComment from './EditComment';
const FeedComment = ({ comment , onSubmit , handleDeleteComment }) => { 

    const [editComment,setEditComment] = useState(false)
    const [replayComment,setReplayComment] = useState(false)

    const renderDateComment = (renderDateComment) => {
        const diffInDays = moment().diff(moment(renderDateComment),'days')
        if(diffInDays === 0) return 'Today'
        if(diffInDays === 1) return `${diffInDays} day ago`
        return `${diffInDays} days ago`
    }

    
    const handleUpdateComment = (text) => {
        setEditComment(false)
        onSubmit(text,comment._id)
    }

    const handleReplayComment = () => {
        setReplayComment(false)
        
    }

    return(
        <Comment>
            <Link to={`/profile/${comment.owner._id}`} className="avatar">
                <CustomImage arraybuffer={comment.owner.avatar.data} />
            </Link>
            <Comment.Content>
                <Link to={`/profile/${comment.owner._id}`} className="author">
                    { comment.owner.userName }
                </Link>
                <Comment.Metadata>
                    <span>{renderDateComment(comment.createdAt)}</span>
                </Comment.Metadata>
                {
                    editComment 
                    ? <EditComment closeButton={() => setEditComment(false)} value={comment.text} handleSubmit={handleUpdateComment} />
                    : <Comment.Text>{comment.text}</Comment.Text>
                }
                
                {!editComment &&
                    <Comment.Actions>
                        <Comment.Action>
                            <Icon name="pencil" onClick={() => setEditComment(true)} />
                        </Comment.Action>
                        <Comment.Action onClick={() => {setReplayComment(true)}} >Replay</Comment.Action>
                        <Comment.Action>
                            <Icon name="trash" onClick={() => handleDeleteComment(comment._id)} />
                        </Comment.Action>
                        {
                            replayComment 
                            ? <EditComment closeButton={() => setReplayComment(false)} value={''} handleSubmit={handleReplayComment} />
                            : null
                        }
                    </Comment.Actions>
                }
            </Comment.Content>
        </Comment>
    )
}

export default FeedComment

