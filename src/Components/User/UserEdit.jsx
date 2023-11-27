/*eslint-disable */
import '../../assets/css/loginForm.css'
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { forEach } from 'lodash';

export default function EditUser({auth, showSuccess, showError}) {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const nav = useNavigate();
    const userId = useParams().userId;
    const [user, setUser] = useState(null);
    const [fullName, setFullName] = useState('');
    const [givenName, setGivenName] = useState('');
    const [familyName, setFamilyNaame] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState([]);
    const [password, setPassword] = useState('');
    useEffect(() => {
        if (!user) {
            axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true })
            .then(
                res => {
                    console.log(res)
                    setUser(res.data);
                    setFullName(res.data.fullName);
                    setGivenName(res.data.givenName);
                    setFamilyNaame(res.data.familyName);
                    setEmail(res.data.email);
                    setRole(res.data.role);
                    setFullName(res.data.fullName);
                }
            ).catch(error => { console.log(error) });
        }
    });
    let apiLink = '';
    function editUser(evt) {
        evt.preventDefault();
        if(!fullName)
            {showError('Full-Name is Required'); return}
        else if(!givenName)
            {showError('Given-Name is Required'); return}
        if(!familyName)
            {showError('Family-Name is Required'); return}
        else if(!email)
            {showError('Email is Required');return;}
        else if (!email.includes('@')) 
            {showError('Email must contain an @'); return;}
        else if(!role) 
            {showError('User must have a role'); return;}
        for (let i = 0; i < role.length; i++) {
            if (role[i].toLowerCase().trim() != 'developer' && role[i].toLowerCase().trim() != 'quality analyst' &&
                role[i].toLowerCase().trim() != 'business analyst' && role[i].toLowerCase().trim() != 'product manager' &&
                role[i].toLowerCase().trim() != 'technical manager') {
                showError(`${role[i]} is not a valid role`);
                return;
            }
        }
        const updatedUser = {
            fullName,
            givenName, familyName,
            email
        }
        if (loggedUser.role.includes('technical manager')) {
            console.log('hit');
            updatedUser.role = role;
        }
        if(password){
            updatedUser.password = password;
        }
        console.log(updatedUser)
        delete updatedUser.creationDate;
        delete updatedUser._id;
        axios.put(apiLink,
		{...updatedUser}, {withCredentials: true})
		.then( res => {
			nav('/users/list');
			showSuccess(`Successfully Updated ${userId}`);
			console.log(res);
		})
		.catch(err => {
			showError(`Failed to Update ${userId}`);
			console.log(err);
		})
    }

    if (!user) {
        return(
            <>
                <div id='body-div'>
                <div className='centered-form'>
                    <form action="">
                        <h3>ERROR</h3>
                    </form>
                </div>
                </div>
            </>
        )
    }
    apiLink = user._id != loggedUser._id ? `${import.meta.env.VITE_API_URL}/api/users/${userId}` :
    `${import.meta.env.VITE_API_URL}/api/users/me`;
    console.log(apiLink);
    return (
        <>
            <div id="body-div">
                <div className="centered-form" id='edit-form'>
                    <div className='d-flex justify-content-between'>
                        <Link to={`/users/${user._id}`}><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
                    </div>
                    <h2 className="mb-3">Edit User</h2>
                    <form onSubmit={(evt) => editUser(evt)}>
                        <div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtFullName" className="form-label mb-0">Full Name</label>
                                <input placeholder="Enter Full Name" onChange={(e) => setFullName(e.target.value)}
                                defaultValue={user.fullName} type="text" className="form-control" id="txtFullName"  />
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtEmail" className="form-label mb-0">Email</label>
                                <input placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)}
                                defaultValue={user.email} type="text" className="form-control" id="txtEmail"/>
                            </div>
                            {loggedUser.role.includes('technical manager') && 
                                <div className="mb-3 d-flex flex-column align-items-start">
                                    <label htmlFor="txtRole" className="form-label mb-0">Role (comma delimited)</label>
                                    <input placeholder="Enter role" onChange={(e) => setRole(e.target.value.split(','))}
                                    type="text" className="form-control" id="txtRole"
                                    defaultValue={user.role.map(r => r).join(', ')}/>
                                </div>
                            }
                            <div className=' mb-3 d-flex justify-content-between'>
                                <div className="d-flex flex-column align-items-start w-47">
                                    <label htmlFor="txtGivenName" className="form-label">Given Name</label>
                                    <input placeholder="John" type="text" className="form-control"
                                        id="txtGivenName" defaultValue={user.givenName}
                                        onChange={(e) => setGivenName(e.target.value)} />
                                </div>
                                <div className="d-flex flex-column align-items-start w-47">
                                    <label htmlFor="txtFamilyName" className="form-label">Family Name</label>
                                    <input placeholder="Doe" type="text"
                                        className={`form-control`} defaultValue={user.familyName}
                                        id="txtFamilyName" onChange={(e) => setFamilyNaame(e.target.value)}/>
                                </div>
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtPass" className="form-label mb-0">Password</label>
                                <input onChange={(e) => setPassword(e.target.value)} placeholder="Enter password" type="password" className="form-control" id="txtPass"/>
                            </div>
                            <button to='/users' id='btnDelete' className="btn btn-danger w-75 mb-2">Delete Account</button>
                            <button type='submit' id='btnSave' className="btn btn-success w-75 mb-0">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}