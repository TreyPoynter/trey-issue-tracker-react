/* eslint-disable */
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function RegisterForm({showError, showSuccess, onLogin}) {
    const navigate = useNavigate();
    const [fullName, setFullName] = useState('');
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyNaame] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [isValidEmail, setIsValidEmail] = useState(true);

    const handleEmailChange = (e) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        setIsValidEmail(emailRegex.test(inputEmail));
    };

    function handleRegister(evt){
        evt.preventDefault();
        if(!fullName)
            {showError('Full-Name is Required'); return}
        else if(!givenName)
            {showError('Given-Name is Required'); return}
        if(!familyName)
            {showError('Family-Name is Required'); return}
        else if(!email && !password)
            {showError('Email and Password is Required');return;}
        else if(!email)
            {showError('Email is Required');return;}
        else if (!email.includes('@')) 
            {showError('Email must contain an @'); return;}
        else if(!password)
            {showError('Password is Required');return;}
        else if (password.length < 8) 
            {showError('Password must be more than 8 characters'); return;}
        
        axios.post(`${import.meta.env.VITE_API_URL}/api/users/register`, {
            fullName, givenName, familyName, email, password, role
        }, {
            withCredentials: true
        }).then(response => {
            console.log(response.data);

            //? Immediately Login
            return axios.post(`${import.meta.env.VITE_API_URL}/api/users/login`, {
                email, password
            }, {
                withCredentials: true
            });
        }).then(res => {
            console.log(res.data);
            navigate('/');
            const now = new Date();
            const numHours = 1;
            const expirationTime = now.getTime() + numHours * 60 * 60 * 1000;
            const user = {
                ...res.data.message.foundUser, 
                expiration: expirationTime
            };
            localStorage.setItem('user', JSON.stringify(user));
            onLogin(res.data.authToken, user);
            showSuccess(`Welcome, ${fullName}`)
        }).catch(error => {
            // Handle errors
            console.error(error);
        });
    }

    function handleBtnAnimation(evt) {
        var btn = document.getElementById(evt.target.id);
        if (!btn.classList.contains('jello-horizontal')) {
            btn.classList.add('jello-horizontal');

            setTimeout(function () {
                btn.classList.remove('jello-horizontal');
            }, 1000);
        }
    }
    return (
        <>
            <div id="body-div">
                <div className="centered-form">
                    <h2 className="mb-3">Register</h2>
                    <form action="" >
                        <div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtFullName" className="form-label">Full Name</label>
                                <input placeholder="John Doe" type="text" className="form-control"
                                    id="txtFullName" onChange={(e) => setFullName(e.target.value)} />
                            </div>
                            <div className=' mb-3 d-flex justify-content-between'>
                                <div className="d-flex flex-column align-items-start w-47">
                                    <label htmlFor="txtGivenName" className="form-label">Given Name</label>
                                    <input placeholder="John" type="text" className="form-control"
                                        id="txtGivenName" aria-describedby="emailHelp"
                                        onChange={(e) => setGivenName(e.target.value)} />
                                </div>
                                <div className="d-flex flex-column align-items-start w-47">
                                    <label htmlFor="txtFamilyName" className="form-label">Family Name</label>
                                    <input placeholder="Doe" type="text"
                                        className={`form-control`}
                                        id="txtFamilyName" aria-describedby="emailHelp"
                                        onChange={(e) => setFamilyNaame(e.target.value)} />
                                    {!familyName && (
                                        <div className="invalid-feedback">
                                            Please enter a valid email address.
                                        </div>)}
                                </div>
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtEmail" className="form-label">Email</label>
                                <input
                                    placeholder="jdoe@example.com"
                                    type="email"
                                    className={`form-control ${isValidEmail ? '' : 'is-invalid'}`}
                                    id="txtEmail"
                                    onChange={handleEmailChange}
                                />
                                {!isValidEmail && (
                                    <div className="invalid-feedback">
                                        Please enter a valid email address.
                                    </div>
                                )}
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="cboRoles" className="form-label">Role</label>
                                <select onChange={(e) => setRole(e.target.value)} id='cboRoles' className="form-select" aria-label="Default select example">
                                    <option style={{ display: 'none' }} defaultValue="1">Open this select menu</option>
                                    <option value="developer">Developer</option>
                                    <option value="quality assurance">Quality Assurance</option>
                                    <option value="business analyst">Business Analyst</option>
                                    <option value="technical manager">Technical Manager</option>
                                    <option value="product manager">Product Manager</option>
                                </select>
                            </div>
                            
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtPass" className="form-label">Password</label>
                                <input placeholder="Please enter password" type="password" className="form-control"
                                    id="txtPass"
                                    onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <button onClick={(e) => {
                                handleBtnAnimation(e);
                                handleRegister(e);
                            }}
                                type="button" id='btnRegister' className="btn btn-primary w-75 mb-3">Click to Register</button>
                        </div>
                    </form>
                    <p className="mb-0 register-now">Already have an account? <Link to='/login'>Login</Link></p>
                </div>
            </div>
        </>
    )
}