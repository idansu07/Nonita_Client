import React from 'react';
import { Comment } from 'semantic-ui-react';
import CustomImage from './Common/CustomImage';
import moment from 'moment';
import { Link } from 'react-router-dom';
const FeedComment = props => {

    const comment = props.comment

    const renderDateComment = (renderDateComment) => {
        const diffInDays = moment().diff(moment(renderDateComment),'days')
        if(diffInDays === 0) return 'Today'
        if(diffInDays === 1) return `${diffInDays} day ago`
        return `${diffInDays} days ago`
    }

    return(
        <Comment>
            <Link to={`/profile/${comment.owner._id}`} className="avatar">
                <CustomImage arraybuffer={comment.owner.avatar.data} />
            </Link>
            <Comment.Content>
                <Comment.Author as='a'>{ comment.owner.userName }</Comment.Author>
                <Comment.Metadata>
                <span>{renderDateComment(comment.createdAt)}</span>
                </Comment.Metadata>
                <Comment.Text>{comment.text}</Comment.Text>
                <Comment.Actions>
                <Comment.Action>Replay</Comment.Action>
                </Comment.Actions>
            </Comment.Content>
        </Comment>
    )
}

export default FeedComment

