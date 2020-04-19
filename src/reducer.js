import { SET_CURRENT_USER , SET_POSTS , SET_LOADER , LOAD_POSTS , IMAGE_MODAL } from './actionType';
export const reducer = (state = {},action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {...state, currentUser:action.payload , loader:false}
        case LOAD_POSTS:
            return { ...state , posts:action.payload , loader:false}
        case SET_POSTS:
            let postExists = state.posts.find(post => post._id === action.payload._id)
            //let posts = null
            if(!postExists){
                return {...state, posts: [action.payload , ...state.posts ] , loader:false}
            }
            else{
                postExists = action.payload
                return {...state , posts:[...state.posts] , loader:false}
            }
        case SET_LOADER:
            return {...state , loader: action.payload}
        case IMAGE_MODAL:
            return {...state , imageModal: action.payload}
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
