import { createRoot } from 'react-dom/client';
import { Provider, useSelector, useDispatch } from 'react-redux';
import React, { useState, useEffect } from 'react';
import store, { logout, loginWithToken } from './store';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';

const App = ()=> {
  const [users, setUsers] = useState([]);
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(()=> {
    const fetchUsers = async()=> {
      const response = await fetch('/api/users');
      const json = await response.json();
      setUsers(json);
    };
    fetchUsers();
    dispatch(loginWithToken());
  }, []);

  return (
    <div>
      <h1>The Martini Site!! ({ users.length })</h1>
      {
        auth.id ? (
          <Routes>
            <Route path='/' element= {<div>LoggedIn { auth.username } <button onClick={ ()=> dispatch(logout())}>Logout</button></div>} />
          </Routes>
        ): (
          <Routes>
            <Route path='/' element= {<Login />} />
          </Routes>
        )

      }
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id } className={auth.id === user.id ? 'you': ''}>
                { user.username }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

const root = createRoot(document.querySelector('#root'));
root.render(
  <HashRouter>
    <Provider store={ store }>
      <App />
    </Provider>
  </HashRouter>
);

