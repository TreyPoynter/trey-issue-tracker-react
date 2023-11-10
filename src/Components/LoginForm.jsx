import { useState } from "react";
import '../assets/css/loginForm.css'

export default function LoginForm() {
    return (
        <>
            <div id="body-div">
                <div className="centered-form">
                    <h2 className="mb-3">Login</h2>
                    <form action="" >
                        <div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input placeholder="example@example.com" type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input placeholder="Please enter password" type="password" className="form-control" id="exampleInputPassword1"/>
                            </div>
                            <button type="submit" className="btn btn-primary w-75">Click to Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}