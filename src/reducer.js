import { SET_CURRENT_USER , SET_POSTS , SET_LOADER , LOAD_POSTS , IMAGE_MODAL } from './actionType';
export const reducer = (state = {},action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {...state, currentUser:action.payload , loader:false}
        case LOAD_POSTS:
            return { ...state , posts:action.payload , loader:false}
        case SET_POSTS:
            const posts = [action.payload ,...state.posts ]
            return {...state,posts , loader:false}
        // case ACTIVE_TAB:
        //     return {...state , activeTab: action.payload}
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
