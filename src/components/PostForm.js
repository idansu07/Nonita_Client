import React, { Fragment, useState, useContext, useEffect } from 'react';
import useForm from '../customHooks/useForm';
import { stateSchema, validationSchema } from '../schemas/postSchema';
import { createPost ,updatePost  } from '../api/post';
import { Form, TextArea, Button, Segment } from 'semantic-ui-react';
import PostImages from './postImages';
import { Context , UserContext } from '../context';
import { SET_POSTS } from '../actionType';
import { dataURLtoFile , convertArrayBufferToBase64 } from '../utils/image';
const PostForm = () => {

    const userContext = useContext(UserContext)
    const { state , dispatch } = useContext(Context)
    const post = state.postModal.post
    const [files,setFiles] = useState([])

    const onSubmitPost = async () => {
        const item = new FormData()
        item.append('content',inputs.content.value)
        if(files.length > 0){
            files.forEach(file => {
                item.append('file' , file)
            })
        }
        try {
            let postSaved = null
            if(post){
                const response = await updatePost(post._id,item)
                postSaved = response.data
            }
            else{
                const response = await createPost(item)
                postSaved = response.data
                postSaved.owner = userContext.state.currentUser
            }
            dispatch({ type:SET_POSTS , payload:postSaved })
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

    useEffect(() => {
        if(post){
            Object.keys(stateSchema).forEach(key => {
                stateSchema[key].value = post[key] ? post[key] : ''
            })
            if(post.images.length > 0){
                let images = []
                post.images.forEach(image => {
                    images.push(dataURLtoFile(convertArrayBufferToBase64(image.image.data) , `${image._id}.png`))
                })
                setFiles(images)
            }
        }
    },[post])

    const { inputs,handleSubmit,handleInputChange,disable }= useForm(stateSchema,validationSchema,onSubmitPost)

    return(
        <Fragment>
            <Segment>
            <h3>{post ? 'Edit Post' : 'Create Post'}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Field
                    name="content"
                    onChange={handleInputChange}
                    error={inputs['content'].error ? inputs['content'].error : undefined}
                    id='form-textarea-control-content'
                    control={TextArea}
                    placeholder="What's on your mind , Idan?"
                    value={inputs['content'].value}
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