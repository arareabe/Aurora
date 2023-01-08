import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { signUp } from '../../store/session';
import './SignUpForm.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [description, setDescription] = useState('')
  const [validationErrors, setValidationErrors] = useState([]);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  const onSignUp = async (e) => {
    e.preventDefault();
    console.log("EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE,", repeatPassword)
    const data = await dispatch(signUp(firstName, lastName, username, email, password, repeatPassword, description));

    if (data) {
      console.log("DOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO", data)
      setErrors(data)
    }
  };

  const updateFirstName = (e) => {
    setFirstName(e.target.value)
  }

  const updateLastName = (e) => {
    setLastName(e.target.value)
  }

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  const updateDescription = (e) => {
    setDescription(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div className='loginWrapper'>
      <div className='loginContainer'>
        <div className='loginHeader'>
          <div className='signupTitle'>
            Sign Up
          </div>
        </div>
        <form onSubmit={onSignUp}>
          <div>
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div>
            <input
              type='text'
              name='firstName'
              onChange={updateFirstName}
              value={firstName}
              placeholder='First Name'
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='lastname'
              onChange={updateLastName}
              value={lastName}
              placeholder='Last Name'
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='username'
              onChange={updateUsername}
              value={username}
              placeholder='Username'
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='email'
              onChange={updateEmail}
              value={email}
              placeholder='Email'
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='password'
              onChange={updatePassword}
              value={password}
              placeholder='Password'
            ></input>
          </div>
          <div>
            <input
              type='password'
              name='repeatPpassword'
              onChange={updateRepeatPassword}
              value={repeatPassword}
              placeholder='Repeat Password'
            ></input>
          </div>
          <div>
            <input
              type='text'
              name='description'
              onChange={updateDescription}
              value={description}
              placeholder='Description'
            ></input>
          </div>
          <button id='signUpFormButton' type='submit'>Sign Up</button>
        </form>

      </div>

    </div>
  );
};

export default SignUpForm;
