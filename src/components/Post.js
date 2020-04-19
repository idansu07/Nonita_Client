import React , { Fragment, useContext, useState } from 'react';
import { Image, Divider, Icon , Feed, Button, Comment, Form } from 'semantic-ui-react';
import moment from 'moment';
import { IMAGE_MODAL } from '../actionType';
import { Context , UserContext } from '../context';
import { Link } from 'react-router-dom';
import CustomImage from './Common/CustomImage';
import { likePost } from '../api/post';
import { SET_POSTS , POST_MODAL } from '../actionType';
import { createComment } from '../api/comment';
import FeedComment from './FeedComment';

const Post = ({ feed , imageSize }) => {
    const userContext = useContext(UserContext)
    const currentUser = userContext.state.currentUser
    const { state , dispatch } = useContext(Context)
    const { posts } = state
    const [comment,setComment] = useState('')

    const handleLikeClick = async () => {
        try {
            const response = await likePost({ id:feed._id })
            if(response.data){
                feed.likes = [...response.data.likes]
                dispatch({ type:SET_POSTS  , payload: feed})
            }
        } catch (error) {
            console.log(error)
        }
    }

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

    const renderLike = () => {

        const userAlreadyLiked = feed.likes.find(like => (like.owner === currentUser._id ))
        
        return(
            <Feed.Like onClick={handleLikeClick}>
                <Icon name='like' style={ userAlreadyLiked ? {color:'red'} : null }/>{ feed.likes.length } Like
            </Feed.Like>
        )
    }

    const  handleAddComment = async () => {
        if(!comment) return
        try {
            const response = await createComment({ postId:feed._id , text:comment })
            let newComment = response.data
            newComment.owner = currentUser
            
            const currentPost = posts.find(post => (post._id === feed._id))
            currentPost.comments = [newComment,...currentPost.comments]
            setComment('')
            dispatch({ type: SET_POSTS , payload:currentPost })

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Fragment>
            <Feed.Event>
                <Feed.Label>
                    <Link to={`/profile/${feed.owner._id}`}>
                        <CustomImage arraybuffer={feed.owner.avatar ? feed.owner.avatar.data : null} />
                    </Link>
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
                    {renderLike()}
                    <Comment.Action> {feed.comments.length ? feed.comments.length : ''} Comments </Comment.Action>
                    {
                        currentUser && currentUser._id === feed.owner._id ?
                        <Button onClick={() => dispatch({ type:POST_MODAL , payload:{ active:true, post:feed} })} icon>
                            <Icon name='pencil' />
                        </Button> : null
                    }
                    </Feed.Meta>
                    <Comment.Group>
                        {
                            feed.comments.map(comment => ( <FeedComment key={comment._id} comment={comment}  /> ))
                        }
                        <Form className="ui form" style={{marginTop: 'inherit'}}>
                            <Form.TextArea rows="2" value={comment} onChange={(event) => { setComment(event.target.value) }}/>
                            <Button onClick={handleAddComment} content='Add Reply' labelPosition='left' icon='edit' primary />
                        </Form>
                    </Comment.Group>
                </Feed.Content>
            </Feed.Event>
            <Divider></Divider>
        </Fragment>
    )
}
export default Post