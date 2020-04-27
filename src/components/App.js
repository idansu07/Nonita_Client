import React from 'react';
import { Router , Route , Switch } from 'react-router-dom';
import Main from './Main';
import Signin from './Login/Signin';
import Signup from './Login/Signup';
import history from '../history';
//import socket from '../socket';

const App = () => {

    // socket.on('setSocketId' , id => {
    //     console.log(id)
    //     localStorage.setItem('socketId' , id)
    // })

    return(
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/profile/:id?" exact render={props => <Main {...props} page="profile" />}/>
                    <Route path="/" exact render={props => <Main {...props} page="home" />}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App