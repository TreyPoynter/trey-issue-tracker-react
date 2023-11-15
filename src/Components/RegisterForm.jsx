/* eslint-disable */
import '../assets/css/loginForm.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
    const [fullName, setFullName] = useState('');
    const [givenName, setGivenName] = useState('');
    const [familyname, setFamilyNaame] = useState('');
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

    function validateInput({ setUser }) {

        const inputs = document.querySelectorAll('input');

        inputs.map(input => {
            if (!input)
                return false;
        });
        return true;
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
                                    {!familyname && (
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
                                <select onChange={(e) => setRole(e.target.value)} id='cboRoles' class="form-select" aria-label="Default select example">
                                    <option style={{ display: 'none' }} selected>Open this select menu</option>
                                    <option value="1">Developer</option>
                                    <option value="2">Quality Assurance</option>
                                    <option value="3">Technical Manager</option>
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
                                if (validateInput()) {
                                    setUser(
                                        {
                                            fullName: fullName,
                                            givenName: givenName,
                                            familyname: familyname,
                                            email: email,
                                            password: password,
                                            dateCreated: new Date()
                                        }
                                    )
                                }
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