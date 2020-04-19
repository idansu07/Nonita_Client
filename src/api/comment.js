import { POST } from './http';

export const createComment = (params) => {
    return POST('comment',params)
}