import React from 'react';
import { Router , Route , Switch } from 'react-router-dom';
import Main from './Main';
import Signin from './Signin';
import Signup from './Signup';
import history from '../history';

const App = () => {
    return(
        <div>
            <Router history={history}>
                <Switch>
                    <Route path="/signin" exact component={Signin} />
                    <Route path="/signup" exact component={Signup} />
                    <Route path="/profile/:id?" exact component={props => <Main {...props} page="profile" />}/>
                    <Route path="/" exact component={props => <Main {...props} page="home" />}/>
                </Switch>
            </Router>
        </div>
    )
}

export default App