/* eslint-disable */
import { useState } from "react";
import '../assets/css/loginForm.css'
import { nanoid } from "nanoid";
import { Link } from 'react-router-dom';

const users = [
    {
        "id": nanoid(),
        "givenName": "Trey",
        "familyName": "Poynter",
        "email": "tpoynter@farcebook.com",
        "fullName": "Trey Poynter",
        "password": "password",
        "creationDate": "2022-08-16 20:22:22"
    }
]

export default function LoginForm({updateUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
        if (email == "admin@example.com" && password == "password") {
            document.getElementById('txtEmail').value = '';
            document.getElementById('txtPass').value = '';
            updateUser(
                {
                    fullName: 'Admin Dev',
                    givenName: 'Admin',
                    familyname: 'Dev',
                    email: email,
                    password: password
                }
            );
        }
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
                                type="email" className="form-control" id="txtEmail" aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtPass" className="form-label">Password</label>
                                <input onChange={(evt) => setPassword(evt.target.value)} placeholder="Please enter password" 
                                type="password" className="form-control" id="txtPass"/>
                            </div>
                            <button onClick={(e) => {handleBtnAnimation(e); Login();}}
                            type="button" id='btnLogin' className="btn btn-primary w-75 mb-3">Click to Login</button>
                        </div>
                    </form>
                    <p className="mb-0 register-now">Dont have an account? <Link to='/register'>Register</Link></p>
                </div>
            </div>
        </>
    )
}