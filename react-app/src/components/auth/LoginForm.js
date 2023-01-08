import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import { login } from '../../store/session';
import './LoginForm.css'
import aurora from '../../images/aurora.png';

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    }
  };

  const demoLogin = async (e) => {
    e.preventDefault();

    const data = dispatch(login('demo@aa.io', 'password'))

    if (data) {
      setErrors(data);
    }
  }

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='loginWrapper'>
      <div className='loginContainer'>
        <div className='loginHeader'>
          <img className='loginTitle' src={aurora} />
          <div className='loginSubDesc'>
            A place to share knowledge and better understand the world
          </div>
        </div>
        <div className='loginBody'>
          <div id='loginSignWra'>
            <div className='loginSignCon' id='loginSignWrap'>
              <NavLink to='/sign-up' >
                Sign Up
              </NavLink>
            </div>
            <div className='loginSignCon' id='demoUser'>
              Demo User
            </div>
          </div>
          <form className='loginLogCon' onSubmit={onLogin}>
            <div id='innerLoginHead'>
              Login
            </div>
            <div>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='loginInputWrappers'>
              <label htmlFor='email' className='loginInputLabels'>Email</label>
              <input
                name='email'
                type='text'
                className='loginInputInps'
                placeholder='Your Email'
                value={email}
                onChange={updateEmail}
              />
            </div>
            <div className='loginInputWrappers'>
              <label htmlFor='password' className='loginInputLabels'>Password</label>
              <input
                name='password'
                type='password'
                className='loginInputInps'
                placeholder='Your Password'
                value={password}
                onChange={updatePassword}
              />
              <button id='loginButton' type='submit'>Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
