import React, { Fragment, useState, useContext } from 'react';
import useForm from '../customHooks/useForm';
import { stateSchema, validationSchema } from '../schemas/postSchema';
import { createPost } from '../api/post';
import { Form, TextArea, Button, Segment } from 'semantic-ui-react';
import PostImages from './postImages';
import { Context , UserContext } from '../context';
import { SET_POSTS } from '../actionType';
const PostForm = ({ closeModal }) => {
    const userContext = useContext(UserContext)
    const { dispatch } = useContext(Context)
    const [files,setFiles] = useState([])

    const onSubmitPost = async () => {
        const post = new FormData()
        post.append('content',inputs.content.value)
        if(files.length > 0){
            files.forEach(file => {
                post.append('file' , file)
            })
        }
        try {
            const response = await createPost(post)
            const createdPost = response.data
            createdPost.owner = userContext.state.currentUser
            dispatch({ type:SET_POSTS , payload:createdPost })
            closeModal()
        } catch (error) {
            console.log(error)
        }
    }

    const handleUploadImage = (event) => {
        setFiles(prev => {
            return [...prev,event.target.files[0]]
        })
        event.persist()
    }
    
    const handleRemoveImage = (image) => {
        const images = files.filter(file => file.name !== image.name)
        setFiles(images)        
    }

    const { inputs,handleSubmit,handleInputChange,disable }= useForm(stateSchema,validationSchema,onSubmitPost)

    return(
        <Fragment>
            <Segment>
            <h3>Create Post</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Field
                    name="content"
                    onChange={handleInputChange}
                    error={inputs['content'].error ? inputs['content'].error : undefined}
                    id='form-textarea-control-content'
                    control={TextArea}
                    placeholder="What's on your mind , Idan?"
                />
                <Form.Input
                    onChange={handleUploadImage}
                    type="file"
                />
                <PostImages images={files} removeImage={handleRemoveImage} />
                <Segment>
                    <Button disabled={disable} primary>Submit</Button>
                </Segment>
                
            </Form>
            </Segment>
        </Fragment>
    )
}

export default PostForm