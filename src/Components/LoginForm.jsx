import { useState } from "react";
import '../assets/css/loginForm.css'
import { nanoid } from "nanoid";

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

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleBtnAnimation() {
        var btn = document.getElementById('btnLogin');
        if (!btn.classList.contains('jello-horizontal')) {
            btn.classList.add('jello-horizontal');

            setTimeout(function () {
                btn.classList.remove('jello-horizontal');
            }, 1000);
        }
    }

    function Login() {
        return users.some(e => e.email == email && e.password == password);
    }

    return (
        <>
            <div id="body-div">
                <div className="centered-form">
                    <h2 className="mb-3">Login</h2>
                    <form action="" >
                        <div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input onChange={(evt) => setEmail(evt.target.value)} placeholder="example@example.com" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input onChange={(evt) => setPassword(evt.target.value)} placeholder="Please enter password" type="password" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <button onClick={() => handleBtnAnimation()} 
                            type="button" id='btnLogin' className="btn btn-primary w-75 mb-3">Click to Login</button>
                        </div>
                    </form>
                    <p className="mb-0 register-now">Dont have an account? <a  href="">Register Now</a></p>
                </div>
            </div>
        </>
    )
}