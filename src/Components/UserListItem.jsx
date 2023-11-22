/* eslint-disable */
import { Link } from "react-router-dom"

export default function User({ user }) {
    return (
        <>
            <li className="list-group-item">
                <Link to={`/users/${user._id}`} className="d-flex justify-content-between align-items-center text-decoration-none text-black">
                    <div className="d-flex align-items-center">
                        <i className="fa-solid fa-user fa-sm pt-2"></i>
                        <p className="ms-3 mb-0">{user.fullName}</p>
                    </div>
                    <div className="d-flex w-25 justify-content-between">
                        <div className="justify-content-end d-flex">
                            <p className="mb-0">Role :</p>
                        </div>
                        <div className="justify-content-start d-flex">
                            <p className="mb-0">{user.role.length == 1 ? `${user.role[0]}` : 
                            `${user.role[0]} + ${user.role.length-1} role${user.role.length > 2 ? 's' : ''}` }</p>
                        </div>
                    </div>
                </Link>
            </li>



        </>
    )
}