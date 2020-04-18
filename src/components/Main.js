import React, { useEffect, useReducer, useMemo } from 'react';
import history from '../history';
import { auth } from '../api/user';
import { UserContext } from '../context';
import { SET_CURRENT_USER } from '../actionType';
import Pages from './Pages';
import { userReducer } from '../reducer';

const initState = {
    currentUser:null
}

const Main = props => {
    
    const [state,dispatch] = useReducer(userReducer,initState)
    
    const userContextValue = useMemo(() => ({ state,dispatch }) , [state,dispatch])

    useEffect(() => {
        async function authenticate(){
            const token = localStorage.getItem('token');
            if(!token) history.push('/signin')
            try {
                const response = await auth()
                if(!response.data._id) history.push('/signin')
                dispatch({ type: SET_CURRENT_USER , payload: response.data })
            } catch (error) {
                console.log(error)
                history.push('/signin')
            }
        }
        authenticate()
    },[])

    return( state.currentUser ?
        <UserContext.Provider value={userContextValue}>
            <Pages {...props} />
        </UserContext.Provider>
        : null
    )
}

export default Main