//packages
import React, { Suspense, lazy } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import PrivateRoute from "./routes/privateRoute";

import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from './store';

//css imports
import 'materialize-css/dist/css/materialize.min.css';
import './App.css';

//local imports
import Dashboard from './components/dashboard/dashboard';
import Background from './background';

const Register = lazy(() => import('./pages/register'));
const Login = lazy(() => import('./pages/login'));
// const Dashboard = lazy(() => import('./components/dashboard/dashboard'));
const Stats = lazy(() => import('./pages/stats'));
const Search = lazy(() => import('./pages/search'));
const FavoriteContainer = lazy(() => import('./pages/favorites/favoriteContainer'));
const CompletedContainer = lazy(() => import('./pages/completed/completedContainer'));
//const Background = lazy(() => import("./background"));

//local imports
// import Register from './pages/register';
// import Login from './pages/login';
//import Dashboard from './components/dashboard/dashboard';
// import Stats from './pages/stats';
// import Search from './pages/search';
// import FavoriteContainer from './pages/favorites/favoriteContainer';
// import CompletedContainer from './pages/completed/completedContainer';
// import Background from './background';

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  
  if (decoded.exp < currentTime) {
    
    // Logout user
    store.dispatch(logoutUser());
    
    // Redirect to login
    window.location.href = "./login";
  }
}

function App() {
  return (
    <Provider store={store}>
    <Background />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <div className="App">
            <Route exact path='/' component={Register} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/search' component={Search} />
            <Route exact path='/favorites' component={FavoriteContainer} />
            <Route exact path='/stats' component={Stats} />
            <Route exact path='/completed' component={CompletedContainer} />
          </div>
        </Suspense>
      </Router>

    </Provider>
    
  );
}

export default App;
