import { GET , POST, PATCH, DELETE } from './http';
export const getPosts = (params) => {
    return GET('posts',params)
}
export const createPost = (params) => {
    return POST('posts',params)
}
export const likePost = (params) => {
    return POST('posts/like',params)
}
export const updatePost = (id,params) => {
    return PATCH(`posts/${id}`,params)
}
export const deletePost = (id) => {
    return DELETE(`posts/${id}`)
}