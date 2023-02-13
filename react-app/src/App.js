import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import { authenticate } from './store/session';
import Home from './components/home/Home'
import SingleQuestion from './components/singlequestion/SingleQuestion'
import Spaque from './components/spaque/Spaque';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const currUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {currUser && <NavBar currUser={currUser} />}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/users' exact={true} >
          <UsersList/>
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute>
        <ProtectedRoute path='/' exact={true} >
          <Home />
        </ProtectedRoute>
        <ProtectedRoute path='/question/:questId' >
          <SingleQuestion />
        </ProtectedRoute>
        <ProtectedRoute path='/:space/:spaceId' >
          <Spaque />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
