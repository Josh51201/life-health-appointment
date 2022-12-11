import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Circles } from 'react-loader-spinner';
import axios from 'axios';
import url from '../api/apiLink';
import { userAccSuccess } from '../actions/userAction';
import Style from '../css/Signup.module.css';

const Signup = (props) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [fullName, setFullName] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState('');

    const handleChange = (e) => {
        const value = e.target.value;
        switch (e.target.name) {
            case 'fullName':
                setFullName(value)
                break
            case 'username':
                setUsername(value)
                break
            case 'phoneNumber':
                setPhoneNumber(value)
                break
            case 'email':
                setEmail(value)
                break
            case 'password':
                setPassword(value)
                break
            default:
                setPasswordConfirm(value)
                break
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        if (password === passwordConfirm) {
            axios.post(`${url}/User`, {
                name: fullName,
                username: username,
                password: password,
                phoneNumber: phoneNumber,
                email: email
            })
            .then((response) => {
                dispatch(userAccSuccess(response))
                setLoading(false);
                navigate('/login');
            })
            .catch((error) => {
                console.log(error)
            })
        } else {
            setError('Passwords do not match.')
        }
        if (email || password !== '') {
            setError('');
        } else {
            setError('Enter valid credentials.')
        }
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
                <input type="text" name="fullName" id="fname" value={fullName} onChange={handleChange} placeholder="Enter full name" required />
                <input type="text" name="username" id="uname" value={username} onChange={handleChange} placeholder="Enter username" required />
                <input type="text" name="phoneNumber" id="pnumber" value={phoneNumber} onChange={handleChange} placeholder="Enter phone number" required />
                <input type="email" name="email" id="email" value={email} onChange={handleChange} placeholder="Enter email" required />
                <input type="password" name="password" id="pword" value={password} onChange={handleChange} placeholder="Enter password" required />
                <input type="password" name="confirm" id="cpword" value={passwordConfirm} onChange={handleChange} placeholder="Confirm password" required />

                <button type="submit" onClick={handleSubmit}>Register</button>
                <div>
                <span>Already have an account? </span>
                <Link to="/login" className={Style.submitBtn}>Login</Link>
                </div>
                {error === '' ? '' : <h3>{error}</h3>}
            </form>
        </div>
    )
}

export default Signup