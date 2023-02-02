import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import AddTrip from './pages/AddTrip';
import { Provider } from 'react-redux';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const reducer = combineReducers({
  user: user.reducer
});

const store = configureStore({reducer});

export const App = () => {
  return (
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/addtrip' element={<AddTrip/>}></Route>
    </Routes>
    </BrowserRouter>
    </Provider>
  )
}