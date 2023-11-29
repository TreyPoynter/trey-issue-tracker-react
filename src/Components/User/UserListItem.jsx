/* eslint-disable */
import { Link } from "react-router-dom"

export default function User({ user }) {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    return (
        <div className="col-lg-3 col-md-6 mb-3">
            <div className="justify-content-center mb-4 text-decoration-none card p-1">
                <Link to={`/users/${user._id}`} 
                className="text-black text-decoration-none">
                    <div className="text-decoration-none">
                        <h3 className="text-center fs-5">{user.fullName}</h3>
                    </div>
                    <div className="card-body text-center">
                        <i className={`fas mb-2 fa-solid fa-5x fa-user`}></i>
                    </div>
                </Link>
                <div className="card-footer d-flex justify-content-around">
                    {loggedUser &&
                        (loggedUser.role.includes('technical manager') ||
                        user._id == loggedUser._id) &&
                        <Link to={`/users/${user._id}/edit`} className="btn btn-warning">Edit User</Link>
                    }
                </div>
            </div>
        </div>
    )
}