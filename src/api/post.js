import { GET , POST } from './http';
export const getPosts = (params) => {
    return GET('posts',params)
}
export const createPost = (params) => {
    return POST('posts',params)
}