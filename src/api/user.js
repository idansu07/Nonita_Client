import { GET , POST , PATCH } from './http';

export const getUsers = (params) => {
    return GET('/users',params)
}
export const login = (params) => {
    return POST('/users/login' , params)
}
export const signup = (params) => {
    return POST('/users',params)
}
export const auth = () => {
    return GET('/users/me')
}
export const logout = () => {
    return POST('/users/logout')
}
export const editUser = (params) => {
    return PATCH('/users' , params)
}
export const uploadAvatar = (params) => {
    return POST('users/me/avatar' , params)
}
export const setFriendRequest = (params) => {
    return POST('users/setFriendRequest',params)
}
export const acceptedFriendRequest = (params) => {
    return POST('users/acceptedFriendRequest' , params)
}