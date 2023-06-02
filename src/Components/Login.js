import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../store';

const Login = ()=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  return (
    <form onSubmit={
      ev => {
        ev.preventDefault();
        const credentials = { username, password };
        dispatch(login(credentials));
      }
    }>
      <input placeholder='username' value={ username } onChange={ ev => setUsername(ev.target.value)}/>
      <input placeholder='password' value={ password } onChange={ ev => setPassword(ev.target.value) }/>
      <button>Login</button>
    </form>
  );
};

export default Login;
