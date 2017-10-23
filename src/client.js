"use strict"
import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';
///import {addToCart} from './actions/cardActions';
///import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';
import SignUp from './components/pages/signUp';
import UserLogin from './components/pages/UserLogin';
import UserDashboard from './components/pages/imageComponent';
import AddPost from './components/pages/UserDashboard'
import AllUser from './components/pages/displayAllUser';
import AllPost from './components/pages/displayAllPost';
import ChangePassword from './components/pages/ChangePaddword';
import Setting from './components/pages/Setting'
import Main from './main';
import { CookiesProvider } from 'react-cookie';


import {Router, Route, IndexRoute, browserHistory} from 'react-router'
const middleware = applyMiddleware(thunk,logger);


const store = createStore(reducers, middleware);



const Routes = (
    <Provider store={store}>

    <CookiesProvider>
        <div>
        <Router history={browserHistory} >
            <Route path="/" component={Main}>
                <IndexRoute component={UserLogin} />
                <Route path="/signup" component={SignUp}/>
                <Route path="/userdashboard" component={UserDashboard} />
                <Route path="/changepassword/:id" component={ChangePassword}/>
                <Route path="/alluser" component={AllUser}/>
                <Route path="/allpost" component={AllPost}/>
                <Route path="/setting" component={Setting}/>
                <Route path="/addpost" component={AddPost}/>


                {/*<Route path="/cart" component={Cart}setting/>userdashboard*/}
            </Route>
        </Router>
        </div>

</CookiesProvider>
</Provider>
)

function chkLogin() {

}

render(
    Routes,document.querySelector('.container')
)
// <BrowserRouter> onEnter={chkLogin}
// <div>
// <Switch>
// <Route path="/posts/new" component={PostsNew} />
//     <Route path="/posts/:id" component={PostsShow} />
//     <Route path="/" component={PostsIndex} />
//     </Switch>
//     </div>
//     </BrowserRouter>