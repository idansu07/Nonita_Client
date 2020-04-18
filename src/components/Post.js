import React , { Fragment, useContext } from 'react';
import { Image, Divider, Icon , Feed } from 'semantic-ui-react';
import {  } from '../utils/image';
import moment from 'moment';
import { IMAGE_MODAL } from '../actionType';
import { Context } from '../context';
import { Link } from 'react-router-dom';
import CustomImage from './CustomImage';

const Post = ({ feed , imageSize }) => {
    
    const { dispatch } = useContext(Context)

    const handleImageClick = (image) => {
        dispatch({ type:IMAGE_MODAL, payload: { active:true,image: image }})
    }
    
    const renderDatePosted = (renderDatePosted) => {
        const diffInDays = moment().diff(moment(renderDatePosted),'days')
        if(diffInDays === 0) return 'Today'
        if(diffInDays === 1) return `${diffInDays} day ago`
        return `${diffInDays} days ago`
    }

    const renderImagePost = (image) => {
        return(
            <Fragment key={image._id}>
                <CustomImage 
                    size={imageSize} 
                    arraybuffer={image.image.data} 
                    onClick={() => {handleImageClick(image.image.data)}} />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <Feed.Event>
                <Feed.Label>
                    <CustomImage arraybuffer={feed.owner.avatar ? feed.owner.avatar.data : null} />
                </Feed.Label>
                <Feed.Content>
                    <Feed.Summary>
                        <Link to={`/profile/${feed.owner._id}`}>
                            {feed.owner.userName}
                        </Link>
                        { feed.images.length > 0 ? `added ${feed.images.length} photos` :  `added a post`}
                        <Feed.Date>{renderDatePosted(feed.createdAt)}</Feed.Date>
                    </Feed.Summary>
                    <Feed.Extra text>
                        {feed.content}
                    </Feed.Extra>
                    <Image.Group>
                    {
                        feed.images.map(image => {
                            return renderImagePost(image)
                        })
                    }   
                    </Image.Group>
                    <Feed.Meta>
                    <Feed.Like>
                        <Icon name='like' />1 Like
                    </Feed.Like>
                    </Feed.Meta>
                </Feed.Content>
            </Feed.Event>
            <Divider></Divider>
        </Fragment>
    )
}
export default Post