import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const login = createAsyncThunk(
  'login',
  async(credentials)=> {
    let response = await axios.post('/api/auth', credentials);
    const token = response.data;
    window.localStorage.setItem('token', token);
    response = await axios.get('/api/auth', {
      headers: {
        authorization: token
      }
    });
    return response.data;
  }
);

const loginWithToken = createAsyncThunk(
  'loginWithToken',
  async()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await axios.get('/api/auth', {
        headers: {
          authorization: token
        }
      });
      return response.data;
    }
  }
);

const logout = createAsyncThunk(
  'logout',
  ()=> {
    window.localStorage.removeItem('token');
    return {};
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
  },
  extraReducers: (builder)=> {
    builder.addCase('login/fulfilled', (state, action)=> {
      return action.payload;
    });
    builder.addCase('loginWithToken/fulfilled', (state, action)=> {
      return action.payload;
    });
    builder.addCase('logout/fulfilled', (state, action)=> {
      return action.payload;
    })
  }
});

export default authSlice;
export { login, loginWithToken, logout };
