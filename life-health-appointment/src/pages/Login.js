import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Circles } from 'react-loader-spinner';
import axios from 'axios';
import url from '../api/apiLink';
import { userAccSuccess } from '../actions/userAction';
import Style from '../css/Signup.module.css';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginError, setLoginError] = useState(false);

    const login = () => {
        axios.get(`${url}/User`)
            .then((response) => {
                const accounts = response.data
                const userFound = accounts.find((user) => user.username === username && user.password === password)
                if (userFound !== undefined) {
                    setLoading(false)
                    localStorage.setItem('user', JSON.stringify(response.data))
                    dispatch(userAccSuccess({
                        "id": userFound.id,
                        "username": username,
                        "password": password
                    }))
                    navigate('/doctor')
                } else {
                    setLoading(false)
                    setLoginError(true)
                }
                
            })
    }

    const handleChange = (e) => {
        e.target.name === 'username' ? 
        setUsername(e.target.value) :
        setPassword(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        login();
    }

    return (
        <div className={Style.container}>
            <div className={Style.setMessage}>
                {loading ? (
                    <div>
                        <Circles 
                            color="#00BFFF"
                            height={40}
                            width={40}
                        />
                        <h3>Loading...</h3>
                    </div>
                ) : <div />}
            </div>
            <form className={Style.signupForm}>
                <input 
                    type="text" 
                    name="username" 
                    id="uname" 
                    value={username}
                    onChange={handleChange}
                    placeholder="Enter username"
                    required
                />
                <input 
                    type="password"
                    name="password"
                    id="pword"
                    value={password}
                    onChange={handleChange}
                    placeholder="Enter password"
                    required
                />
                <button type="submit" onClick={handleSubmit}>Login</button>
                {loginError && <p style={{ color: "red" }}>Incorrect username or password.</p>}
            </form>
        </div>
    )
}

export default Login;