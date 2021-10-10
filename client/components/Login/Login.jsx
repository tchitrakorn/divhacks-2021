import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Signup from './Signup.jsx';
import Main from '../Main.jsx';
// import { Link } from 'react-router-dom';

function Login(props) {
    const [mode, setMode] = useState(props.mode);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userId, setUserId] = useState('');

    if (mode === 'signup') {
        return <Signup />;
    }

    if (mode === 'home') {
        return <Main />;
    }

    const handleSubmitLogin = (e) => {
        e.preventDefault();
        let data = {
            email: email,
            password: password
        };
        axios.post('/login', data)
            .then((response) => {
                console.log(response);
                setUserId(response.data[0].id);
                setMode('home');
            })
            .catch((error) => {
                console.log('error');
                setMode('signup');
            })
    }

    const handleSubmitSignup = (e) => {
        e.preventDefault();
        let data = {
            name: name,
            email: email,
            password: password
        };
        axios.post('/signup', data)
            .then((response) => {
                console.log(response);
                setMode('login');
            })
            .catch((error) => {
                console.log('error');
            })
    }

    const triggerSignup = (e) => {
        console.log('here!');
        setMode('signup');
        return (
            <Signup />
        );
    }

    if (mode === 'login') {
        return (
            <div className="login">
                LOGIN
                <form onSubmit={handleSubmitLogin}>
                    <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)}></input>
                    <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
                    <input className='form-submit' type='submit' value='Login' ></input>
                </form>
                {/* <Link to='/signup'>Sign Up</Link> */}
                <button type="button" onClick={triggerSignup}>Sign Up</button>
                {/* <p>Don't have an account? <span onClick={e => setMode('signup')}>Sign Up Here</span></p> */}
            </div>
        )
    }
    return (
        <div className="signup">
            SIGNUP
            <form onSubmit={handleSubmitSignup}>
                <input type='text' placeholder='Name' onChange={e => setName(e.target.value)}></input>
                <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value)}></input>
                <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value)}></input>
                <input className='form-submit' type='submit' value='Signup' ></input>
            </form>
        </div>
    )
}

export default Login;