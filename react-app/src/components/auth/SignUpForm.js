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
        <form className='signupFormWrap' onSubmit={onSignUp}>
          <div className='signupFormInputsWrap'>
            <div>
              <input
                type='text'
                name='firstName'
                onChange={updateFirstName}
                value={firstName}
                placeholder='First Name'
                className='signupFormInputs'
              ></input>
            </div>
            <div>
              <input
                type='text'
                name='lastname'
                onChange={updateLastName}
                value={lastName}
                placeholder='Last Name'
                className='signupFormInputs'
              ></input>
            </div>
            <div>
              <input
                type='text'
                name='username'
                onChange={updateUsername}
                value={username}
                placeholder='Username'
                className='signupFormInputs'
              ></input>
            </div>
            <div>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                value={email}
                placeholder='Email'
                className='signupFormInputs'
              ></input>
            </div>
            <div>
              <input
                type='password'
                name='password'
                onChange={updatePassword}
                value={password}
                placeholder='Password'
                className='signupFormInputs'
              ></input>
            </div>
            <div>
              <input
                type='password'
                name='repeatPpassword'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                placeholder='Repeat Password'
                className='signupFormInputs'
              ></input>
            </div>
            <div>
              <input
                type='text'
                name='description'
                onChange={updateDescription}
                value={description}
                placeholder='Description'
                className='signupFormInputs'
              ></input>
            </div>
            <button id='signUpFormButton' type='submit'>Sign Up</button>
          </div>
          <div className='signupFormErrorsWrap'>
            {errors.map((error, ind) => {
              const coloInd = error.indexOf(':') + 1

              const updateAnswer = error.slice([coloInd])
              return (
                <div key={ind}>{updateAnswer}</div>

              )

            })}
          </div>
        </form>
      </div>

    </div>
  );
};

export default SignUpForm;
