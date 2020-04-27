import { GET } from './http';
export const getMessages = (userId) => {
    return GET(`message/${userId}`)
}