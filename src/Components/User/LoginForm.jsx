/* eslint-disable */
import { useState } from "react";
import '../../assets/css/loginForm.css'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import dotenv from 'dotenv'
import GithubSignin from "./GithubSignin";

export default function LoginForm({ showError, showSuccess, onLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    function handleBtnAnimation(evt) {
        var btn = document.getElementById(evt.target.id);
        if (!btn.classList.contains('jello-horizontal')) {
            btn.classList.add('jello-horizontal');

            setTimeout(function () {
                btn.classList.remove('jello-horizontal');
            }, 1000);
        }
    }

    function Login() {
        if (!email && !password) { showError('Email and Password is required'); return; }
        if (!email) { showError('Email is required'); return; }
        if (!email.includes('@')) { showError('Email must contain an @'); return; }
        if (!password) { showError('Password is required'); return; }
        if (password.length < 8) { showError('Password must be more than 8 characters'); return; }
        setIsLoading(true);
        axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
            email, password
        }, {
            withCredentials: true
        }).then(res => {

            console.log(res);
            const now = new Date();
            const numHours = 1;
            const expirationTime = now.getTime() + numHours * 60 * 60 * 1000;
            const user = {
                ...res.data.message.foundUser,
                expiration: expirationTime
            };
            showSuccess(`Logged in as ${user.fullName}`);
            console.log(res);
            onLogin(res.data.authToken, user);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/');
        }).catch(error => {
            const resError = error?.response?.data;
            console.log(resError);
            if (resError) {
                if (typeof resError === 'string' || resError.message) {
                    showError(resError.message.message);
                }
            }
        }).finally(() => {
            console.log('finally')
            setIsLoading(false);
        });
    }

    return (
        <>
            <div id="body-div">
                <div className="centered-form">
                    <h2 className="mb-3">Login</h2>
                    <form action="" >
                        <div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtEmail" className="form-label">Email address</label>
                                <input onChange={(evt) => setEmail(evt.target.value)} placeholder="example@example.com"
                                    type="email" className="form-control" id="txtEmail" aria-describedby="emailHelp" />
                            </div>

                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtPass" className="form-label">Password</label>
                                <input onChange={(evt) => setPassword(evt.target.value)} placeholder="Please enter password"
                                    type="password" className="form-control" id="txtPass" />
                            </div>
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                <button disabled={isLoading} onClick={(e) => { handleBtnAnimation(e); Login(); }}
                                    type="button" id='btnLogin' className="btn btn-primary mb-2 w-75">
                                    {isLoading ? 'Logging in...' : 'Click to Login'}
                                </button>
                                <GithubSignin/>

                            </div>


                        </div>
                    </form>
                    <p className="mb-0 register-now">Dont have an account? <Link to='/register'>Register</Link></p>
                </div>
            </div>
        </>
    )
}