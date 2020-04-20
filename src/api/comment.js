import { POST, PATCH, DELETE } from './http';

export const createComment = (params) => {
    return POST('comment',params)
}
export const updateComment = (id,params) => {
    return PATCH(`comment/${id}`,params)
}
export const deleteComment = (id) => {
    return DELETE(`comment/${id}`)
}