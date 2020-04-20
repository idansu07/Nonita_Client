import React , { Fragment, useContext, useState } from 'react';
import { Image, Divider, Icon , Feed, Button, Comment, Modal } from 'semantic-ui-react';
import moment from 'moment';
import { IMAGE_MODAL } from '../actionType';
import { Context , UserContext } from '../context';
import { Link } from 'react-router-dom';
import CustomImage from './Common/CustomImage';
import { likePost } from '../api/post';
import { SET_POSTS , POST_MODAL , DELETE_POST } from '../actionType';
import { createComment , updateComment , deleteComment } from '../api/comment';
import FeedComment from './FeedComment';
import { deletePost } from '../api/post';
import EditComment from './EditComment';

const Post = ({ feed , imageSize }) => {
    const userContext = useContext(UserContext)
    const currentUser = userContext.state.currentUser
    const { state , dispatch } = useContext(Context)
    const { posts } = state
    const [modalOpen,setModalOpen] = useState(false)

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

    const  handleUpsertComment = async (text ,id) => {
        const currentPost = posts.find(post => (post._id === feed._id))
        if(!text) return
        try {
            let comment
            if(!id){
                const response = await createComment({ postId:feed._id , text })
                comment = response.data
                comment.owner = currentUser
                currentPost.comments = [...currentPost.comments,comment]
            }
            else{
                const response = await updateComment(id,{text})
                comment = response.data
                const currentComment = currentPost.comments.find(c => (c._id === id))
                Object.keys(currentComment).forEach(key => currentComment[key] = comment[key])
            }
            dispatch({ type: SET_POSTS , payload:currentPost })

        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteComment = async (id) => {
        try {
            const comment = await deleteComment(id)
            const currentPost = posts.find(post => (post._id === feed._id))
            if(comment.data){
                currentPost.comments = currentPost.comments.filter(c => c._id !== id)
            }
            dispatch({ type: SET_POSTS , payload:currentPost })
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeletePost = async () => {
        try {
            const response = await deletePost(feed._id)
            if(response.data){
                dispatch({ type:DELETE_POST , payload: feed._id })
            }
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
                        <Fragment>
                            <Button onClick={() => dispatch({ type:POST_MODAL , payload:{ active:true, post:feed} })} icon>
                                <Icon name='pencil' />
                            </Button> 
                        
                            <Button onClick={() => setModalOpen(true)} icon>
                                <Icon name='trash' />
                            </Button>
                        </Fragment>
                        : null
                    }
                    </Feed.Meta>
                    <Comment.Group>
                        {
                            feed.comments.map(comment => ( <FeedComment handleDeleteComment={handleDeleteComment} onSubmit={handleUpsertComment} key={comment._id} comment={comment}  /> ))
                        }
                        <EditComment value='' handleSubmit={handleUpsertComment} />
                    </Comment.Group>
                </Feed.Content>
            </Feed.Event>
            <Divider></Divider>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} size={"tiny"}>
                <Modal.Header>Delete Your Post</Modal.Header>
                <Modal.Content>
                    <p>Are you sure you want to delete your post</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={() => setModalOpen(false)} negative>
                        No
                    </Button>
                    <Button
                        onClick={handleDeletePost}
                        positive
                        labelPosition='right'
                        icon='checkmark'
                        content='Yes'
                    />
                </Modal.Actions>
            </Modal>    
        </Fragment>
    )
}
export default Post