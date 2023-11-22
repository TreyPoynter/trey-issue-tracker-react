/*eslint-disable */
import '../assets/css/loginForm.css'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

export default function EditUser() {
    const userId = useParams().userId;
    const [user, setUser] = useState(null);
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/api/users/${userId}`, { withCredentials: true })
            .then(
                res => {
                    console.log(res)
                    setUser(res.data)
                }
            ).catch(error => { console.log(error) });
    });
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
    return (
        <>
            <div id="body-div">
                <div className="centered-form" id='edit-form'>
                    <div className='d-flex justify-content-between'>
                        <Link to={`/users/${user._id}`}><i className="fa-solid fa-arrow-left fa-xl text-black"></i></Link>
                    </div>
                    <h2 className="mb-3">Edit User</h2>
                    <form action="">
                        <div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtFullName" className="form-label mb-0">Full Name</label>
                                <input placeholder="Enter full name" defaultValue={user.fullName} type="text" className="form-control" id="txtFullName" aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtRole" className="form-label mb-0">Role (comma delimited)</label>
                                <input placeholder="Enter role" type="text" className="form-control" id="txtRole"
                                 aria-describedby="emailHelp" defaultValue={user.role.map(r => r).join(', ')}/>
                            </div>
                            <div className="mb-3 d-flex flex-column align-items-start">
                                <label htmlFor="txtPass" className="form-label mb-0">Password</label>
                                <input placeholder="Enter password" type="password" className="form-control" id="txtPass"/>
                            </div>
                            <Link to='/users' id='btnSave' className="btn btn-danger w-75 mb-2">Delete Account</Link>
                            <Link to='/users/user' id='btnSave' className="btn btn-success w-75 mb-0">Save Changes</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}