import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector, batch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { API_URL } from '../utils/utils';
import  user  from '../reducers/user';

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector((store) => store.user.accessToken);
  
    useEffect( () => {
        if (accessToken){
          navigate("/addtrip")
        }
      }, [accessToken])

      const onFormSubmit = (event) => {
        event.preventDefault();
        const options = {
          method: "POST",
          headers: {"content-type": "application/json"},
          body: JSON.stringify({username: username, password: password})
        }
        fetch(API_URL("login"), options)
        .then(response => response.json())
        .then(data => {
          if(data.success) {
            batch(()=>{
              dispatch(user.actions.setUsername(data.response.username))
              dispatch(user.actions.setUserId(data.response.id))
              dispatch(user.actions.setAccessToken(data.response.accessToken))
              dispatch(user.actions.setError(null))
            })
          } else {
            batch(()=>{
              dispatch(user.actions.setUsername(null))
              dispatch(user.actions.setUserId(null))
              dispatch(user.actions.setAccessToken(null))
              dispatch(user.actions.setError(data.response))
            })
          }
        })
      }

      return (
    <>
        <h1>Login</h1>
        <form onSubmit={onFormSubmit}>
            <label htmlFor="username">Username</label>
            <input 
                type="text" 
                id="username" 
                value={username} 
                onChange={e => setUsername(e.target.value)}/>
            <label htmlFor="password">Password</label>
            <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}/>
            <button type="submit">Submit</button>
            <p>Not a member?</p>
            <button><a href="/register">Register</a></button>

        </form>
    </> 
      );
      }

export default Login;