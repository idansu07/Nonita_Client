import { SET_CURRENT_USER , 
    SET_POSTS , 
    LOAD_POSTS , 
    IMAGE_MODAL , 
    POST_MODAL , 
    DELETE_POST} 
from './actionType';

export const reducer = (state = {},action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {...state, currentUser:action.payload }
        case LOAD_POSTS:
            return { ...state , posts:action.payload}
        case SET_POSTS:
            let postExists = state.posts.find(post => post._id === action.payload._id)
            if(!postExists){
                return {...state, posts: [action.payload , ...state.posts ] ,  postModal:{ active:false }}
            }
            else{
                Object.keys(postExists).forEach(key => {
                    postExists[key] = action.payload[key]
                })
                return {...state , posts:[...state.posts] , postModal:{ active:false }}
            }
        case DELETE_POST:
            const postsFilterd = state.posts.filter(post => (post._id !== action.payload))
            return {...state, posts: [...postsFilterd]}
        case IMAGE_MODAL:
            return {...state , imageModal: action.payload}
        case POST_MODAL:
            return {...state , postModal:action.payload}
        default:
            return state
    }
}
export const userReducer = (state = {},action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {...state, currentUser:action.payload}
        default:
            return  state
    }
}
